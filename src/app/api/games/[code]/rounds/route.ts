// PATH: src/app/api/games/[code]/rounds/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { RoundSettings } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray, must } from '@/lib/supabase/safe'

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

export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const supabase = supabaseServer() // service role — bypasses RLS

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
      .maybeSingle()
    if (catErr) {
      return NextResponse.json({ error: catErr.message }, { status: 400 })
    }
    const catRow = must(cat, 'Category not available')
    if (catRow.is_active === false) {
      return NextResponse.json({ error: 'Category not available' }, { status: 400 })
    }

    const { data: qdata, error: qErr } = await supabase
      .from('questions')
      .select('id')
      .eq('category_id', catRow.id)
      .eq('admin_status', 3)

    if (qErr) {
      return NextResponse.json({ error: qErr.message }, { status: 400 })
    }
    const questions = asArray(qdata)
    if (questions.length < count) {
      return NextResponse.json(
        { error: `Not enough questions in '${catRow.name}'. Need ${count}, have ${questions.length}.` },
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
        category: catRow.id,
        count: count,
        settings,
        status: 'setup',
      })
      .select('id')
      .maybeSingle()

    if (roundErr) {
      return NextResponse.json({ error: roundErr.message }, { status: 500 })
    }
    const savedRound = must(roundInsert, 'Failed to create round')

    return NextResponse.json({ roundId: savedRound.id, index: nextIndex })
}
