import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const code = String(ctx.params?.code || '').toUpperCase()

  const body = await req.json().catch(() => ({})) as {
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

  // over existenciu hry
  const { data: game } = await s
    .from('herd_games')
    .select('code')
    .eq('code', code)
    .single()

  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const { error } = await s
    .from('herd_answers')
    .upsert(
      {
        game_code: code,
        player_id: playerId,
        round_id: roundId,
        q_index: qIndex,
        answer,
        ts: new Date().toISOString(),
      },
      { onConflict: 'player_id,round_id,q_index' }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
