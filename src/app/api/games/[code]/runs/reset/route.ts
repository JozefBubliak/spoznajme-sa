// PATH: src/app/api/games/[code]/runs/reset/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

import { archiveActiveRunAndStartNext, ensureActiveRun, isUsageStorageUnavailable } from '../../_runs'


export const dynamic = 'force-dynamic'


export async function POST(_req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const gameCode = String(context?.params?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }

  const s = supabaseServer(session.access_token)

  const { data: game } = await s
    .from('herd_games')
    .select('code')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .maybeSingle()

  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const current = await ensureActiveRun(s, gameCode, session.user.id)

  const runId = current?.id ?? null


  const { run } = await archiveActiveRunAndStartNext(s, gameCode, session.user.id)

  const { data: rounds } = await s
    .from('herd_rounds')
    .select('id, settings')
    .eq('game_code', gameCode)

  const updates = Array.isArray(rounds)
    ? rounds.map(async (round) => {
        const settings = ((round.settings as any) ?? {}) as Record<string, unknown>
        delete (settings as any).questions
        delete (settings as any).runId
        return s
          .from('herd_rounds')
          .update({ settings, status: 'setup', q_index: 0 })
          .eq('id', round.id)
      })
    : []

  if (updates.length > 0) {
    await Promise.all(updates)
  }


  if (runId && !run?.disabled) {
    const { error: deleteErr } = await s
      .from('herd_question_usage')
      .delete()
      .eq('owner_id', session.user.id)
      .eq('game_code', gameCode)
      .eq('run_id', runId)

    if (deleteErr && !isUsageStorageUnavailable(deleteErr)) {
      return NextResponse.json({ error: deleteErr.message }, { status: 400 })
    }
  }

  return NextResponse.json({
    ok: true,
    runId: run?.id ?? null,
    runNumber: run?.run_number ?? null,
    disabled: run?.disabled ?? false,
  })

}
