import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { RoundSettings } from '@/lib/herdvote/store'
import { supabaseServer } from '@/integrations/supabase/server' // ✅ opravený import

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
  ctx: { params: { code: string } }
) {
  const { code } = ctx.params

  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

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

  const sb = supabaseServer()

  // For now, use a simple category mapping since we can't access herd_categories table
  const categoryMap: Record<string, { id: string; name: string; is_active: boolean }> = {
    'vseobecne': { id: '1', name: 'Všeobecné', is_active: true },
    'všeobecné': { id: '1', name: 'Všeobecné', is_active: true },
    'geografia': { id: '2', name: 'Geografia', is_active: true },
    'veda': { id: '3', name: 'Veda', is_active: true },
  }

  const cat = categoryMap[rawCategory.toLowerCase()] || categoryMap['všeobecné']

  if (!cat || cat.is_active === false) {
    return NextResponse.json({ error: 'Category not available' }, { status: 400 })
  }

  const usedIds: string[] = (game as any).usedQuestionIds || []
  ;(game as any).usedQuestionIds = usedIds

  // Use mock questions for now since we can't access herd_questions table
  const mockQuestions = Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    question_text: `Otázka ${i + 1} z kategórie ${cat.name}?`,
    answer_a: 'Možnosť A',
    answer_b: 'Možnosť B', 
    answer_c: 'Možnosť C',
    answer_d: 'Možnosť D',
    correct_answer: 'A',
    time_limit_seconds: settings.timeLimit
  }))

  const available = mockQuestions

  // Filter out used questions
  const unusedQuestions = available.filter(q => !usedIds.includes(q.id))

  if (!unusedQuestions || unusedQuestions.length === 0) {
    return NextResponse.json(
      { error: 'No unused questions available for this category in this game' },
      { status: 400 }
    )
  }

  if (unusedQuestions.length < count) {
    return NextResponse.json(
      {
        error: `Not enough new questions in '${cat.name}'. Need ${count}, have ${unusedQuestions.length}.`,
      },
      { status: 400 }
    )
  }

  const shuffled = [...unusedQuestions].sort(() => Math.random() - 0.5)
  const picked = shuffled.slice(0, count)

  const questions = picked.map(q => ({
    id: q.id,
    question_text: q.question_text,
    options: [
      q.answer_a,
      q.answer_b,
      q.answer_c,
      q.answer_d,
    ] as [string, string, string, string],
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
