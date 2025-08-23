// PATH: src/app/api/games/[code]/rounds/[roundId]/question/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { store, type Question } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

type FourAnswers = { answer_a?: string; answer_b?: string; answer_c?: string; answer_d?: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = context?.params?.code as string
  const roundId = context?.params?.roundId as string
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const round = game.rounds.find(r => r.id === roundId)
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })

  const url = new URL(req.url)
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
  let questionText = ''
  if ('options' in question && Array.isArray((question as Question).options)) {
    const q = question as Question
    optionsArray = q.options
    questionText = q.question_text
  } else {
    const q = question as FourAnswers & { text?: string; question_text?: string }
    optionsArray = [q.answer_a, q.answer_b, q.answer_c, q.answer_d].filter((o): o is string => !!o)
    questionText = q.question_text ?? q.text ?? ''
  }

  return NextResponse.json({
    text: questionText,
    options: optionsArray,
    timeLeft: Math.ceil(timeLeft / 1000),
    qIndex,
    totalQuestions: round.questions.length,
    roundStatus: round.status,
  })
}
