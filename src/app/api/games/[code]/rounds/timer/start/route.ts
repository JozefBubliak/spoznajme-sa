// src/app/api/games/[code]/rounds/timer/start/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({}))
  const round = body.roundId
    ? game.rounds.find(r => r.id === body.roundId)
    : store.getActiveRound(gameCode)

  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  if (round.status !== 'shown') {
    return NextResponse.json({ error: 'Round must be in "shown" state' }, { status: 400 })
  }

  round.status = 'running'
  round.startedAt = Date.now()

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'round:lock', // voliteľné: ak máš typ pre "timer:start", zmeň naň
    code: gameCode, roundId: round.id, qIndex: round.qIndex || 0, at: Date.now()
  })

  return NextResponse.json({ success: true, roundId: round.id, qIndex: round.qIndex || 0 })
}
