import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const s = supabaseServer(session.access_token)

  // Get all active games for the user
  const { data: games } = await s
    .from('herd_games')
    .select('code, phase, created_at')
    .eq('owner_id', session.user.id)
    .in('phase', ['lobby', 'config', 'playing'])
    .order('created_at', { ascending: false })

  // Get player counts for each game
  const gamesWithCounts = await Promise.all(
    (games || []).map(async (game) => {
      const { count: playerCount } = await s
        .from('herd_players')
        .select('id', { count: 'exact', head: true })
        .eq('game_code', game.code)

      return {
        code: game.code,
        phase: game.phase,
        playerCount: playerCount || 0,
        createdAt: game.created_at
      }
    })
  )

  return NextResponse.json({ games: gamesWithCounts })
}

