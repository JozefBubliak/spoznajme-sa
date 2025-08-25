// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import store, { type Game } from '@/lib/herdvote/store'
import { randomUUID } from 'crypto'

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

  // Keep in-memory store for subsequent round operations
  if (!store.getGame(room.code)) {
    const newGame: Game = {
      id: randomUUID(),
      code: room.code,
      status: 'waiting',
      settings: {},
      players: [],
      rounds: [],
      answers: [],
      createdAt: Date.now(),
    }
    store.games.set(room.code, newGame)
  }

  const { error: lobbyError } = await supabase.rpc('open_lobby')
  if (lobbyError) {
    return NextResponse.json({ error: lobbyError.message }, { status: 500 })
  }

  return NextResponse.json({ gameCode: room.code })
}
