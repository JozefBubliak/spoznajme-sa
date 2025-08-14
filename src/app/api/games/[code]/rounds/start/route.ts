import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const { roundId } = body

  // Find the round to start
  let targetRound
  if (roundId) {
    targetRound = game.rounds.find(r => r.id === roundId)
  } else {
    // Start the first pending round
    targetRound = game.rounds.find(r => r.status === 'pending')
  }

  if (!targetRound) {
    return NextResponse.json({ error: 'No round to start' }, { status: 400 })
  }

  // Update game and round state
  game.status = 'active'
  game.activeRoundId = targetRound.id
  targetRound.status = 'running'
  targetRound.qIndex = 0
  targetRound.startedAt = Date.now()

  // Publish realtime event
  const channel = channelFor(gameCode)
  await RealtimeServer.publish(channel, {
    type: 'game:start',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: 0,
    at: Date.now()
  })

  return NextResponse.json({ 
    success: true, 
    roundId: targetRound.id,
    qIndex: 0
  })
}