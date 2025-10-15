// PATH: src/app/api/games/[code]/_runs.ts
import type { PostgrestError } from '@supabase/supabase-js'

export type RunRecord = {
  id: string
  run_number: number
  status?: string | null
}

function isPostgrestError(error: unknown): error is PostgrestError {
  return Boolean(error && typeof error === 'object' && 'message' in error)
}

export async function getActiveRun(
  client: any,
  gameCode: string,
  ownerId: string
): Promise<RunRecord | null> {
  const query = client
    .from('herd_game_runs')
    .select('id, run_number, status')
    .eq('game_code', gameCode)
    .eq('owner_id', ownerId)
    .eq('status', 'active')
    .order('run_number', { ascending: false })
    .limit(1)

  const { data, error } = await query.maybeSingle()
  if (error && !isPostgrestError(error)) {
    throw error
  }
  if (!data) return null
  return data as RunRecord
}

export async function ensureActiveRun(
  client: any,
  gameCode: string,
  ownerId: string
): Promise<RunRecord> {
  const existing = await getActiveRun(client, gameCode, ownerId)
  if (existing) return existing

  const { data: last } = await client
    .from('herd_game_runs')
    .select('run_number')
    .eq('game_code', gameCode)
    .eq('owner_id', ownerId)
    .order('run_number', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextNumber = typeof last?.run_number === 'number' ? last.run_number + 1 : 1

  const { data, error } = await client
    .from('herd_game_runs')
    .insert({
      game_code: gameCode,
      owner_id: ownerId,
      run_number: nextNumber,
      status: 'active',
    })
    .select('id, run_number, status')
    .single()

  if (error) throw error
  if (!data) throw new Error('Unable to create run')
  return data as RunRecord
}

export async function archiveActiveRunAndStartNext(
  client: any,
  gameCode: string,
  ownerId: string
): Promise<{ previous: RunRecord | null; run: RunRecord }> {
  const active = await getActiveRun(client, gameCode, ownerId)

  let nextNumber = 1
  if (active) {
    nextNumber = (active.run_number || 0) + 1
    const { error: archiveErr } = await client
      .from('herd_game_runs')
      .update({ status: 'archived', ended_at: new Date().toISOString() })
      .eq('id', active.id)
    if (archiveErr) throw archiveErr
  } else {
    const { data: last } = await client
      .from('herd_game_runs')
      .select('run_number')
      .eq('game_code', gameCode)
      .eq('owner_id', ownerId)
      .order('run_number', { ascending: false })
      .limit(1)
      .maybeSingle()
    nextNumber = typeof last?.run_number === 'number' ? last.run_number + 1 : 1
  }

  const { data, error } = await client
    .from('herd_game_runs')
    .insert({
      game_code: gameCode,
      owner_id: ownerId,
      run_number: nextNumber,
      status: 'active',
    })
    .select('id, run_number, status')
    .single()

  if (error) throw error
  if (!data) throw new Error('Unable to create next run')

  return { previous: active ?? null, run: data as RunRecord }
}
