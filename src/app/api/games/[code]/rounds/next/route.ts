// PATH: src/app/api/games/[code]/rounds/next/route.ts
import { NextResponse } from 'next/server'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  ctx: { params: Promise<{ code: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code } = await ctx.params
  const gameCode = String(code).toUpperCase()

  const body = await req.json().catch(() => ({})) as { roundId?: string }
  const s = supabaseServer(session.access_token)

  // nájdi kolo v stave "results"
  let roundId = body.roundId
  if (!roundId) {
    const { data: resRound } = await s
      .from('herd_rounds')
      .select('id, q_index, settings')
      .eq('game_code', gameCode)
      .eq('status', 'results')
      .single()
    if (!resRound) {
      return NextResponse.json({ error: 'No round in results state' }, { status: 400 })
    }
    roundId = resRound.id
  }

  const { data: round } = await s
    .from('herd_rounds')
    .select('id, q_index, status, settings')
    .eq('id', roundId)
    .eq('game_code', gameCode)
    .single()

  if (!round || round.status !== 'results') {
    return NextResponse.json({ error: 'No round in results state' }, { status: 400 })
  }

  const currentQIndex = round.q_index || 0
  const questions: string[] = (round.settings as any)?.questions || []
  const nextQIndex = currentQIndex + 1

  if (nextQIndex >= questions.length) {
    await s.from('herd_rounds').update({ status: 'finished' }).eq('id', round.id)

    const { data: leaderboard } = await s
      .from('herd_players')
      .select('id, name, score')
      .eq('game_code', gameCode)
      .order('score', { ascending: false })

    await RealtimeServer.publish(channelFor(gameCode), {
      type: 'round:finish',
      code: gameCode,
      roundId: round.id,
      leaderboard,
      at: Date.now(),
    })

    return NextResponse.json({
      success: true,
      roundId: round.id,
      finished: true,
      leaderboard,
    })
  }

  await s
    .from('herd_rounds')
    .update({ q_index: nextQIndex, status: 'shown' })
    .eq('id', round.id)

  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'game:start',
    code: gameCode,
    roundId: round.id,
    qIndex: nextQIndex,
    at: Date.now(),
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: nextQIndex,
    finished: false,
  })
}
