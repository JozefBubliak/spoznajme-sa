// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import type { SupabaseClient } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'
import {
  ensureActiveRun,
  isRandomQuestionRpcUnavailable,
  isUsageStorageUnavailable,
} from '../../_runs'

function buildLocaleFilter(prefix: string) {
  const clean = typeof prefix === 'string' && prefix.trim() ? prefix.trim() : 'sk'
  const sanitized = clean.replace(/[^A-Za-z0-9_-]/g, '') || 'sk'
  return { sanitized, filter: `locale.is.null,locale.ilike.${sanitized}%` }
}

type ServiceClient = SupabaseClient<any, any, any>

async function fetchFallbackQuestions(
  client: ServiceClient,
  categoryId: string,
  count: number,
  localePrefix: string
) {
  const { filter } = buildLocaleFilter(localePrefix)
  const { data, error } = await client
    .from('herd_questions')
    .select('id')
    .eq('category_id', categoryId)
    .eq('classic', true)
    .or(filter)

  if (error) {
    return { ids: [] as string[], error: error.message }
  }

  const rawIds = asArray<{ id: string }>(data).map((row) => String(row.id))
  if (rawIds.length === 0) {
    return { ids: [] as string[], error: null }
  }

  const shuffled = [...rawIds]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = tmp
  }

  const limit = Math.max(1, Number.isFinite(count) ? Number(count) : 0)
  const sliceCount = Math.min(limit, shuffled.length)
  return { ids: shuffled.slice(0, sliceCount), error: null }
}

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({} as any))
  const index = typeof body?.index === 'number' ? body.index : 0

  const s = supabaseServer(session.access_token)
  const run = await ensureActiveRun(s, gameCode, session.user.id)
  const runId = run?.id ?? null
  let usageDisabled = !runId || run?.disabled

  // načítaj konfiguráciu kola
  const { data: round, error: roundErr } = await s
    .from('herd_rounds')
    .select('id, category, count, settings')
    .eq('game_code', gameCode)
    .eq('idx', index)
    .single()

  if (roundErr || !round) {
    return NextResponse.json({ error: 'ROUND_NOT_FOUND' }, { status: 404 })
  }

  const roundSettings = ((round.settings as any) ?? {}) as Record<string, unknown>
  const storedRunId =
    typeof (roundSettings as any).runId === 'string' && (roundSettings as any).runId
      ? String((roundSettings as any).runId)
      : null
  const storedUsageDisabled = Boolean((roundSettings as any).usageTrackingDisabled)
  const storedQuestions = Array.isArray((roundSettings as any).questions)
    ? ((roundSettings as any).questions as unknown[]).map((value) => String(value))
    : []

  const localeMeta = buildLocaleFilter(roundSettings.localePrefix as string)
  const localePrefix = localeMeta.sanitized

  const requestedCount =
    typeof round.count === 'number'
      ? round.count
      : Number(round.count ?? 0) || 0
  const fallbackLimit = Math.max(1, requestedCount)

  let ids: string[] = []
  const canReuseStored =
    storedQuestions.length > 0 &&
    ((runId && storedRunId === runId) || (!runId && !storedRunId) || (storedUsageDisabled && !storedRunId))

  if (canReuseStored) {
    ids = storedQuestions
  } else {
    if (!usageDisabled) {
      const { data: qs, error: qErr } = await s.rpc('random_herd_questions', {
        cat: round.category,
        n: round.count,
        locale_prefix: localePrefix,
        run: runId,
      })

      if (qErr) {
        if (isUsageStorageUnavailable(qErr) || isRandomQuestionRpcUnavailable(qErr)) {
          usageDisabled = true
        } else {
          return NextResponse.json({ error: qErr.message || 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
        }
      } else {
        ids = asArray<{ id: string }>(qs).map((q) => q.id)
      }
    }

    if (ids.length === 0) {
      const { ids: fallbackIds, error: fallbackErr } = await fetchFallbackQuestions(
        s,
        round.category,
        fallbackLimit,
        localePrefix
      )
      if (fallbackErr) {
        return NextResponse.json({ error: fallbackErr }, { status: 400 })
      }
      ids = fallbackIds
    }

    if (ids.length === 0) {
      return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
    }
  }

  const configuredCount =
    typeof round.count === 'number'
      ? round.count
      : Number(round.count ?? ids.length) || ids.length
  const effectiveCount = Math.min(ids.length, configuredCount)
  const chosenIds = ids.slice(0, effectiveCount)

  const nextSettings: Record<string, unknown> = { ...roundSettings, questions: chosenIds }
  if (usageDisabled) {
    nextSettings.usageTrackingDisabled = true
  } else {
    delete (nextSettings as any).usageTrackingDisabled
  }

  if (runId && !usageDisabled) {
    nextSettings.runId = runId
  } else {
    delete (nextSettings as any).runId
  }

  const { error: updErr } = await s
    .from('herd_rounds')
    .update({ settings: nextSettings, status: 'shown', q_index: 0, count: effectiveCount })
    .eq('id', round.id)

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 })
  }

  if (chosenIds.length > 0 && runId && !usageDisabled) {
    const rows = chosenIds.map((questionId) => ({
      owner_id: session.user.id,
      game_code: gameCode,
      run_id: runId,
      category_id: round.category,
      round_id: round.id,
      question_id: questionId,
    }))
    const { error: usageErr } = await s
      .from('herd_question_usage')
      .upsert(rows, { onConflict: 'run_id,question_id' })
    if (usageErr && !isUsageStorageUnavailable(usageErr)) {
      return NextResponse.json({ error: usageErr.message }, { status: 400 })
    }
  }

  await s
    .from('herd_games')
    .update({ phase: 'playing', active_round_index: index })
    .eq('code', gameCode)

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'question:show',
    code: gameCode,
    roundId: round.id,
    qIndex: 0,
    at: Date.now(),
  })

  return NextResponse.json({ ok: true, phase: 'playing' })
}

