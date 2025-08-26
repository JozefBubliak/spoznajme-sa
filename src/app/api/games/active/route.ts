import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

const INACTIVITY_MS = 15 * 60 * 1000

export async function GET(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = supabaseServer(session.access_token)

  const { data: room } = await supabase
    .from('rooms')
    .select('id, code')
    .eq('owner_id', session.user.id)
    .single()

  if (!room) return NextResponse.json({}, { status: 204 })

  const { data: gs } = await supabase
    .from('game_sessions')
    .select('id, status, updated_at, created_at')
    .eq('room_id', room.id)
    .in('status', ['lobby', 'setup', 'running'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!gs) return NextResponse.json({}, { status: 204 })

  const last = new Date(gs.updated_at ?? gs.created_at ?? Date.now())
  if (Date.now() - last.getTime() > INACTIVITY_MS) {
    await supabase.from('game_sessions').update({ status: 'ended' }).eq('id', gs.id)
    return NextResponse.json({}, { status: 204 })
  }

  return NextResponse.json({ code: room.code, status: gs.status })
}
