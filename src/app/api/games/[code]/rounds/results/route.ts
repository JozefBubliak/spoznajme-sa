// PATH: src/app/api/games/[code]/rounds/results/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { calculateRoundScores, mapFromGameScoringMode } from '@/lib/herdvote/scoring'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({})) as { roundId?: string }

  const s = supabaseServer() // service role — bypasses RLS

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
    .select('id, idx, q_index, status, settings, timer_deadline, question_seconds')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .maybeSingle()

  if (roundErr || !round) {
    return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
  }
  if (round.status === 'results') {
    return NextResponse.json({ success: true })
  }
  if (round.status !== 'locked') {
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
    .select('id, correct_answer, fun_fact')
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
  let scoring = roundSettings.scoring
  if (!scoring) {
    const { data: g } = await s
      .from('herd_games')
      .select('scoring_mode')
      .eq('code', gameCode)
      .maybeSingle()
    scoring = mapFromGameScoringMode((g?.scoring_mode as any) ?? 'simple')
  }

  // Full roster so players who never submitted still get the "none" points.
  const { data: roster } = await s
    .from('herd_players')
    .select('id')
    .eq('game_code', gameCode)
  const allPlayerIds = asArray(roster).map((p: any) => String(p.id))

  // ── Streak context (consecutive correct answers carried into this question) ──
  const streakByPlayer: Record<string, number> = {}
  if (scoring?.mode === 'classic') {
    try {
      const [{ data: allRounds }, { data: allAnswers }] = await Promise.all([
        s.from('herd_rounds').select('id, idx, settings').eq('game_code', gameCode).limit(500),
        s.from('herd_answers').select('player_id, round_id, q_index, answer').eq('game_code', gameCode).limit(20000),
      ])
      // Ordered list of every question BEFORE the current one (round idx, then q_index).
      const priorQ: { roundId: string; qIndex: number; questionId: string }[] = []
      for (const r of asArray<any>(allRounds).sort((a, b) => (a.idx ?? 0) - (b.idx ?? 0))) {
        const qids: string[] = (r.settings as any)?.questions ?? []
        qids.forEach((qid, qi) => {
          const before = (r.idx ?? 0) < (round.idx ?? 0) || (r.id === round.id && qi < qIndex)
          if (before && qid) priorQ.push({ roundId: r.id, qIndex: qi, questionId: qid })
        })
      }
      const priorIds = [...new Set(priorQ.map(p => p.questionId))]
      const correctById = new Map<string, string>()
      if (priorIds.length) {
        const { data: qs } = await s.from('herd_questions').select('id, correct_answer').in('id', priorIds)
        for (const q of asArray<any>(qs)) correctById.set(String(q.id), String(q.correct_answer))
      }
      const ansKey = (pid: string, rid: string, qi: number) => `${pid}|${rid}|${qi}`
      const ansMap = new Map<string, string | null>()
      for (const a of asArray<any>(allAnswers)) ansMap.set(ansKey(a.player_id, a.round_id, a.q_index), a.answer ?? null)
      for (const pid of allPlayerIds) {
        let streak = 0
        for (const pq of priorQ) {
          const given = ansMap.get(ansKey(pid, pq.roundId, pq.qIndex))
          if (given && given === correctById.get(pq.questionId)) streak++
          else streak = 0
        }
        streakByPlayer[pid] = streak
      }
    } catch { /* streak is a bonus — never block scoring on it */ }
  }

  const durationMs = round.question_seconds ? Number(round.question_seconds) * 1000 : null
  const deadlineMs = round.timer_deadline ? new Date(round.timer_deadline as any).getTime() : null

  const questionScores = calculateRoundScores(
    playerAnswers,
    { correct_answer: question.correct_answer } as any,
    round.id,
    qIndex,
    scoring,
    { allPlayerIds, streakByPlayer, durationMs, deadlineMs }
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

  // Streak each player holds AFTER this question (correct → +1, otherwise reset).
  const correctPlayerIds = new Set(
    playerAnswers.filter(a => a.answer === question.correct_answer).map(a => a.playerId)
  )
  const streaksAfter: Record<string, number> = {}
  for (const pid of allPlayerIds) {
    streaksAfter[pid] = correctPlayerIds.has(pid) ? (streakByPlayer[pid] ?? 0) + 1 : 0
  }

  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
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
    funFact: (question as any).fun_fact ?? null,
    streaks: streaksAfter,
    leaderboard: leaderboard || [],
    questionScores,
  })
}
