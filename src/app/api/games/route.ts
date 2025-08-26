// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }

import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

/**
 * Example (unauthenticated):
 *   curl -i -X POST http://localhost:3000/api/games
 *   -> HTTP/1.1 401 Unauthorized
 */

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = supabaseServer(session.access_token)

  const { data: room, error } = await supabase.rpc('ensure_room')
  if (error || !room) {
    return NextResponse.json({ error: error?.message || 'Failed to ensure room' }, { status: 500 })
  }

  const { error: lobbyError } = await supabase.rpc('open_lobby')
  if (lobbyError) {
    return NextResponse.json({ error: lobbyError.message }, { status: 500 })
  }
  await supabase
    .from('herd_games')
    .upsert(
      {
        code: room.code,
        owner_id: session.user.id,
        phase: 'lobby',
        total_rounds: 0,
        active_round_index: 0,
        lobby_locked: false,
      },
      { onConflict: 'code' }
    )

  return NextResponse.json({ gameCode: room.code })
}
