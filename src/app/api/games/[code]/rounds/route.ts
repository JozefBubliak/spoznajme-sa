// PATH: src/app/api/games/[code]/rounds/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import type { RoundSettings } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/games/[code]/rounds
 * Body:
 * {
 *   "categoryId": "uuid",
 *   "count": 10,
 *   "settings": { timeLimit: 30, scoring: {...} } as RoundSettings
 * }
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(params.code).toUpperCase()

  const supabase = supabaseServer(session.access_token)

  const { data: game } = await supabase
    .from('herd_games')
    .select('code')
    .eq('code', gameCode)
    .maybeSingle()

  if (!game) {
    await supabase
      .from('herd_games')
      .upsert(
        { code: gameCode, owner_id: session.user.id, phase: 'round_setup' },
        { onConflict: 'code' }
      )
  }

  const body = await req.json().catch(() => ({} as any))
  const categoryId = String(body?.categoryId || '').trim()
  const count = Math.max(1, Math.min(100, Number(body?.count || 10)))
  const settings = body?.settings as RoundSettings | undefined

  if (!categoryId) {
    return NextResponse.json({ error: 'Missing category' }, { status: 400 })
  }
  if (!settings?.timeLimit || !settings?.scoring) {
    return NextResponse.json({ error: 'Missing round settings' }, { status: 400 })
  }
  const { data: cat, error: catErr } = await supabase
    .from('herd_categories')
    .select('id,name,is_active')
    .eq('id', categoryId)
    .single()
  if (catErr || !cat || cat.is_active === false) {
    return NextResponse.json({ error: 'Category not available' }, { status: 400 })
  }

  const { data: qdata, error: qErr } = await supabase
    .from('herd_questions')
    .select('id')
    .eq('category_id', cat.id)

  if (qErr || !qdata || qdata.length < count) {
    return NextResponse.json(
      { error: `Not enough questions in '${cat.name}'. Need ${count}, have ${qdata?.length || 0}.` },
      { status: 400 }
    )
  }

  const { count: existingCount } = await supabase
    .from('herd_rounds')
    .select('idx', { count: 'exact', head: true })
    .eq('game_code', gameCode)

  const nextIndex = existingCount ?? 0

  const { data: roundInsert, error: roundErr } = await supabase
    .from('herd_rounds')
    .insert({
      game_code: gameCode,
      idx: nextIndex,
      category: cat.id,
      count: count,
      settings,
      status: 'setup',
    })
    .select('id')
    .single()

  if (roundErr || !roundInsert) {
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }

  return NextResponse.json({ roundId: roundInsert.id, index: nextIndex })
}
