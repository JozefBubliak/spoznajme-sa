// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  ctx: any
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = String(ctx.params.code).toUpperCase()

  const body = await req.json().catch(() => ({} as any))
  const index = typeof body?.index === 'number' ? body.index : 0

  const s = supabaseServer(session.access_token)

  // načítaj konfiguráciu kola
  const { data: round, error: roundErr } = await s
    .from('herd_rounds')
    .select('id, category, count, settings')
    .eq('game_code', code)
    .eq('idx', index)
    .single()

  if (roundErr || !round) {
    return NextResponse.json({ error: 'ROUND_NOT_FOUND' }, { status: 404 })
  }

  // vyber náhodné otázky z danej kategórie
  const { data: qs, error: qErr } = await s
    .from('herd_questions')
    .select('id')
    .eq('category_id', round.category)
    .order('random()')
    .limit(round.count)

  if (qErr || !qs || qs.length < round.count) {
    return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
  }

  const questionIds = qs.map(q => q.id)

  const newSettings = { ...(round.settings as any || {}), questions: questionIds }

  const { error: updErr } = await s
    .from('herd_rounds')
    .update({ settings: newSettings, status: 'running', q_index: 0 })
    .eq('id', round.id)

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 })
  }

  await s
    .from('herd_games')
    .update({ phase: 'playing', active_round_index: index })
    .eq('code', code)

  return NextResponse.json({ ok: true, phase: 'playing' })
}

