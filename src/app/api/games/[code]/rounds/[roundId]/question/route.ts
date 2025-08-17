// PATH: src/app/api/games/[code]/rounds/[roundId]/question/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, context: any) {
  const { code, roundId } = (context?.params ?? {}) as {
    code: string
    roundId: string
  }

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const round = game.rounds.find(r => r.id === roundId)
  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }

  // vyber qIndex z query stringu ?qIndex=..., inak použij round.qIndex alebo 0
  const url = new URL(req.url)
  const qIndexParam = url.searchParams.get('qIndex')
  const qIndex = qIndexParam ? parseInt(qIndexParam, 10) : (round.qIndex || 0)

  const question = round.questions[qIndex]
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  // zostatkový čas, ak kolo práve beží
  let timeLeft = 0
  if (round.status === 'running' && round.startedAt) {
    const elapsed = Date.now() - round.startedAt
    const timeLimitMs = (round.settings?.timeLimit ?? 0) * 1000
    timeLeft = Math.max(0, timeLimitMs - elapsed)
  }

  return NextResponse.json({
    text: question.question_text ?? question.text ?? '',
    options: question.options ?? {
      A: question.answer_a,
      B: question.answer_b,
      C: question.answer_c,
      D: question.answer_d,
    },
    timeLeft: Math.ceil(timeLeft / 1000), // sekundy
    qIndex,
    totalQuestions: round.questions.length,
    roundStatus: round.status,
  })
}
