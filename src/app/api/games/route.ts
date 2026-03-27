// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }

import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { ensureActiveRun } from './[code]/_runs'
import { resetGameArtifacts } from './[code]/_reset'

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // authClient: passes user JWT so RPCs can call auth.uid() internally (SECURITY DEFINER functions)
  const authClient = supabaseServer(session.access_token)
  // adminClient: pure service role — bypasses RLS for direct table writes
  const adminClient = supabaseServer()

  // Step 1: ensure_room RPC needs user identity (auth.uid() inside the function)
  const { data: room, error: roomError } = await authClient.rpc('ensure_room')
  if (roomError || !room) {
    console.error('[POST /api/games] ensure_room failed:', roomError?.code, roomError?.message)
    return NextResponse.json({ error: roomError?.message || 'Failed to ensure room' }, { status: 500 })
  }

  // Step 2: open_lobby RPC also needs user identity
  const { error: lobbyError } = await authClient.rpc('open_lobby')
  if (lobbyError) {
    console.error('[POST /api/games] open_lobby failed:', lobbyError.code, lobbyError.message)
    return NextResponse.json({ error: lobbyError.message }, { status: 500 })
  }

  // Step 3: upsert into herd_games using admin client (bypasses RLS — avoids JWT/RLS conflicts)
  const { error: upsertError } = await adminClient
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
      { onConflict: 'code' },
    )

  if (upsertError) {
    console.error('[POST /api/games] herd_games upsert failed:', upsertError.code, upsertError.message, '| game code:', room.code)
    return NextResponse.json({ error: `Failed to save game: ${upsertError.message}` }, { status: 500 })
  }

  // Step 4: ensure run tracking (uses admin client, has internal fallback for missing table)
  try {
    await ensureActiveRun(adminClient, room.code, session.user.id)
  } catch (err) {
    console.error('[POST /api/games] ensureActiveRun failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to initialise run' }, { status: 500 })
  }

  // Step 5: clear stale round/player/answer data from previous game runs
  try {
    await resetGameArtifacts(adminClient, room.code)
  } catch (err) {
    console.error('[POST /api/games] resetGameArtifacts failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to reset game data' }, { status: 500 })
  }

  return NextResponse.json({ gameCode: room.code })
}
