import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { RoundSettings } from '@/lib/herdvote/store'
import { supabaseServer } from '@/integrations/supabase/seserver'

export const dynamic = 'force-dynamic'

/**
 * POST /api/games/[code]/rounds
 * Body:
 *   {
 *     "category": "vseobecne" | "Všeobecné",   // slug alebo name
 *     "count": 10,                             // pocet otázok do kola
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

  // zistíme category_id podľa slug alebo name
  const sb = supabaseServer()

  // 1) skúsiť slug
  let { data: catBySlug, error: eSlug } = await sb
    .from('herd_categories')
    .select('id, slug, name, is_active')
    .eq('slug', rawCategory.toLowerCase())
    .single()

  // 2) ak nenašlo, skúsiť name
  let cat = catBySlug
  if (!cat) {
    const { data: catByName, error: eName } = await sb
      .from('herd_categories')
      .select('id, slug, name, is_active')
      .eq('name', rawCategory)
      .single()

    if (eSlug && eName) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    cat = catByName || catBySlug || null
  }

  if (!cat || cat.is_active === false) {
    return NextResponse.json({ error: 'Category not available' }, { status: 400 })
  }

  // už použité otázky v tejto hre (aby sa neopakovali)
  // udržiavame pole IDs na objekte game (in‑memory)
  // (typovo opatrne, aby sme nevyžadovali úpravu typov v store)
  const usedIds: string[] = (game as any).usedQuestionIds || []
  ;(game as any).usedQuestionIds = usedIds

  // načítaj všetky otázky danej kategórie, ktoré ešte neboli použité
  // (pre veľké datasety by sme to robili LIMIT + náhodný výber inak; teraz je to OK)
  let query = sb
    .from('herd_questions')
    .select('id, question_text, option_a, option_b, option_c, option_d, correct, time_limit_seconds', { count: 'exact' })
    .eq('category_id', cat.id)
    .eq('approved', true)

  if (usedIds.length) {
    // Supabase filter IN vyžaduje tvar "(id1,id2,...)"
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

  // ak je menej než pýtame, nepovolíme (garantujeme „žiadne opakovanie“)
  if (available.length < count) {
    return NextResponse.json({
      error: `Not enough new questions in '${cat.name}'. Need ${count}, have ${available.length}.`,
    }, { status: 400 })
  }

  // náhodne premiešaj a vezmi count
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  const picked = shuffled.slice(0, count)

  // priprav otázky vo formáte, ktorý už UI používa (A,B,C,D + správna pre moderátora)
  const questions = picked.map(q => ({
    id: q.id,
    question_text: q.question_text,
    options: [q.option_a, q.option_b, q.option_c, q.option_d] as [string, string, string, string],
    correct_answer: q.correct as 'A'|'B'|'C'|'D',
    time_limit: q.time_limit_seconds || settings.timeLimit, // fallback
    points_correct: 10,
    points_incorrect: 0,
    theme: cat.name, // pre spätné zobrazenie
  }))

  // vytvor kolo v in‑memory store
  const round = store.addRound(gameCode, cat.name, questions, settings)
  if (!round) {
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }

  // zapíš použité otázky do „pamäte hry“, aby sa už nezopakovali v ďalších kolách
  usedIds.push(...picked.map(p => p.id))
  ;(game as any).usedQuestionIds = Array.from(new Set(usedIds))

  return NextResponse.json({ roundId: round.id })
}
