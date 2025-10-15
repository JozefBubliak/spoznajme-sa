// PATH: src/app/api/games/[code]/rounds/debug/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'
import {
  isRandomQuestionRpcUnavailable,
  isRunStorageUnavailable,
  isUsageStorageUnavailable,
} from '../../_runs'

export const dynamic = 'force-dynamic'

function sanitizeLocalePrefix(raw: unknown): string {
  const input = typeof raw === 'string' ? raw.trim() : ''
  const sanitized = input.replace(/[^A-Za-z0-9_-]/g, '')
  return sanitized || 'sk'
}

type DiagnosticEntry = {
  roundId: string
  index: number
  categoryId: string
  configuredCount: number
  localePrefix: string
  availableCount: number | null
  countError: string | null
  rpcIds: string[]
  rpcCount: number
  rpcError: string | null
  fallbackTried: boolean
  fallbackClassicFilter: boolean
  fallbackIds: string[]
  fallbackCount: number
  fallbackError: string | null
  storedQuestionCount: number
  storedQuestionIds: string[]
  runId: string | null
  runNumber: number | null
  status: string
  usageTrackingDisabled: boolean
  usageRecordedCount: number
  usageRecordedIds: string[]
  usageMissingIds: string[]
}

export async function GET(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const indexParam = req.nextUrl.searchParams.get('index')
  let requestedIndex: number | null = null
  if (indexParam !== null) {
    const parsed = Number(indexParam)
    if (!Number.isFinite(parsed)) {
      return NextResponse.json({ error: 'INVALID_INDEX' }, { status: 400 })
    }
    requestedIndex = parsed
  }

  const s = supabaseServer(session.access_token) as any

  const query = s
    .from('herd_rounds')
    .select('id, idx, category, count, status, settings')
    .eq('game_code', gameCode)
    .order('idx', { ascending: true })

  if (requestedIndex !== null) {
    query.eq('idx', requestedIndex)
  }

  const { data: rounds, error: roundsErr } = await query

  if (roundsErr) {
    return NextResponse.json({ error: roundsErr.message }, { status: 400 })
  }

  const list = asArray<{
    id: string
    idx: number
    category: string
    count: number | null
    status: string | null
    settings: Record<string, unknown> | null
  }>(rounds)

  const runIds = new Set<string>()
  for (const round of list) {
    const settings = (round.settings ?? {}) as Record<string, unknown>
    const runId = typeof (settings as any).runId === 'string' ? String((settings as any).runId) : null
    if (runId) runIds.add(runId)
  }

  const runIdArray = Array.from(runIds)
  const runMap = new Map<string, { run_number: number | null; status: string | null }>()
  if (runIdArray.length > 0) {
    const { data: runRows, error: runErr } = await s
      .from('herd_game_runs')
      .select('id, run_number, status')
      .in('id', runIdArray)

    if (!runErr || !isRunStorageUnavailable(runErr)) {
      if (runErr) {
        return NextResponse.json({ error: runErr.message }, { status: 400 })
      }
      asArray(runRows).forEach((row: any) => {
        runMap.set(String(row.id), {
          run_number: typeof row.run_number === 'number' ? row.run_number : null,
          status: typeof row.status === 'string' ? row.status : null,
        })
      })
    }
  }

  const usageMap = new Map<string, string[]>()
  if (runIdArray.length > 0) {
    const { data: usageRows, error: usageErr } = await s
      .from('herd_question_usage')
      .select('run_id, question_id, category_id')
      .in('run_id', runIdArray)
      .eq('game_code', gameCode)

    if (!usageErr || !isUsageStorageUnavailable(usageErr)) {
      if (usageErr) {
        return NextResponse.json({ error: usageErr.message }, { status: 400 })
      }
      asArray(usageRows).forEach((row: any) => {
        const key = `${row.run_id}:${row.category_id}`
        const existing = usageMap.get(key) ?? []
        existing.push(String(row.question_id))
        usageMap.set(key, existing)
      })
    }
  }

  const diagnostics: DiagnosticEntry[] = []

  for (const round of list) {
      const settings = (round.settings ?? {}) as Record<string, unknown>
      const rawLocale =
        typeof (settings as any).localePrefix === 'string'
          ? String((settings as any).localePrefix)
          : ''
      const localePrefix = sanitizeLocalePrefix(rawLocale)
      const runId = typeof (settings as any).runId === 'string' ? String((settings as any).runId) : null
      const runMeta = runId ? runMap.get(runId) ?? null : null
      const usageTrackingDisabled = Boolean((settings as any).usageTrackingDisabled)
      const status = typeof round.status === 'string' ? round.status : 'setup'
      const localeFilter = `locale.is.null,locale.ilike.${localePrefix}%`
      const configuredCount =
        typeof round.count === 'number'
          ? round.count
          : Number(round.count ?? 0) || 0

      const storedQuestions = Array.isArray((settings as any).questions)
        ? ((settings as any).questions as unknown[])
        : []

      const fallbackLimit = Math.max(1, configuredCount)
      const shouldSkip =
        status === 'setup' &&
        storedQuestions.length === 0 &&
        rawLocale.trim().length === 0 &&
        !runId

      if (shouldSkip) {
        continue
      }

      const { count: availableCount, error: countErr } = await s
        .from('herd_questions')
        .select('id', { head: true, count: 'exact' })
        .eq('category_id', round.category)
        .eq('classic', true)
        .or(localeFilter)

      let rpcError: string | null = null
      let rpcIds: string[] = []
      let trackingUnavailable = false
      let fallbackTried = false
      let fallbackClassicFilter = true
      let fallbackIds: string[] = []
      let fallbackError: string | null = null

      if (countErr) {
        rpcError = countErr.message
      } else if (usageTrackingDisabled) {
        rpcError = 'Sledovanie použitých otázok je vypnuté'
      } else {
        const { data: rpcData, error: rpcErr } = await s.rpc('random_herd_questions', {
          cat: round.category,
          n: Math.max(0, configuredCount),
          locale_prefix: localePrefix,
          run: runId,
        })

        if (rpcErr) {
          if (isRandomQuestionRpcUnavailable(rpcErr)) {
            rpcError = 'Funkcia random_herd_questions nie je dostupná – používam fallback'
            trackingUnavailable = true
          } else if (isUsageStorageUnavailable(rpcErr)) {
            rpcError = 'Sledovanie použitých otázok nie je dostupné'
            trackingUnavailable = true
          } else {
            rpcError = rpcErr.message
          }
        } else {
          rpcIds = asArray<{ id: string }>(rpcData).map((row) => row.id)
        }
      }

      const fetchFallback = async (requireClassic: boolean) => {
        let query = s
          .from('herd_questions')
          .select('id')
          .eq('category_id', round.category)
          .or(localeFilter)

        if (requireClassic) {
          query = query.eq('classic', true)
        }

        const { data, error } = await query
        return { ids: asArray<{ id: string }>(data).map((row) => row.id), error }
      }

      if (rpcIds.length === 0) {
        fallbackTried = true
        const primary = await fetchFallback(true)
        if (primary.error) {
          if (primary.error.code === '42703') {
            fallbackClassicFilter = false
            const secondary = await fetchFallback(false)
            if (secondary.error) {
              fallbackError = secondary.error.message
            } else {
              fallbackIds = secondary.ids.slice(0, fallbackLimit)
            }
          } else {
            fallbackError = primary.error.message
          }
        } else if (primary.ids.length > 0) {
          fallbackIds = primary.ids.slice(0, fallbackLimit)
        } else {
          fallbackClassicFilter = false
          const secondary = await fetchFallback(false)
          if (secondary.error) {
            fallbackError = secondary.error.message
          } else {
            fallbackIds = secondary.ids.slice(0, fallbackLimit)
          }
        }
      }

      const storedIds = storedQuestions.map((value) => String(value))
      const usageKey = runId ? `${runId}:${round.category}` : null
      const usageIds = usageKey ? usageMap.get(usageKey) ?? [] : []
      const missingUsage = storedIds.filter((id) => !usageIds.includes(id))

      diagnostics.push({
        roundId: round.id,
        index: round.idx,
        categoryId: round.category,
        configuredCount,
        localePrefix,
        availableCount: typeof availableCount === 'number' ? availableCount : null,
        countError: countErr ? countErr.message : null,
        rpcIds,
        rpcCount: rpcIds.length,
        rpcError,
        fallbackTried,
        fallbackClassicFilter,
        fallbackIds,
        fallbackCount: fallbackIds.length,
        fallbackError,
        storedQuestionCount: storedQuestions.length,
        storedQuestionIds: storedIds,
        runId,
        runNumber: runMeta?.run_number ?? null,
        status,
        usageTrackingDisabled: usageTrackingDisabled || trackingUnavailable,
        usageRecordedCount: usageIds.length,
        usageRecordedIds: usageIds,
        usageMissingIds: missingUsage,
      })
  }

  return NextResponse.json({ ok: true, rounds: diagnostics })
}
