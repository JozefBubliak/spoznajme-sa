// src/app/api/games/[code]/rounds/start/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'

export const dynamic = 'force-dynamic'


export async function POST(req: NextRequest, ctx: { params: { code: string } }) {
  const { code } = ctx.params

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({}))
  const { roundId } = body

  // vyber kolo
  const round = roundId
    ? game.rounds.find(r => r.id === roundId)
    : game.rounds.find(r => r.status === 'pending' || r.status === 'ready')

  if (!round) return NextResponse.json({ error: 'No round to start' }, { status: 400 })

  // len ukáž otázku (bez odpočtu)
  game.status = 'active'
  game.activeRoundId = round.id
  round.status = 'shown'
  round.qIndex = round.qIndex ?? 0
  round.startedAt = undefined

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'game:start', code: gameCode, roundId: round.id, qIndex: round.qIndex, at: Date.now()
  })

  return NextResponse.json({ success: true, roundId: round.id, qIndex: round.qIndex })
}
