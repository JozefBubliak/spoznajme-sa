// PATH: src/app/api/games/[code]/rounds/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { RoundSettings } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'
import { supabase } from '@/lib/supabaseAdmin'

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
export async function POST(req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
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
  const usedIds: string[] = (game as any).usedQuestionIds || []
  ;(game as any).usedQuestionIds = usedIds

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
    .select('id, question_text, answer_a, answer_b, answer_c, answer_d, correct_answer, time_limit_seconds')
    .eq('category_id', cat.id)

  if (qErr || !qdata) {
    return NextResponse.json({ error: 'Failed to load questions' }, { status: 500 })
  }

  const available = qdata.filter(q => !usedIds.includes(q.id))
  if (available.length < count) {
    return NextResponse.json(
      { error: `Not enough new questions in '${cat.name}'. Need ${count}, have ${available.length}.` },
      { status: 400 }
    )
  }

  const picked = [...available].sort(() => Math.random() - 0.5).slice(0, count)

  const questions = picked.map(q => ({
    id: q.id,
    question_text: q.question_text,
    options: [q.answer_a, q.answer_b, q.answer_c, q.answer_d] as [string, string, string, string],
    correct_answer: q.correct_answer as 'A' | 'B' | 'C' | 'D',
    time_limit: q.time_limit_seconds || settings.timeLimit,
    points_correct: 10,
    points_incorrect: 0,
    theme: cat.name,
  }))

  const round = store.addRound(gameCode, cat.name, questions, settings)
  if (!round) {
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }

  usedIds.push(...picked.map(p => p.id))
  ;(game as any).usedQuestionIds = Array.from(new Set(usedIds))

  return NextResponse.json({ roundId: round.id })
}
