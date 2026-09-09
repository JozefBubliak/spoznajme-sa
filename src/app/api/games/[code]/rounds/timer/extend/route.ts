import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

// Predĺži bežiaci timer o `seconds` (moderátorská akcia počas otázky).
export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) return NextResponse.json({ error: 'Invalid route' }, { status: 400 })

  const body = await req.json().catch(() => ({})) as { seconds?: number; roundId?: string }
  const add = Math.max(1, Math.min(120, Number(body.seconds ?? 10)))

  const s = supabaseServer()

  let roundId = body.roundId
  let current: { id: string; q_index: number | null; timer_deadline: string | null } | null = null
  if (roundId) {
    const { data } = await s
      .from('herd_rounds')
      .select('id, q_index, timer_deadline, status')
      .eq('id', roundId)
      .eq('game_code', gameCode)
      .single()
    if (data && data.status === 'running') current = data
  } else {
    const { data } = await s
      .from('herd_rounds')
      .select('id, q_index, timer_deadline')
      .eq('game_code', gameCode)
      .eq('status', 'running')
      .single()
    current = data
  }

  if (!current) return NextResponse.json({ error: 'No running round' }, { status: 400 })
  roundId = current.id

  const base = current.timer_deadline
    ? new Date(current.timer_deadline).getTime()
    : Date.now()
  const deadline = new Date(base + add * 1000).toISOString()

  await s.from('herd_rounds').update({ timer_deadline: deadline }).eq('id', roundId)

  // Re-use timer:start so every client just re-reads state with the new deadline.
  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'timer:start',
    code: gameCode,
    roundId,
    qIndex: current.q_index ?? 0,
    startedAt: Date.now(),
    durationSec: add,
  })

  return NextResponse.json({ success: true, roundId, deadline, addedSec: add })
}
