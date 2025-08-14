import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ code: string; roundId: string }> }
) {
  const { code, roundId } = await ctx.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const round = game.rounds.find(r => r.id === roundId)
  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }

  const url = new URL(req.url)
  const qIndexParam = url.searchParams.get('qIndex')
  const qIndex = qIndexParam ? parseInt(qIndexParam, 10) : (round.qIndex || 0)

  const question = round.questions[qIndex]
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  // Calculate time left if round is running
  let timeLeft = 0
  if (round.status === 'running' && round.startedAt) {
    const elapsed = Date.now() - round.startedAt
    const timeLimit = round.settings.timeLimit * 1000 // convert to ms
    timeLeft = Math.max(0, timeLimit - elapsed)
  }

  return NextResponse.json({
    text: question.question_text,
    options: question.options,
    timeLeft: Math.ceil(timeLeft / 1000), // return in seconds
    qIndex,
    totalQuestions: round.questions.length,
    roundStatus: round.status
  })
}