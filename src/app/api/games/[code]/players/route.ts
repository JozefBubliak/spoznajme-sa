// PATH: src/app/api/games/[code]/players/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { RealtimeServer } from '@/lib/realtime/server'

export const dynamic = 'force-dynamic'

// GET – vráti zoznam hráčov v hre
export async function GET(_req: NextRequest, context: any) {
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ players: [] })
  }

  const supabase = supabaseServer()

  const { data: players } = await supabase
    .from('herd_players')
    .select('id, name, score, joined_at')
    .eq('game_code', gameCode)
    .order('joined_at', { ascending: true })

  return NextResponse.json({ players: players || [] })
}

// POST – pripojí hráča do hry
export async function POST(req: NextRequest, context: any) {
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid game code' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({})) as { name?: string }
  const playerName = String(body.name || '').trim()
  if (!playerName) {
    return NextResponse.json({ error: 'Player name is required' }, { status: 400 })
  }

  const supabase = supabaseServer()

  // Check if game exists and lobby is open
  const { data: game } = await supabase
    .from('herd_games')
    .select('id, phase, lobby_locked')
    .eq('code', gameCode)
    .single()

  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  if (game.lobby_locked || game.phase !== 'lobby') {
    return NextResponse.json({ error: 'Lobby is closed' }, { status: 400 })
  }

  // Check if player name is already taken
  const { data: existing } = await supabase
    .from('herd_players')
    .select('id')
    .eq('game_code', gameCode)
    .eq('name', playerName)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Player name already taken' }, { status: 400 })
  }

  // Add player to game
  const { data: player, error } = await supabase
    .from('herd_players')
    .insert({
      game_code: gameCode,
      name: playerName,
      score: 0
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Broadcast player joined event
  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'player:joined',
    code: gameCode,
    player: { id: player.id, name: player.name, score: player.score },
    at: Date.now()
  })

  return NextResponse.json({
    success: true,
    playerId: player.id,
    name: player.name,
    score: player.score
  })
}
