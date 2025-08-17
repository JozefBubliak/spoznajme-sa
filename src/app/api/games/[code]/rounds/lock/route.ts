import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,

  ctx: { params: { code: string } }
) {
  const { code } = ctx.params

  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const { roundId } = body

  // Find the active round
  let targetRound
  if (roundId) {
    targetRound = game.rounds.find(r => r.id === roundId)
  } else {
    targetRound = store.getActiveRound(gameCode)
  }

  if (!targetRound || targetRound.status !== 'running') {
    return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
  }

  // Update round state
  targetRound.status = 'locked'

  // Publish realtime event
  const channel = channelFor(gameCode)
  await RealtimeServer.publish(channel, {
    type: 'round:lock',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: targetRound.qIndex || 0,
    at: Date.now()
  })

  return NextResponse.json({ 
    success: true, 
    roundId: targetRound.id,
    qIndex: targetRound.qIndex || 0
  })
}