// PATH: src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = String(ctx.params.code).toUpperCase()

  // bezpečné načítanie body
  const body = await req.json().catch(() => ({} as any))
  const { index, categoryId, questions, prepSeconds, questionSeconds, scoringMode } = body

  const s = supabaseServer(session.access_token) as any // "as any" obíde TS typy generované zo Supabase

  // uloženie/aktualizácia kola (idempotentne podľa game_code + idx)
  const { error } = await s
    .from('herd_rounds')
    .upsert(
      {
        game_code: code,
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

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // udržujeme phase v herd_games
  await s.from('herd_games').update({ phase: 'round_setup' }).eq('code', code)

  // voliteľne: ak je to posledné potvrdené kolo, prepneme hru do "ready"
  try {
    const g = await s.from('herd_games').select('total_rounds').eq('code', code).single()
    const have = await s
      .from('herd_rounds')
      .select('idx', { count: 'exact', head: true })
      .eq('game_code', code)

    if (!g.error && !have.error && (have.count ?? 0) >= (g.data?.total_rounds ?? 0)) {
      await s.from('herd_games').update({ phase: 'ready' }).eq('code', code)
    }
  } catch {
    // nič – len nech to nepadne, keď typy/kolónky chýbajú
  }

  return NextResponse.json({ ok: true, phase: 'round_setup', savedIndex: index })
}
