// PATH: src/app/api/games/[code]/rounds/results/route.ts
import { NextResponse } from 'next/server'
import { store, type Player } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { calculateRoundScores } from '@/lib/herdvote/scoring'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface ResultsBody { roundId?: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request, { params }: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = params as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = (await req.json().catch(() => ({}))) as ResultsBody
  const { roundId } = body

  // nájdi uzamknuté kolo
  const targetRound = roundId
    ? game.rounds.find(r => r.id === roundId)
    : store.getActiveRound(gameCode)

  if (!targetRound || targetRound.status !== 'locked') {
    return NextResponse.json({ error: 'No locked round to evaluate' }, { status: 400 })
  }

  const qIndex = targetRound.qIndex || 0
  const currentQuestion = targetRound.questions[qIndex]
  if (!currentQuestion) {
    return NextResponse.json({ error: 'No current question' }, { status: 400 })
  }

  // zabezpeč, aby pole answers existovalo (niektoré verzie store ho nemajú)
  game.answers ||= []

  // výpočet bodov pre aktuálnu otázku
  const questionScores = calculateRoundScores(
    game.answers,
    currentQuestion,
    targetRound.id,
    qIndex,
    targetRound.settings.scoring
  )

  // prirátaj body hráčom
  for (const [playerId, pts] of Object.entries(questionScores)) {
    const player = game.players.find(p => p.id === playerId)
    if (player) player.score += Number(pts) || 0
  }

  // stav kola -> results
  targetRound.status = 'results'

  // zoradený rebríček
  const leaderboard: Player[] = [...game.players].sort((a, b) => b.score - a.score)

  // realtime event
  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'round:results',
    code: gameCode,
    roundId: targetRound.id,
    qIndex,
    correct: currentQuestion.correct_answer,
    leaderboard,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: targetRound.id,
    qIndex,
    correct: currentQuestion.correct_answer,
    leaderboard,
    questionScores,
  })
}
