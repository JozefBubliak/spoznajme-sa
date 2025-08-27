// PATH: src/app/api/games/[code]/rounds/results/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { calculateRoundScores } from '@/lib/herdvote/scoring'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  context: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context.params.code).toUpperCase()

  const body = await req.json().catch(() => ({})) as { roundId?: string }

  const s = supabaseServer(session.access_token)

  // načítaj kolo, ktoré je uzamknuté
  let roundId = body.roundId
  if (!roundId) {
    const { data: locked, error: lockedErr } = await s
      .from('herd_rounds')
      .select('id, q_index, settings')
      .eq('game_code', gameCode)
      .eq('status', 'locked')
      .maybeSingle()
    if (lockedErr || !locked) {
      return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
    }
    roundId = locked.id
  }

  const { data: round, error: roundErr } = await s
    .from('herd_rounds')
    .select('id, q_index, status, settings')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .maybeSingle()

  if (roundErr || !round || round.status !== 'locked') {
    return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
  }

  const qIndex = round.q_index || 0
  const questions: string[] = (round.settings as any)?.questions || []
  const questionId = questions[qIndex]
  if (!questionId) {
    return NextResponse.json({ error: 'No current question' }, { status: 400 })
  }

  const { data: question, error: questionErr } = await s
    .from('herd_questions')
    .select('id, correct_answer')
    .eq('id', questionId)
    .maybeSingle()

  if (questionErr || !question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  const { data: answers, error: ansErr } = await s
    .from('herd_answers')
    .select('player_id, answer, answered_at')
    .eq('round_id', round.id)
    .eq('q_index', qIndex)

  if (ansErr) {
    return NextResponse.json({ error: ansErr.message }, { status: 400 })
  }

  const playerAnswers = asArray(answers).map(a => ({
    playerId: a.player_id,
    roundId: round.id,
    qIndex,
    answer: a.answer as any,
    ts: new Date(a.answered_at as any).getTime(),
  }))

  const roundSettings = (round.settings as any) ?? {}
  const scoring = roundSettings.scoring ?? { mode: 'classic', correct: 1, incorrect: 0, none: 0 }

  const questionScores = calculateRoundScores(
    playerAnswers,
    { correct_answer: question.correct_answer } as any,
    round.id,
    qIndex,
    scoring
  )

  // aktualizuj skóre hráčov
  for (const [playerId, pts] of Object.entries(questionScores)) {
    const { data: player } = await s
      .from('herd_players')
      .select('score')
      .eq('id', playerId)
      .single()
    const newScore = (player?.score || 0) + Number(pts)
    await s.from('herd_players').update({ score: newScore }).eq('id', playerId)
  }

  await s.from('herd_rounds').update({ status: 'results' }).eq('id', round.id)

  const { data: leaderboard } = await s
    .from('herd_players')
    .select('id, name, score')
    .eq('game_code', gameCode)
    .order('score', { ascending: false })

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'round:results',
    code: gameCode,
    roundId: round.id,
    qIndex,
    correct: question.correct_answer as any,
    leaderboard,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex,
    correct: question.correct_answer,
    leaderboard: leaderboard || [],
    questionScores,
  })
}
