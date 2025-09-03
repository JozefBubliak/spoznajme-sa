// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({} as any))
  const index = typeof body?.index === 'number' ? body.index : 0

  const s = supabaseServer(session.access_token)

  // načítaj konfiguráciu kola
  const { data: round, error: roundErr } = await s
    .from('herd_rounds')
    .select('id, category, count, settings')
    .eq('game_code', gameCode)
    .eq('idx', index)
    .single()

  if (roundErr || !round) {
    return NextResponse.json({ error: 'ROUND_NOT_FOUND' }, { status: 404 })
  }

  // vyber náhodné otázky z danej kategórie
  const { data: qs, error: qErr } = await s.rpc('random_herd_questions', {
    cat: round.category,
    n: round.count,
  })

  if (qErr) {
    return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
  }
  const ids = asArray<{ id: string }>(qs).map(q => q.id)
  if (ids.length < round.count) {
    return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
  }

  const newSettings = { ...(round.settings as any || {}), questions: ids }

  const { error: updErr } = await s
    .from('herd_rounds')
    .update({ settings: newSettings, status: 'shown', q_index: 0 })
    .eq('id', round.id)

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 })
  }

  await s
    .from('herd_games')
    .update({ phase: 'playing', active_round_index: index })
    .eq('code', gameCode)

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'question:show',
    code: gameCode,
    roundId: round.id,
    qIndex: 0,
    at: Date.now(),
  })

  return NextResponse.json({ ok: true, phase: 'playing' })
}

