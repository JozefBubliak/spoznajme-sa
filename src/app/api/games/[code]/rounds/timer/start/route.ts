import { NextResponse, type NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

type Ctx = { params: { code: string } }

export async function POST(req: NextRequest, { params }: Ctx) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = String(params.code).toUpperCase()

  const body = await req.json().catch(() => ({})) as {
    seconds?: number
    duration?: number
    roundId?: string
  }
  const seconds = Number(body.seconds ?? body.duration ?? 45)

  const s = supabaseServer(session.access_token)

  let roundId = body.roundId
  if (!roundId) {
    const { data: shown } = await s
      .from('herd_rounds')
      .select('id, q_index')
      .eq('game_code', code)
      .eq('status', 'shown')
      .single()
    if (!shown) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
    roundId = shown.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status')
    .eq('id', roundId)
    .eq('game_code', code)
    .single()

  if (!round || round.status !== 'shown') {
    return NextResponse.json({ error: 'Round must be in "shown" state' }, { status: 400 })
  }

  const startedAt = Date.now()
  const deadline = new Date(startedAt + seconds * 1000).toISOString()

  await s
    .from('herd_rounds')
    .update({ status: 'running', timer_deadline: deadline })
    .eq('id', round.id)

  await RealtimeServer.publish(channelFor(code), {
    type: 'timer:start',
    code,
    roundId: round.id,
    qIndex: round.q_index || 0,
    startedAt,
    durationSec: seconds,
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: round.q_index || 0,
    seconds,
    deadline,
  })
}