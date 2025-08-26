import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const gameCode = String(params.code).toUpperCase()

  const supabase = supabaseServer(session.access_token)

  const { data: room } = await supabase
    .from('rooms')
    .select('id')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .single()

  if (!room) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const { data: gs } = await supabase
    .from('game_sessions')
    .select('id')
    .eq('room_id', room.id)
    .in('status', ['lobby', 'setup', 'running'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (gs) {
    await supabase.from('game_sessions').update({ status: 'ended' }).eq('id', gs.id)
  }

  return NextResponse.json({ success: true })
}
