// PATH: src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray, must } from '@/lib/supabase/safe'

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
  const { index, categoryId, questions, prepSeconds, questionSeconds, scoringMode } = body

  const s = supabaseServer(session.access_token) as any // "as any" obíde TS typy generované zo Supabase

  // over dostupný počet otázok v danej kategórii podľa rovnakých filtrov ako RPC random_herd_questions
  const requestedCount = Math.max(1, Number(questions) || 0)
  const localePrefix = typeof body?.localePrefix === 'string' && body.localePrefix.trim()
    ? body.localePrefix.trim().toLowerCase()
    : 'sk'

  const { data: preview, error: previewError } = await s.rpc('random_herd_questions', {
    cat: categoryId,
    n: requestedCount,
    locale_prefix: localePrefix,
  })

  if (previewError) {
    return NextResponse.json({ error: previewError.message }, { status: 400 })
  }

  const available = asArray<{ id: string }>(preview).length
  if (available < requestedCount) {
    return NextResponse.json(
      { error: 'NOT_ENOUGH_QUESTIONS', available },
      { status: 400 }
    )
  }

  // uloženie/aktualizácia kola (idempotentne podľa game_code + idx)
  const { data: saved, error } = await s
    .from('herd_rounds')
    .upsert(
      {
        game_code: gameCode,
        idx: index,
        category: categoryId,
        count: requestedCount,
        prep_seconds: prepSeconds,
        question_seconds: questionSeconds,
        scoring_mode: scoringMode,
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
  })
}
