import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { must } from '@/lib/supabase/safe'
import { getActiveRun } from './_runs'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, context: any) {
  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const s = supabaseServer() // service role — bypasses RLS

  // First try to get game as owner
  let { data: game, error } = await s
    .from('herd_games')
    .select('code, phase, total_rounds, active_round_index, lobby_locked, owner_id')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .maybeSingle()

  const isOwner = !!game

  // If not owner, try to get public game info
  if (!game) {
    const publicResult = await s.from('herd_games')
      .select('code, phase, total_rounds, active_round_index, lobby_locked, owner_id')
      .eq('code', gameCode)
      .maybeSingle()

    game = publicResult.data
    error = publicResult.error
  }

  if (error || !game) {
    return NextResponse.json('Game not found', { status: 404 })
  }

  const g = game

  const { count: roundsCount } = await s
    .from('herd_rounds')
    .select('idx', { count: 'exact', head: true })
    .eq('game_code', gameCode)

  let phase: string = (g.phase as any) ?? 'lobby'
  if (g.phase === 'setup') phase = 'config'
  else if (g.phase === 'running') phase = 'playing'
  else if (g.phase === 'ended') phase = 'final'
  else if (g.phase === 'round_setup' && !g.lobby_locked) phase = 'lobby'

  const result: any = {
    code: g.code,
    phase,
    lobby_locked: !!g.lobby_locked,
    total_rounds: g.total_rounds ?? roundsCount ?? 0,
    active_round_index: g.active_round_index ?? 0,
  }

  // Add owner-specific data
  if (isOwner) {
    const run = await getActiveRun(s, gameCode, session.user.id)
    result.run_id = run?.id ?? null
    result.run_number = run?.run_number ?? null
    result.owner_id = g.owner_id
  }

  return NextResponse.json(result)
}
