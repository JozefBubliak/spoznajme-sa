// PATH: src/app/api/games/[code]/rounds/start/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { ensureActiveRun } from '../../_runs'

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

  const s = supabaseServer() // service role — bypasses RLS

  // Get the round configuration
  const { data: round, error: roundErr } = await s
    .from('herd_rounds')
    .select('id, category, count, settings')
    .eq('game_code', gameCode)
    .eq('idx', index)
    .single()

  if (roundErr || !round) {
    return NextResponse.json({ error: 'ROUND_NOT_FOUND' }, { status: 404 })
  }

  // Ensure we have an active run for question tracking
  const run = await ensureActiveRun(s, gameCode, session.user.id)
  const runId = run?.id ?? null

  const roundSettings = (round.settings as any) ?? {}
  const localePrefix = roundSettings.localePrefix || 'sk'

  // Check if questions are already selected for this round
  let questionIds: string[] = []
  if (Array.isArray(roundSettings.questions) && roundSettings.questions.length > 0) {
    questionIds = roundSettings.questions
  } else {
    // Select random questions for this round
    const { data: questions, error: qErr } = await s.rpc('random_herd_questions', {
      cat: round.category,
      n: round.count,
      locale_prefix: localePrefix,
      run: runId,
    })

    if (qErr) {
      return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
    }

    questionIds = questions || []
    if (questionIds.length < round.count) {
      return NextResponse.json({ error: 'NOT_ENOUGH_QUESTIONS' }, { status: 400 })
    }
  }

  // Update round with selected questions and set status to 'shown'
  const updatedSettings = {
    ...roundSettings,
    questions: questionIds,
    runId: runId
  }

  const { error: updErr } = await s
    .from('herd_rounds')
    .update({
      settings: updatedSettings,
      status: 'shown',
      q_index: 0,
      count: questionIds.length
    })
    .eq('id', round.id)

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 400 })
  }

  // Record question usage to prevent repeats
  if (runId && questionIds.length > 0) {
    const usageRows = questionIds.map((questionId) => ({
      owner_id: session.user.id,
      game_code: gameCode,
      run_id: runId,
      category_id: round.category,
      round_id: round.id,
      question_id: questionId,
    }))

    await s.from('herd_question_usage').upsert(usageRows, {
      onConflict: 'run_id,question_id'
    })
  }

  // Update game to playing state
  await s
    .from('herd_games')
    .update({ phase: 'playing', active_round_index: index })
    .eq('code', gameCode)

  // Get the first question to show
  const { data: firstQuestion } = await s
    .from('herd_questions')
    .select('*')
    .eq('id', questionIds[0])
    .single()

  if (!firstQuestion) {
    return NextResponse.json({ error: 'QUESTION_NOT_FOUND' }, { status: 404 })
  }

  // Broadcast question show event
  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'question:show',
    code: gameCode,
    roundId: round.id,
    qIndex: 0,
    at: Date.now()
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    question: firstQuestion,
    totalQuestions: questionIds.length
  })
}

