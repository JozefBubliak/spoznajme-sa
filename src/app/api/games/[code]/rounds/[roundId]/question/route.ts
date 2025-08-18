// PATH: src/app/api/games/[code]/rounds/[roundId]/question/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

type FourAnswers = { answer_a?: string; answer_b?: string; answer_c?: string; answer_d?: string }

export async function GET(_req: Request, context: any) {
  const { code, roundId } = (context?.params ?? {}) as { code: string; roundId: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const round = game.rounds.find(r => r.id === roundId)
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })

  const url = new URL(_req.url)
  const qIndexParam = url.searchParams.get('qIndex')
  const qIndex = qIndexParam ? parseInt(qIndexParam, 10) : (round.qIndex || 0)

  const question = round.questions[qIndex]
  if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

  // koľko sekúnd ostáva
  let timeLeft = 0
  if (round.status === 'running' && round.startedAt) {
    const elapsed = Date.now() - round.startedAt
    const timeLimitMs = (round.settings?.timeLimit ?? 0) * 1000
    timeLeft = Math.max(0, timeLimitMs - elapsed)
  }

  // Bezpečný fallback pre možnosti:
  let optionsArray: string[]
  if (Array.isArray((question as any).options) && (question as any).options.length > 0) {
    optionsArray = (question as any).options as string[]
  } else {
    const q = question as unknown as FourAnswers
    optionsArray = [q.answer_a, q.answer_b, q.answer_c, q.answer_d].filter(Boolean) as string[]
  }

  return NextResponse.json({
    text: (question as any).question_text ?? (question as any).text ?? '',
    options: optionsArray,
    timeLeft: Math.ceil(timeLeft / 1000),
    qIndex,
    totalQuestions: round.questions.length,
    roundStatus: round.status,
  })
}
