import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import type { Question, RoundSettings } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

// Sample questions - in production this would come from a database
const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question_text: 'Aké je najobľúbenejšie zviera v slovenských rodinách?',
    options: ['Pes', 'Mačka', 'Rybičky', 'Škrečok'],
    correct_answer: 'A',
    time_limit: 30,
    points_correct: 5,
    points_incorrect: -2,
    theme: 'Všeobecné'
  },
  {
    id: 'q2', 
    question_text: 'Ktoré mesto je hlavné mesto Slovenska?',
    options: ['Košice', 'Bratislava', 'Nitra', 'Prešov'],
    correct_answer: 'B',
    time_limit: 30,
    points_correct: 5,
    points_incorrect: -2,
    theme: 'Všeobecné'
  },
  {
    id: 'q3',
    question_text: 'Koľko dní má rok?',
    options: ['364', '365', '366', '360'],
    correct_answer: 'B',
    time_limit: 30,
    points_correct: 5,
    points_incorrect: -2,
    theme: 'Všeobecné'
  },
  {
    id: 'q4',
    question_text: 'Ako sa volá najvyššia hora Slovenska?',
    options: ['Gerlachovský štít', 'Lomnický štít', 'Kriváň', 'Rysy'],
    correct_answer: 'A',
    time_limit: 30,
    points_correct: 5,
    points_incorrect: -2,
    theme: 'Geografia'
  },
  {
    id: 'q5',
    question_text: 'Ktorá planéta je najbližšie k Slnku?',
    options: ['Venuša', 'Merkúr', 'Zem', 'Mars'],
    correct_answer: 'B',
    time_limit: 30,
    points_correct: 5,
    points_incorrect: -2,
    theme: 'Veda'
  }
]

function getRandomQuestions(category: string, count: number): Question[] {
  // Filter by category if not 'bulk'
  const available = category === 'bulk' 
    ? SAMPLE_QUESTIONS 
    : SAMPLE_QUESTIONS.filter(q => q.theme === category)
  
  // Shuffle and take requested count
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

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

  const body = await req.json().catch(() => ({}))
  const { category, count = 10, settings } = body as {
    category: string
    count: number
    settings: RoundSettings
  }

  if (!category) {
    return NextResponse.json({ error: 'Missing category' }, { status: 400 })
  }

  const questions = getRandomQuestions(category, count)
  if (questions.length === 0) {
    return NextResponse.json({ error: 'No questions available for this category' }, { status: 400 })
  }

  const round = store.addRound(gameCode, category, questions, settings)
  if (!round) {
    return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
  }

  return NextResponse.json({ roundId: round.id })
}