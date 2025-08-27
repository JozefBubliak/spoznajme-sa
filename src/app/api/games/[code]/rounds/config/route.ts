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
  const { index, categoryId, questions, prepSeconds, questionSeconds, scoringMode } = body

  const s = supabaseServer(session.access_token) as any // "as any" obíde TS typy generované zo Supabase

  // uloženie/aktualizácia kola (idempotentne podľa game_code + idx)
    const { data: saved, error } = await s
      .from('herd_rounds')
      .upsert(
        {
          game_code: gameCode,
          idx: index,
        category: categoryId,
        count: questions,
        prep_seconds: prepSeconds,
        question_seconds: questionSeconds,
        scoring_mode: scoringMode,
        status: 'setup',
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

  // voliteľne: ak je to posledné potvrdené kolo, prepneme hru do "ready"
  try {
    const g = await s.from('herd_games').select('total_rounds').eq('code', gameCode).single()
    const have = await s
      .from('herd_rounds')
      .select('idx', { count: 'exact', head: true })
      .eq('game_code', gameCode)

    if (!g.error && !have.error && (have.count ?? 0) >= (g.data?.total_rounds ?? 0)) {
      await s.from('herd_games').update({ phase: 'ready' }).eq('code', gameCode)
    }
  } catch {
    // nič – len nech to nepadne, keď typy/kolónky chýbajú
  }

    return NextResponse.json({ ok: true, roundId: savedRound.id, phase: 'round_setup', savedIndex: index })
}
