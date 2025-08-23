import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_req: Request, { params }: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = params as { code: string }

  const gameCode = String(code || '').toUpperCase()
  const supabase = supabaseServer() as any

  const { data: room } = await supabase
    .from('rooms')
    .select('id, code')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .single()

  if (!room) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const { data: sessionRow } = await supabase
    .from('game_sessions')
    .select('id, status')
    .eq('room_id', room.id)
    .in('status', ['lobby', 'setup', 'running'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  let playersCount = 0
  if (sessionRow) {
    const { data: participants } = await supabase
      .from('participants')
      .select('id')
      .eq('session_id', sessionRow.id)
    playersCount = participants?.length || 0
  }

  return NextResponse.json({
    code: gameCode,
    status: sessionRow?.status || 'ended',
    roundsCount: 0,
    playersCount,
  })
}
