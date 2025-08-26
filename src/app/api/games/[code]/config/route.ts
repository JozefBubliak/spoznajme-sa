// PATH: src/app/api/games/[code]/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

// Načítanie aktuálnej konfigurácie hry
export async function GET(
  _req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = String(ctx.params.code).toUpperCase()

  const s = supabaseServer(session.access_token)
  const { data, error } = await s
    .from('herd_games')
    .select('code,total_rounds,prep_seconds,question_seconds,scoring_mode')
    .eq('code', code)
    .eq('owner_id', session.user.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  return NextResponse.json({
    ok: true,
    code: data.code,
    config: {
      totalRounds: data.total_rounds ?? 0,
      prepSeconds: data.prep_seconds ?? 0,
      questionSeconds: data.question_seconds ?? 0,
      scoringMode: data.scoring_mode ?? 'simple',
    },
  })
}

// Uloženie / update konfigurácie hry
export async function POST(
  req: Request,
  ctx: { params: Record<string, string | string[]> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = String(ctx.params.code).toUpperCase()

  const body = await req.json().catch(() => ({} as any))
  const totalRounds =
    typeof body.totalRounds === 'number'
      ? body.totalRounds
      : typeof body.rounds === 'number'
        ? body.rounds
        : undefined
  const prepSeconds = typeof body.prepSeconds === 'number' ? body.prepSeconds : undefined
  const questionSeconds = typeof body.questionSeconds === 'number' ? body.questionSeconds : undefined
  const scoringMode = typeof body.scoringMode === 'string' ? body.scoringMode : undefined

  const updates: Record<string, any> = {
    phase: 'round_setup',
    owner_id: session.user.id,
  }
  if (typeof totalRounds === 'number') updates.total_rounds = totalRounds
  if (typeof prepSeconds === 'number') updates.prep_seconds = prepSeconds
  if (typeof questionSeconds === 'number') updates.question_seconds = questionSeconds
  if (typeof scoringMode === 'string') updates.scoring_mode = scoringMode

  const s = supabaseServer(session.access_token)
  const { error } = await s
    .from('herd_games')
    .upsert({ code, ...updates }, { onConflict: 'code' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true, phase: 'round_setup' })
}
