import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = String(params.code).toUpperCase()

  const body = (await req.json().catch(() => ({}))) as {
    playerId?: string
    roundId?: string
    qIndex?: number
    answer?: 'A' | 'B' | 'C' | 'D' | null
  }

  const { playerId, roundId, qIndex, answer } = body
  if (!code || !playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const s = supabaseServer()

  const { data: game, error: gErr } = await s
    .from('herd_games')
    .select('code')
    .eq('code', code)
    .maybeSingle()

  if (gErr) return NextResponse.json({ error: gErr.message }, { status: 500 })
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const { error } = await s
    .from('herd_answers')
    .upsert(
      {
        game_code: code,
        player_id: playerId,
        round_id: roundId,
        q_index: qIndex,
        answer,
        answered_at: new Date().toISOString(),
      },
      { onConflict: 'player_id,round_id,q_index' }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

