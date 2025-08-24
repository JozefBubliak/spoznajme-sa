// PATH: src/app/api/games/[code]/rounds/next/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({} as any))
  const { roundId } = body

  // nájdi kolo v stave "results"
  const targetRound = roundId
    ? game.rounds.find(r => r.id === roundId)
    : store.getActiveRound(gameCode)

  if (!targetRound || targetRound.status !== 'results') {
    return NextResponse.json({ error: 'No round in results state' }, { status: 400 })
  }

  const currentQIndex = targetRound.qIndex || 0
  const nextQIndex = currentQIndex + 1

  // ak už nie sú otázky, kolo je hotové
  if (nextQIndex >= targetRound.questions.length) {
    targetRound.status = 'finished'

    const leaderboard = [...game.players].sort((a, b) => b.score - a.score)

    await RealtimeServer.publish(channelFor(gameCode), {
      type: 'round:finish',
      code: gameCode,
      roundId: targetRound.id,
      leaderboard,
      at: Date.now(),
    })

    return NextResponse.json({
      success: true,
      roundId: targetRound.id,
      finished: true,
      leaderboard,
    })
  }

  // ďalšia otázka
  targetRound.qIndex = nextQIndex
  targetRound.status = 'running'
  targetRound.startedAt = Date.now()

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'game:start',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: nextQIndex,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: targetRound.id,
    qIndex: nextQIndex,
    finished: false,
  })
}
