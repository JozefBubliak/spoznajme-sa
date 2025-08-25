import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })


  const code = String(context?.params?.code || '').toUpperCase()

  const s = supabaseServer(session.access_token)

  const { data: game, error } = await s
    .from('herd_games')
    .select('code, phase, total_rounds, active_round_index, lobby_locked')
    .eq('code', code)
    .eq('owner_id', session.user.id)
    .single()

  if (error || !game) {
    return NextResponse.json('Game not found', { status: 404 })
  }

  const { count: roundsCount } = await s
    .from('herd_rounds')
    .select('idx', { count: 'exact', head: true })
    .eq('game_code', code)

  const phase =
    game.phase === 'setup'
      ? 'config'
      : game.phase === 'running'
        ? 'playing'
        : game.phase === 'ended'
          ? 'final'
          : (game.phase as any) ?? 'lobby'

  return NextResponse.json({
    code: game.code,
    phase,
    lobby_locked: !!game.lobby_locked,
    total_rounds: game.total_rounds ?? roundsCount ?? 0,
    active_round_index: game.active_round_index ?? 0,
  })
}
