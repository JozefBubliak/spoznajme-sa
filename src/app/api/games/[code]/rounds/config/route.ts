// PATH: src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { must } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  // bezpečné načítanie body
  const body = await req.json().catch(() => ({} as any))
  const {
    index,
    categoryId,
    questions,
    prepSeconds,
    questionSeconds,
    scoringMode,
    localePrefix: localePrefixRaw,
  } = body

  const localePrefixSanitized = String(localePrefixRaw ?? '')
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, '')
  const localePrefix = localePrefixSanitized || 'sk'
  const normalizedCount = Math.max(1, Number(questions) || 0)

  const s = supabaseServer(session.access_token) as any // "as any" obíde TS typy generované zo Supabase

  const { data: existingRound } = await s
    .from('herd_rounds')
    .select('id, settings')
    .eq('game_code', gameCode)
    .eq('idx', index)
    .maybeSingle()

  const existingSettings = ((existingRound?.settings as any) ?? {}) as Record<string, unknown>

  // over dostupný počet otázok v danej kategórii podľa rovnakých filtrov ako RPC random_herd_questions
  const localeFilter = `locale.is.null,locale.ilike.${localePrefix}%`
  const { count: available } = await s
    .from('herd_questions')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', categoryId)
    .eq('classic', true)
    .or(localeFilter)

  const availableCount = typeof available === 'number' ? available : 0
  if (availableCount <= 0) {
    return NextResponse.json(
      { error: 'NOT_ENOUGH_QUESTIONS', available: 0 },
      { status: 400 }
    )
  }

  const selectedCount = Math.min(availableCount, normalizedCount)

  // uloženie/aktualizácia kola (idempotentne podľa game_code + idx)
  const roundSettings = {
    ...existingSettings,
    localePrefix,
  }

  const { data: saved, error } = await s
    .from('herd_rounds')
    .upsert(
      {
        game_code: gameCode,
        idx: index,
        category: categoryId,
        count: selectedCount,
        prep_seconds: prepSeconds,
        question_seconds: questionSeconds,
        scoring_mode: scoringMode,
        settings: roundSettings,
        status: 'ready',
      },
      { onConflict: 'game_code,idx' }
    )
    .select('id')
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  const savedRound = must(saved, 'Unable to save round')

  // udržujeme phase v herd_games
  await s.from('herd_games').update({ phase: 'round_setup' }).eq('code', gameCode)

  return NextResponse.json({
    ok: true,
    roundId: savedRound.id,
    phase: 'round_setup',
    savedIndex: index,
    localePrefix,
    questions: selectedCount,
  })
}
