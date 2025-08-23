import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface TimerBody { seconds?: number; duration?: number; roundId?: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request, { params }: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = params as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = (await req.json().catch(() => ({}))) as TimerBody
  const seconds = Number(body.seconds ?? body.duration ?? 45)
  const round = body.roundId
    ? game.rounds.find(r => r.id === body.roundId)
    : store.getActiveRound(gameCode)

  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  if (round.status !== 'shown') {
    return NextResponse.json({ error: 'Round must be in "shown" state' }, { status: 400 })
  }

  const startedAt = Date.now()
  const deadlineMs = startedAt + seconds * 1000
  round.status = 'running'
  round.startedAt = startedAt
  round.deadline = deadlineMs

  // Best-effort persist do DB (pre refreshy klientov) - commented out due to missing table
  // try {
  //   const s = supabaseServer()
  //   await s
  //     .from('herd_games')
  //     .update({ timer_deadline: new Date(deadlineMs).toISOString() })
  //     .eq('code', gameCode)
  // } catch {
  //   // neblokuj hru, ak by zápis zlyhal
  // }

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'timer:start',
    code: gameCode,
    roundId: round.id,
    qIndex: round.qIndex || 0,
    startedAt,
    durationSec: seconds,
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: round.qIndex || 0,
    seconds,
    deadline: new Date(deadlineMs).toISOString(),
  })
}
