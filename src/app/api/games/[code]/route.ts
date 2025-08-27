import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { must } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  context: { params: { code: string } }
) {
  const gameCode = String(context.params.code).toUpperCase()

  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const s = supabaseServer(session.access_token)


  const { data: game, error } = await s
    .from('herd_games')
    .select('code, phase, total_rounds, active_round_index, lobby_locked')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .maybeSingle()

  if (error) {
    return NextResponse.json('Game not found', { status: 404 })
  }
  const g = must(game, 'Game not found')

  const { count: roundsCount } = await s
    .from('herd_rounds')
    .select('idx', { count: 'exact', head: true })
    .eq('game_code', gameCode)

  const phase =
    g.phase === 'setup'
      ? 'config'
        : g.phase === 'running'
        ? 'playing'
          : g.phase === 'ended'
          ? 'final'
            : (g.phase as any) ?? 'lobby'

  return NextResponse.json({
      code: g.code,
      phase,
      lobby_locked: !!g.lobby_locked,
      total_rounds: g.total_rounds ?? roundsCount ?? 0,
      active_round_index: g.active_round_index ?? 0,
    })
}
