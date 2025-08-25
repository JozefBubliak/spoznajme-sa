// PATH: src/app/api/games/[code]/players/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

// ---- Pomocné typy ----
type Participant = {
  id: string
  nickname: string
  guest_id: string | null
}

// GET – vráti lobby (zoznam hráčov)
export async function GET(
  _req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const gameCode = String(ctx.params?.code || '').toUpperCase()

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

  // ⬇️ odstránený implicitný `any` – pretypujeme pole alebo typujeme parameter
  const list = (participants ?? []) as Participant[]
  const players = list.map((p) => ({
    id: p.id,
    name: p.nickname,
    guestId: p.guest_id ?? undefined,
  }))

  return NextResponse.json({ players })
}

// POST – pridá hráča (kým je lobby otvorená)
export async function POST(
  req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const gameCode = String(ctx.params?.code || '').toUpperCase()

  const body = (await req.json().catch(() => ({}))) as {
    name?: string
    guestId?: string
  }

  const name = String(body?.name || '').trim()
  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }

  const guestId = body?.guestId || randomUUID()

  const supabase = supabaseServer()
  const { data, error } = await supabase.rpc('join_room', {
    p_code: gameCode,
    p_nickname: name,
    p_guest_id: guestId,
  })

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'Unable to join' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    playerId: data.id,
    name: data.nickname,
    guestId: data.guest_id,
    gameCode,
  })
}
