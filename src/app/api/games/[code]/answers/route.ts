import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { PlayerAnswer } from '@/lib/herdvote/store'

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
  const { playerId, roundId, qIndex, answer } = body as {
    playerId: string
    roundId: string
    qIndex: number
    answer: 'A' | 'B' | 'C' | 'D' | null
  }

  // Validate required fields
  if (!playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validate player exists
  const player = game.players.find(p => p.id === playerId)
  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 })
  }

  // Validate round exists and is running
  const round = game.rounds.find(r => r.id === roundId)
  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }

  if (round.status !== 'running') {
    return NextResponse.json({ error: 'Round is not accepting answers' }, { status: 400 })
  }

  // Validate question index
  if (qIndex !== (round.qIndex || 0)) {
    return NextResponse.json({ error: 'Question index mismatch' }, { status: 400 })
  }

  if (qIndex >= round.questions.length) {
    return NextResponse.json({ error: 'Invalid question index' }, { status: 400 })
  }

  // Check if player already answered this question (idempotency)
  const existingAnswer = store.getPlayerAnswer(playerId, roundId, qIndex)
  if (existingAnswer) {
    return NextResponse.json({ 
      success: true, 
      message: 'Answer already recorded',
      answer: existingAnswer.answer
    })
  }

  // Validate answer
  if (answer && !['A', 'B', 'C', 'D'].includes(answer)) {
    return NextResponse.json({ error: 'Invalid answer' }, { status: 400 })
  }

  // Create and store the answer
  const playerAnswer: PlayerAnswer = {
    playerId,
    roundId,
    qIndex,
    answer,
    ts: Date.now()
  }

  game.answers.push(playerAnswer)

  return NextResponse.json({ 
    success: true,
    playerId,
    roundId,
    qIndex,
    answer
  })
}