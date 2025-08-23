// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface RouteContext { params: Promise<{ code: string }> }
interface StartBody { roundId?: string }

export async function POST(req: Request, context: RouteContext) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = await context.params

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = (await req.json().catch(() => ({}))) as StartBody
  const { roundId } = body

  // vyber kolo: buď podľa roundId, alebo prvé pending/ready
  const round =
    roundId
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
    type: 'game:start',
    code: gameCode,
    roundId: round.id,
    qIndex: round.qIndex,
    at: Date.now(),
  })

  return NextResponse.json({ success: true, roundId: round.id, qIndex: round.qIndex })
}
