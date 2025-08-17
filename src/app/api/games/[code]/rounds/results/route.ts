import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { calculateRoundScores } from '@/lib/herdvote/scoring'

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

  // Find the locked round
  let targetRound
  if (roundId) {
    targetRound = game.rounds.find(r => r.id === roundId)
  } else {
    targetRound = store.getActiveRound(gameCode)
  }

  if (!targetRound || targetRound.status !== 'locked') {
    return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
  }

  const currentQIndex = targetRound.qIndex || 0
  const currentQuestion = targetRound.questions[currentQIndex]
  
  if (!currentQuestion) {
    return NextResponse.json({ error: 'No current question' }, { status: 400 })
  }

  // Calculate scores for this question
  const questionScores = calculateRoundScores(
    game.answers,
    currentQuestion,
    targetRound.id,
    currentQIndex,
    targetRound.settings.scoring
  )

  // Update player total scores
  for (const [playerId, questionScore] of Object.entries(questionScores)) {
    const player = game.players.find(p => p.id === playerId)
    if (player) {
      player.score += questionScore
    }
  }

  // Update round state
  targetRound.status = 'results'

  // Sort players by score for leaderboard
  const leaderboard = [...game.players].sort((a, b) => b.score - a.score)

  // Publish realtime event
  const channel = channelFor(gameCode)
  await RealtimeServer.publish(channel, {
    type: 'round:results',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: currentQIndex,
    correct: currentQuestion.correct_answer,
    leaderboard,
    at: Date.now()
  })

  return NextResponse.json({
    success: true,
    roundId: targetRound.id,
    qIndex: currentQIndex,
    correct: currentQuestion.correct_answer,
    leaderboard,
    questionScores
  })
}
