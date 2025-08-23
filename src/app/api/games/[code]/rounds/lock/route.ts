// PATH: src/app/api/games/[code]/rounds/lock/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface RouteContext { params: { code: string } }

export async function POST(req: Request, context: RouteContext) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = context.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const body = (await req.json().catch(() => ({}))) as { roundId?: string }
  const { roundId } = body

  // nájdi cieľové kolo: podľa roundId alebo práve aktívne
  const targetRound = roundId
    ? game.rounds.find(r => r.id === roundId)
    : store.getActiveRound(gameCode)

  if (!targetRound || targetRound.status !== 'running') {
    return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
  }

  // zamkni kolo
  targetRound.status = 'locked'

  // realtime notifikácia pre klientov
  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'round:lock',
    code: gameCode,
    roundId: targetRound.id,
    qIndex: targetRound.qIndex || 0,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: targetRound.id,
    qIndex: targetRound.qIndex || 0,
  })
}
