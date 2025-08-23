import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(_req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const supabase = supabaseServer(session.access_token)

  const { data: room } = await supabase
    .from('rooms')
    .select('id')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .single()

  if (!room) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  let { data: sessionRow } = await supabase
    .from('game_sessions')
    .select('id, status')
    .eq('room_id', room.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (sessionRow?.status === 'setup') {
    return NextResponse.json({ success: true, status: sessionRow.status })
  }

  if (!sessionRow || sessionRow.status !== 'waiting') {
    const { error: lobbyError } = await supabase.rpc('open_lobby')
    if (lobbyError) {
      return NextResponse.json({ error: lobbyError.message }, { status: 500 })
    }

    const { data: freshSession, error: selectError } = await supabase
      .from('game_sessions')
      .select('id, status')
      .eq('room_id', room.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (selectError || !freshSession) {
      return NextResponse.json({ error: 'Unable to reset session' }, { status: 500 })
    }

    sessionRow = freshSession
  }

  const { data: updated, error } = await supabase
    .from('game_sessions')
    .update({ status: 'setup' })
    .eq('id', sessionRow.id)
    .select('status')
    .single()

  if (error || !updated) {
    return NextResponse.json({ error: error?.message || 'Unable to lock lobby' }, { status: 500 })
  }

  return NextResponse.json({ success: true, status: updated.status })
}