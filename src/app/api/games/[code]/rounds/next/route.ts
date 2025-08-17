import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const { roundId } = body

  // Find the round in results state
  let targetRound
  if (roundId) {
    targetRound = game.rounds.find(r => r.id === roundId)
  } else {
    targetRound = store.getActiveRound(gameCode)
  }

  if (!targetRound || targetRound.status !== 'results') {
    return NextResponse.json({ error: 'No round in results state' }, { status: 400 })
  }

  const currentQIndex = targetRound.qIndex || 0
  const nextQIndex = currentQIndex + 1

  // Check if there are more questions
  if (nextQIndex >= targetRound.questions.length) {
    // Round is finished
    targetRound.status = 'finished'
    
    // Sort players by score for final leaderboard
    const leaderboard = [...game.players].sort((a, b) => b.score - a.score)

    // Publish round finish event
    const channel = channelFor(gameCode)
    await RealtimeServer.publish(channel, {
      type: 'round:finish',
      code: gameCode,
      roundId: targetRound.id,
      leaderboard,
      at: Date.now()
    })

    return NextResponse.json({ 
      success: true, 
      roundId: targetRound.id,
      finished: true,
      leaderboard
    })
  }

  // Move to next question
  targetRound.qIndex = nextQIndex
  targetRound.status = 'running'
  targetRound.startedAt = Date.now()

  // Publish next question start event
  const channel = channelFor(gameCode)
  await RealtimeServer.publish(channel, {
    type: 'game:start',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: nextQIndex,
    at: Date.now()
  })

  return NextResponse.json({
    success: true,
    roundId: targetRound.id,
    qIndex: nextQIndex,
    finished: false
  })
}
