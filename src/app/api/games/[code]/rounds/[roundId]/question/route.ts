// PATH: src/app/api/games/[code]/rounds/[roundId]/question/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, context: any) {
  const { code, roundId } = (context?.params ?? {}) as { code: string; roundId: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const round = game.rounds.find(r => r.id === roundId)
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })

  const url = new URL(req.url)
  const qIndexParam = url.searchParams.get('qIndex')
  const qIndex = qIndexParam ? parseInt(qIndexParam, 10) : (round.qIndex || 0)

  const question = (round.questions ?? [])[qIndex] as any
  if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

  // Čas – robustne: zober z round.settings.timeLimit alebo z question.time_limit(_seconds)
  const timeLimitSec =
    (round.settings?.timeLimit as number | undefined) ??
    (question.time_limit as number | undefined) ??
    (question.time_limit_seconds as number | undefined) ??
    0

  let timeLeft = 0
  if (round.status === 'running' && round.startedAt && timeLimitSec > 0) {
    const elapsed = Date.now() - round.startedAt
    timeLeft = Math.max(0, timeLimitSec * 1000 - elapsed)
  }

  // Text otázky – podpor oba názvy polí
  const text: string =
    (question.question_text as string | undefined) ??
    (question.text as string | undefined) ??
    ''

  // Možnosti – ak existuje `options` (pole), použijeme ho; inak postavíme z answer_a–d
  const optionsArray: string[] =
    Array.isArray(question.options) && question.options.length >= 2
      ? question.options
      : [
          question.answer_a,
          question.answer_b,
          question.answer_c,
          question.answer_d,
        ].filter(Boolean)

  // Korektná odpoveď – ak je k dispozícii vo formáte A/B/C/D
  const correct: 'A' | 'B' | 'C' | 'D' | undefined =
    question.correct_answer as any

  return NextResponse.json({
    text,
    options: optionsArray,
    timeLeft: Math.ceil(timeLeft / 1000), // v sekundách
    qIndex,
    totalQuestions: (round.questions ?? []).length,
    roundStatus: round.status,
    correctAnswer: correct, // môžes z UI ignorovať ak nechceš prezrádzať
  })
}
