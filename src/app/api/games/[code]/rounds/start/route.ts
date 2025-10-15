// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'

import { ensureActiveRun, isUsageStorageUnavailable } from '../../_runs'


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
  const storedQuestions = Array.isArray((roundSettings as any).questions)
    ? ((roundSettings as any).questions as unknown[]).map((value) => String(value))
    : []


  const localePrefix = typeof roundSettings.localePrefix === 'string' && roundSettings.localePrefix
    ? roundSettings.localePrefix
    : 'sk'

  let ids: string[] = []
  if (storedQuestions.length > 0 && runId && storedRunId === runId) {
    ids = storedQuestions
  } else {
    const { data: qs, error: qErr } = await s.rpc('random_herd_questions', {
      cat: round.category,
      n: round.count,
      locale_prefix: localePrefix,
      run: runId,
    })

    if (qErr) {
      return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
    }
    ids = asArray<{ id: string }>(qs).map((q) => q.id)
    if (ids.length === 0) {
      return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
    }


  const configuredCount =
    typeof round.count === 'number'
      ? round.count
      : Number(round.count ?? ids.length) || ids.length
  const effectiveCount = Math.min(ids.length, configuredCount)

  const chosenIds = ids.slice(0, effectiveCount)

  const updatedSettings: Record<string, unknown> = { ...roundSettings, questions: chosenIds }
  if (runId) {
    updatedSettings.runId = runId
  } else {
    delete (updatedSettings as any).runId
  }


  const updatedSettings = { ...roundSettings, runId: run.id, questions: chosenIds }


  const newSettings = { ...roundSettings, questions: ids.slice(0, effectiveCount) }
  const { error: updErr } = await s
    .from('herd_rounds')

    .update({ settings: updatedSettings, status: 'shown', q_index: 0, count: effectiveCount })

    .eq('id', round.id)

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 })
  }


  if (chosenIds.length > 0 && runId) {
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

