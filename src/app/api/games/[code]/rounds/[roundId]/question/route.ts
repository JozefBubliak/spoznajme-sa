// PATH: src/app/api/games/[code]/rounds/[roundId]/question/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

type FourAnswers = {
  answer_a?: string
  answer_b?: string
  answer_c?: string
  answer_d?: string
}

export async function GET(
  req: Request,
  context: { params: { code: string; roundId: string } }
) {
  const code = String(context.params.code || '').toUpperCase()
  const roundId = context.params.roundId
n

  const url = new URL(req.url)
  const qIndexParam = url.searchParams.get('qIndex')

  const s = supabaseServer()

  const { data: round } = await s
    .from('herd_rounds')
    .select('q_index, status, settings')
    .eq('id', roundId)
    .eq('game_code', code)
    .single()

  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }

  const qIndex = qIndexParam ? parseInt(qIndexParam, 10) : round.q_index || 0
  const questions: string[] = (round.settings as any)?.questions || []
  const questionId = questions[qIndex]
  if (!questionId) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  const { data: question } = await s
    .from('herd_questions')
    .select('question_text, answer_a, answer_b, answer_c, answer_d')
    .eq('id', questionId)
    .single()

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  const q = question as FourAnswers & { question_text?: string }
  const optionsArray = [q.answer_a, q.answer_b, q.answer_c, q.answer_d].filter(Boolean) as string[]

  return NextResponse.json({
    text: q.question_text || '',
    options: optionsArray,
    timeLeft: 0,
    qIndex,
    totalQuestions: questions.length,
    roundStatus: round.status,
  })
}
