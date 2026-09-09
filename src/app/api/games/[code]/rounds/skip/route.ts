import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

// Preskočí aktuálnu otázku bez bodovania (moderátorská akcia).
// Funguje v stave shown / running / locked. Ak to bola posledná otázka kola,
// kolo sa ukončí.
export async function POST(req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) return NextResponse.json({ error: 'Invalid route' }, { status: 400 })

  const body = await req.json().catch(() => ({})) as { roundId?: string }
  const s = supabaseServer()

  let roundId = body.roundId
  if (!roundId) {
    const { data } = await s
      .from('herd_rounds')
      .select('id')
      .eq('game_code', gameCode)
      .in('status', ['shown', 'running', 'locked'])
      .single()
    if (!data) return NextResponse.json({ error: 'No skippable round' }, { status: 400 })
    roundId = data.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status, settings')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .single()

  if (!round || !['shown', 'running', 'locked'].includes(round.status ?? '')) {
    return NextResponse.json({ error: 'Round not skippable' }, { status: 400 })
  }

  const questions: string[] = (round.settings as any)?.questions ?? []
  const nextQIndex = (round.q_index ?? 0) + 1

  // discard any answers submitted for the skipped question
  await s
    .from('herd_answers')
    .delete()
    .eq('game_code', gameCode)
    .eq('round_id', round.id)
    .eq('q_index', round.q_index ?? 0)

  if (nextQIndex >= questions.length) {
    await s.from('herd_rounds').update({ status: 'finished' }).eq('id', round.id)

    const { data: leaderboard } = await s
      .from('herd_players')
      .select('id, name, score')
      .eq('game_code', gameCode)
      .order('score', { ascending: false })

    const { count: remaining } = await s
      .from('herd_rounds')
      .select('id', { count: 'exact', head: true })
      .eq('game_code', gameCode)
      .in('status', ['ready', 'shown', 'running', 'locked', 'results'])
    if (!remaining || remaining === 0) {
      await s.from('herd_games').update({ phase: 'final' }).eq('code', gameCode)
    }

    await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
      type: 'round:finish',
      code: gameCode,
      roundId: round.id,
      leaderboard,
      at: Date.now(),
    })
    return NextResponse.json({ success: true, finished: true, roundId: round.id, leaderboard })
  }

  await s
    .from('herd_rounds')
    .update({ q_index: nextQIndex, status: 'shown', timer_deadline: null })
    .eq('id', round.id)

  await RealtimeServer.publish(`herd-game-${gameCode.toLowerCase()}`, {
    type: 'question:show',
    code: gameCode,
    roundId: round.id,
    qIndex: nextQIndex,
    at: Date.now(),
  })

  return NextResponse.json({ success: true, roundId: round.id, qIndex: nextQIndex, finished: false })
}
