import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = (context?.params ?? {}) as { code: string }

  const gameCode = String(code || '').toUpperCase()
  const supabase = supabaseServer(session.access_token)

  const { data: game, error: gameErr } = await supabase
    .from('herd_games')
    .select('code, phase, total_rounds, active_round_index')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .single()

  if (gameErr || !game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const { count: roundsCount } = await supabase
    .from('herd_rounds')
    .select('idx', { count: 'exact', head: true })
    .eq('game_code', gameCode)

  return NextResponse.json({
    code: game.code,
    phase: game.phase ?? 'lobby',
    total_rounds: game.total_rounds ?? 0,
    active_round_index: game.active_round_index ?? 0,
    roundsCount: roundsCount ?? 0,
    playersCount: 0,
  })
}