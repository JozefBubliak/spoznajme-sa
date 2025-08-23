// PATH: src/app/api/games/[code]/players/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

// GET – vráti lobby (zoznam hráčov)
interface RouteContext {
  params: { code: string }
}

export async function GET(_req: Request, context: RouteContext) {
  const { code } = context.params
  const gameCode = String(code || '').toUpperCase()

  const supabase = supabaseServer()

  const { data: room } = await supabase
    .from('rooms')
    .select('id')
    .eq('code', gameCode)
    .single()

  if (!room) return NextResponse.json({ players: [] })

  const { data: session } = await supabase
    .from('game_sessions')
    .select('id')
    .eq('room_id', room.id)
    .in('status', ['lobby', 'setup', 'running'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!session) return NextResponse.json({ players: [] })

  const { data: participants } = await supabase
    .from('participants')
    .select('id, nickname, guest_id')
    .eq('session_id', session.id)

  const players = (participants || []).map(p => ({ id: p.id, name: p.nickname, guestId: p.guest_id }))

  return NextResponse.json({ players })
}

// POST – pridá hráča (kým je lobby otvorená)
interface JoinBody { name?: string; guestId?: string }

export async function POST(req: Request, context: RouteContext) {
  const { code } = context.params
  const gameCode = String(code || '').toUpperCase()

  const body = (await req.json().catch(() => ({}))) as JoinBody
  const name = String(body.name || '').trim()
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  const guestId = body.guestId || randomUUID()

  const supabase = supabaseServer()
  const { data, error } = await supabase.rpc('join_room', {
    p_code: gameCode,
    p_nickname: name,
    p_guest_id: guestId,
  })

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Unable to join' }, { status: 400 })
  }

  return NextResponse.json({ playerId: data.id, name: data.nickname, guestId: data.guest_id, gameCode })
}

