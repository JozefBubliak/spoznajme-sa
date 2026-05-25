import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { RealtimeServer } from '@/lib/realtime/server'

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }
  const s = supabaseServer() // service role — bypasses RLS

  const { error } = await s
    .from('herd_games')
    .update({ lobby_locked: true, phase: 'config' })
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Broadcast lobby locked event
  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'lobby:locked',
    code: gameCode,
    at: Date.now()
  })

  return NextResponse.json({ success: true, phase: 'config' })
}
