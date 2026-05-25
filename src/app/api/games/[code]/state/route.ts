// PATH: src/app/api/games/[code]/state/route.ts
// Comprehensive game state endpoint – polled by both moderator and players.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, context: any) {
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const url = new URL(req.url)
  const playerId = url.searchParams.get('playerId') ?? null

  // Session is optional – players are anonymous
  const session = await getSession().catch(() => null)

  // Use service-role client (bypasses RLS for public read)
  const s = supabaseServer(session?.access_token)

  // ── Game ────────────────────────────────────────────────────────────────
  const { data: game } = await s
    .from('herd_games')
    .select('code, phase, total_rounds, active_round_index, lobby_locked, owner_id, scoring_mode, question_seconds')
    .eq('code', gameCode)
    .maybeSingle()

  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const isOwner = !!(session?.user && game.owner_id === session.user.id)

  // ── Players ──────────────────────────────────────────────────────────────
  const { data: players } = await s
    .from('herd_players')
    .select('id, name, score')
    .eq('game_code', gameCode)
    .order('score', { ascending: false })

  const playerList = (players ?? []) as { id: string; name: string; score: number }[]

  // Verify player still belongs to this game (prevent stale IDs)
  const myPlayerRecord = playerId ? playerList.find(p => p.id === playerId) ?? null : null

  const result: Record<string, unknown> = {
    code: game.code,
    phase: game.phase ?? 'lobby',
    lobby_locked: !!game.lobby_locked,
    total_rounds: game.total_rounds ?? 0,
    active_round_index: game.active_round_index ?? 0,
    isOwner,
    playerCount: playerList.length,
    players: playerList,
    myPlayer: myPlayerRecord,
  }

  // ── Active Round (playing / round_setup) ─────────────────────────────────
  if (game.phase === 'playing' || game.phase === 'round_setup') {
    const { data: rounds } = await s
      .from('herd_rounds')
      .select('id, idx, status, q_index, count, timer_deadline, question_seconds, scoring_mode, settings, category')
      .eq('game_code', gameCode)
      .order('idx', { ascending: true })

    const allRounds = rounds ?? []
    result.rounds = allRounds.map(r => ({
      id: r.id,
      idx: r.idx,
      status: r.status,
      q_index: r.q_index ?? 0,
      count: r.count,
      timer_deadline: r.timer_deadline,
      question_seconds: r.question_seconds ?? game.question_seconds ?? 30,
      scoring_mode: r.scoring_mode ?? game.scoring_mode ?? 'simple',
    }))

    // Active round: first that is not ready/finished
    const activeRound = allRounds.find(r =>
      !['ready', 'finished'].includes(r.status ?? '')
    ) ?? allRounds.find(r => r.idx === (game.active_round_index ?? 0))

    if (activeRound) {
      const roundInfo = {
        id: activeRound.id,
        idx: activeRound.idx,
        status: activeRound.status,
        q_index: activeRound.q_index ?? 0,
        count: activeRound.count,
        timer_deadline: activeRound.timer_deadline,
        question_seconds: activeRound.question_seconds ?? game.question_seconds ?? 30,
        scoring_mode: activeRound.scoring_mode ?? game.scoring_mode ?? 'simple',
      }
      result.round = roundInfo

      // ── Current Question ──────────────────────────────────────────────────
      const questionIds: string[] = (activeRound.settings as any)?.questions ?? []
      const qIndex = activeRound.q_index ?? 0
      const questionId = questionIds[qIndex]

      if (questionId) {
        const { data: q } = await s
          .from('herd_questions')
          .select('id, question_text, answer_a, answer_b, answer_c, answer_d, correct_answer')
          .eq('id', questionId)
          .maybeSingle()

        if (q) {
          const revealAnswer = ['locked', 'results', 'finished'].includes(activeRound.status ?? '')
          result.question = {
            id: q.id,
            text: q.question_text,
            a: q.answer_a,
            b: q.answer_b,
            c: q.answer_c,
            d: q.answer_d,
            correct: revealAnswer ? (q.correct_answer as string) : null,
            qIndex,
            total: questionIds.length,
          }
        }
      }

      // ── Player's own answer ───────────────────────────────────────────────
      if (playerId && activeRound.status !== 'shown') {
        const { data: ans } = await s
          .from('herd_answers')
          .select('answer')
          .eq('game_code', gameCode)
          .eq('round_id', activeRound.id)
          .eq('q_index', qIndex)
          .eq('player_id', playerId)
          .maybeSingle()
        result.myAnswer = ans?.answer ?? null
      }

      // ── Answer stats (moderator only, locked/results) ─────────────────────
      if (isOwner && ['locked', 'results'].includes(activeRound.status ?? '')) {
        const { data: allAnswers } = await s
          .from('herd_answers')
          .select('answer')
          .eq('game_code', gameCode)
          .eq('round_id', activeRound.id)
          .eq('q_index', qIndex)

        const stats: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
        for (const a of allAnswers ?? []) {
          const k = (a.answer as string)?.toUpperCase()
          if (k && k in stats) stats[k]++
        }
        result.answerStats = stats
        result.answeredCount = (allAnswers ?? []).length
      }

      // ── Leaderboard (results phase or finished) ───────────────────────────
      if (['results', 'finished'].includes(activeRound.status ?? '')) {
        result.leaderboard = playerList
      }
    }
  }

  // ── Final phase leaderboard ───────────────────────────────────────────────
  if (game.phase === 'final') {
    result.leaderboard = playerList
  }

  // ── Configured rounds summary for moderator in round_setup ───────────────
  if (isOwner && game.phase === 'round_setup') {
    const { data: configuredRounds } = await s
      .from('herd_rounds')
      .select('id, idx, status, count, scoring_mode, question_seconds, category')
      .eq('game_code', gameCode)
      .order('idx', { ascending: true })
    result.configuredRounds = (configuredRounds ?? []).map(r => ({
      id: r.id,
      idx: r.idx,
      status: r.status,
      count: r.count,
      scoring_mode: r.scoring_mode,
      question_seconds: r.question_seconds,
      category: r.category,
    }))
  }

  return NextResponse.json(result)
}
