// PATH: src/app/api/games/[code]/rounds/lock/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = String(params.code).toUpperCase()
  const body = await req.json().catch(() => ({})) as { roundId?: string }

  const s = supabaseServer(session.access_token)

  // nájdi kolo v stave "running"
  let roundId = body.roundId
  if (!roundId) {
    const { data: running } = await s
      .from('herd_rounds')
      .select('id, q_index')
      .eq('game_code', code)
      .eq('status', 'running')
      .single()
    if (!running) {
      return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
    }
    roundId = running.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status')
    .eq('id', roundId)
    .eq('game_code', code)
    .single()


  if (!round || round.status !== 'running') {
    return NextResponse.json({ error: 'No running round to lock' }, { status: 400 })
  }

  await s
    .from('herd_rounds')
    .update({ status: 'locked' })
    .eq('id', round.id)

  await RealtimeServer.publish(channelFor(code), {
    type: 'round:lock',
    code,
    roundId: round.id,
    qIndex: round.q_index || 0,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: round.q_index || 0,
  })
}
