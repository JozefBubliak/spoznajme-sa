import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  // Use route params — consistent with all other routes, not fragile URL regex
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json(
      { error: 'Invalid route (missing game code)' },
      { status: 400 }
    )
  }

  const body = (await req.json().catch(() => ({}))) as {
    playerId?: string
    roundId?: string
    qIndex?: number
    answer?: 'A' | 'B' | 'C' | 'D' | null
  }

  const { playerId, roundId, qIndex, answer } = body
  if (!playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const s = supabaseServer()

  const { data: round } = await s
    .from('herd_rounds')
    .select('status, q_index, timer_deadline')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .maybeSingle()

  if (!round || round.status !== 'running' || (round.q_index || 0) !== qIndex) {
    return NextResponse.json({ error: 'Round not accepting answers' }, { status: 400 })
  }

  // Reject answers submitted after timer deadline (1 s grace period for network latency)
  if (round.timer_deadline) {
    const deadline = new Date(round.timer_deadline as string).getTime()
    if (Date.now() > deadline + 1000) {
      return NextResponse.json({ error: 'Timer expired' }, { status: 400 })
    }
  }

  const { data: existing } = await s
    .from('herd_answers')
    .select('player_id')
    .eq('game_code', gameCode)
    .eq('player_id', playerId)
    .eq('round_id', roundId)
    .eq('q_index', qIndex)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  const { error } = await s.from('herd_answers').insert({
    game_code: gameCode,
    player_id: playerId,
    round_id: roundId,
    q_index: qIndex,
    answer,
    answered_at: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

