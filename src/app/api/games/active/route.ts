import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const s = supabaseServer() // service role — bypasses RLS

  // Recent, not-yet-finished games this moderator owns.
  const { data: games } = await s
    .from('herd_games')
    .select('code, phase, created_at')
    .eq('owner_id', session.user.id)
    .in('phase', ['lobby', 'config', 'round_setup', 'playing'])
    .order('created_at', { ascending: false })
    .limit(20)

  const STALE_LOBBY_MS = 6 * 60 * 60 * 1000 // 6h

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
        createdAt: game.created_at,
      }
    })
  )

  // Only surface games worth resuming: anything in progress, or a fresh lobby.
  // An empty lobby left sitting for hours is abandoned — don't clutter the list.
  const now = Date.now()
  const resumable = gamesWithCounts.filter((g) => {
    if (g.phase !== 'lobby') return true
    if (g.playerCount > 0) return true
    const age = now - new Date(g.createdAt as string).getTime()
    return age < STALE_LOBBY_MS
  })

  return NextResponse.json({ games: resumable })
}

