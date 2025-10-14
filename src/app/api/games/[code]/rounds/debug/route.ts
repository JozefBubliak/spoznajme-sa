// PATH: src/app/api/games/[code]/rounds/debug/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

function sanitizeLocalePrefix(raw: unknown): string {
  const input = typeof raw === 'string' ? raw.trim() : ''
  const sanitized = input.replace(/[^A-Za-z0-9_-]/g, '')
  return sanitized || 'sk'
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
    .select('id, idx, category, count, settings')
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
    settings: Record<string, unknown> | null
  }>(rounds)

  const diagnostics = await Promise.all(
    list.map(async (round) => {
      const settings = (round.settings ?? {}) as Record<string, unknown>
      const localePrefix = sanitizeLocalePrefix((settings as any).localePrefix)
      const localeFilter = `locale.is.null,locale.ilike.${localePrefix}%`
      const configuredCount =
        typeof round.count === 'number'
          ? round.count
          : Number(round.count ?? 0) || 0

      const { count: availableCount, error: countErr } = await s
        .from('herd_questions')
        .select('id', { head: true, count: 'exact' })
        .eq('category_id', round.category)
        .eq('classic', true)
        .or(localeFilter)

      let rpcError: string | null = null
      let rpcIds: string[] = []

      if (countErr) {
        rpcError = countErr.message
      } else {
        const { data: rpcData, error: rpcErr } = await s.rpc('random_herd_questions', {
          cat: round.category,
          n: Math.max(0, configuredCount),
          locale_prefix: localePrefix,
        })

        if (rpcErr) {
          rpcError = rpcErr.message
        } else {
          rpcIds = asArray<{ id: string }>(rpcData).map((row) => row.id)
        }
      }

      const storedQuestions = Array.isArray((settings as any).questions)
        ? ((settings as any).questions as unknown[])
        : []

      return {
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
        storedQuestionCount: storedQuestions.length,
        storedQuestionIds: storedQuestions.map((value) => String(value)),
      }
    })
  )

  return NextResponse.json({ ok: true, rounds: diagnostics })
}
