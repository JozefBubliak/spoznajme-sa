// PATH: src/app/api/games/[code]/rounds/results/route.ts
import { NextResponse } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { calculateRoundScores } from '@/lib/herdvote/scoring'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, ctx: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = String(
    Array.isArray(ctx?.params?.code) ? ctx.params.code[0] : ctx?.params?.code
  ).toUpperCase()

  const body = await req.json().catch(() => ({})) as { roundId?: string }

  const s = supabaseServer(session.access_token)

  // načítaj kolo, ktoré je uzamknuté
  let roundId = body.roundId
  if (!roundId) {
    const { data: locked } = await s
      .from('herd_rounds')
      .select('id, q_index, settings')
      .eq('game_code', code)
      .eq('status', 'locked')
      .single()
    if (!locked) {
      return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
    }
    roundId = locked.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status, settings')
    .eq('id', roundId)
    .eq('game_code', code)
    .single()

  if (!round || round.status !== 'locked') {
    return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
  }

  const qIndex = round.q_index || 0
  const questions: string[] = (round.settings as any)?.questions || []
  const questionId = questions[qIndex]
  if (!questionId) {
    return NextResponse.json({ error: 'No current question' }, { status: 400 })
  }

  const { data: question } = await s
    .from('herd_questions')
    .select('id, correct_answer')
    .eq('id', questionId)
    .single()

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  const { data: answers } = await s
    .from('herd_answers')
    .select('player_id, answer, ts')
    .eq('round_id', round.id)
    .eq('q_index', qIndex)

  const playerAnswers = (answers || []).map(a => ({
    playerId: a.player_id,
    roundId: round.id,
    qIndex,
    answer: a.answer as any,
    ts: new Date(a.ts as any).getTime(),
  }))

  const scoring = { mode: 'classic', correct: 1, incorrect: 0, none: 0 } as const

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
    .eq('game_code', code)
    .order('score', { ascending: false })

  await RealtimeServer.publish(channelFor(code), {
    type: 'round:results',
    code,
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
