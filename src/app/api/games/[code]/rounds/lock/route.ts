// PATH: src/app/api/games/[code]/rounds/lock/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }
  const body = await req.json().catch(() => ({})) as { roundId?: string }

  const s = supabaseServer() // service role — bypasses RLS

  // nájdi kolo v stave "running"
  let roundId = body.roundId
  if (!roundId) {
    const { data: running } = await s
      .from('herd_rounds')
      .select('id, q_index')
      .eq('game_code', gameCode)
      .eq('status', 'running')
      .single()
    if (!running) {
      return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
    }
    roundId = running.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .single()

  if (!round) {
    return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
  }
  if (round.status === 'locked') {
    return NextResponse.json({ success: true, roundId: round.id, qIndex: round.q_index || 0 })
  }
  if (round.status !== 'running') {
    return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
  }

  await s
    .from('herd_rounds')
    .update({ status: 'locked' })
    .eq('id', round.id)

  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'round:lock',
    code: gameCode,
    roundId: round.id,
    qIndex: round.q_index || 0,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: round.q_index || 0,
  })
}
