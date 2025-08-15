// PATH: src/app/api/games/[code]/rounds/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { RoundSettings } from '@/lib/herdvote/store'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/games/[code]/rounds
 * Body:
 *   {
 *     "category": "vseobecne" | "Všeobecné",   // slug alebo name
 *     "count": 10,                             // počet otázok do kola
 *     "settings": { timeLimit: 30, scoring: {...} } as RoundSettings
 *   }
 */
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  // body
  const body = await req.json().catch(() => ({}))
  const rawCategory = String(body?.category || '').trim()
  const count = Math.max(1, Math.min(100, Number(body?.count || 10)))
  const settings = body?.settings as RoundSettings | undefined

  if (!rawCategory) {
    return NextResponse.json({ error: 'Missing category' }, { status: 400 })
  }
  if (!settings?.timeLimit || !settings?.scoring) {
    return NextResponse.json({ error: 'Missing round settings' }, { status: 400 })
  }

  const sb = supabaseServer() as any // Type assertion to bypass TypeScript issues

  // zistiť kategóriu podľa slug alebo názvu
  let { data: catBySlug } = await sb
    .from('herd_categories')
    .select('id, slug, name, is_active')
    .eq('slug', rawCategory.toLowerCase())
    .single()

  let cat = catBySlug
  if (!cat) {
    const { data: catByName, error: eName } = await sb
      .from('herd_categories')
      .select('id, slug, name, is_active')
      .eq('name', rawCategory)
      .single()

    if (eName && !catBySlug) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    cat = catByName || catBySlug || null
  }

  if (!cat || cat.is_active === false) {
    return NextResponse.json({ error: 'Category not available' }, { status: 400 })
  }

  // pamätaj si použité otázky v rámci tejto hry (aby sa neopakovali v ďalších kolách)
  const usedIds: string[] = (game as any).usedQuestionIds || []
  ;(game as any).usedQuestionIds = usedIds

  // načítaj dostupné (nepoužité) otázky danej kategórie
  let query = sb
    .from('herd_questions')
    .select('id, question_text, answer_a, answer_b, answer_c, answer_d, correct_answer, time_limit', { count: 'exact' })
    .eq('category_id', cat.id)

  if (usedIds.length) {
    // filter NOT IN
    const list = `(${usedIds.map(x => `"${x}"`).join(',')})`
    query = query.not('id', 'in', list)
  }

  const { data: available, error: qErr } = await query
  if (qErr) {
    return NextResponse.json({ error: qErr.message }, { status: 500 })
  }
  if (!available || available.length === 0) {
    return NextResponse.json({
      error: 'No unused questions available for this category in this game',
    }, { status: 400 })
  }

  if (available.length < count) {
    return NextResponse.json({
      error: `Not enough new questions in '${cat.name}'. Need ${count}, have ${available.length}.`,
    }, { status: 400 })
  }

  // náhodný výber
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  const picked = shuffled.slice(0, count)

  // transform pre tvoj existujúci UI formát
  const questions = picked.map((q: any) => ({
    id: q.id,
    question_text: q.question_text,
    options: [q.answer_a, q.answer_b, q.answer_c, q.answer_d] as [string, string, string, string],
    correct_answer: q.correct_answer as 'A' | 'B' | 'C' | 'D',
    time_limit: q.time_limit || settings.timeLimit,
    // body riadi moderátor (u teba sa neriešia z DB):
    points_correct: 10,
    points_incorrect: 0,
    theme: cat.name,
  }))

  // vytvor kolo v in-memory store
  const round = store.addRound(gameCode, cat.name, questions, settings)
  if (!round) {
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }

  // zapíš použité IDs, aby sa v tejto hre už nezopakovali
  usedIds.push(...picked.map((p: any) => p.id))
  ;(game as any).usedQuestionIds = Array.from(new Set(usedIds))

  return NextResponse.json({ roundId: round.id })
}