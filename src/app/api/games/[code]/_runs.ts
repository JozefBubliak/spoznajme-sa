// PATH: src/app/api/games/[code]/_runs.ts
import type { PostgrestError } from '@supabase/supabase-js'
import type { SupabaseClient } from '@/integrations/supabase/server'

type ServiceClient = SupabaseClient<any, any, any>

export type RunRecord = {
  id: string | null
  run_number: number | null
  status?: string | null
  disabled?: boolean
}

function isPostgrestError(error: unknown): error is PostgrestError {
  return Boolean(error && typeof error === 'object' && 'message' in error)
}

function messageIncludes(error: PostgrestError, fragment: string) {
  return String(error.message ?? '').toLowerCase().includes(fragment.toLowerCase())
}

function isMissingRelationError(error: PostgrestError, relation: string) {
  return (
    error.code === '42P01' ||
    error.code === '42501' ||
    messageIncludes(error, relation)
  )
}

const FALLBACK_RUN: RunRecord = {
  id: null,
  run_number: null,
  status: 'disabled',
  disabled: true,
}

export function isRunStorageUnavailable(error: unknown): boolean {
  return isPostgrestError(error) && isMissingRelationError(error, 'herd_game_runs')
}

export function isUsageStorageUnavailable(error: unknown): boolean {
  return isPostgrestError(error) && isMissingRelationError(error, 'herd_question_usage')
}

export async function getActiveRun(
  client: ServiceClient,
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
  if (error) {
    if (isRunStorageUnavailable(error)) return null
    throw error
  }
  if (!data) return null
  return data as RunRecord
}

export async function ensureActiveRun(
  client: ServiceClient,
  gameCode: string,
  ownerId: string
): Promise<RunRecord> {
  const existing = await getActiveRun(client, gameCode, ownerId)
  if (existing) return existing

  const { data: last, error: lastErr } = await client
    .from('herd_game_runs')
    .select('run_number')
    .eq('game_code', gameCode)
    .eq('owner_id', ownerId)
    .order('run_number', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (lastErr) {
    if (isRunStorageUnavailable(lastErr)) return { ...FALLBACK_RUN }
    throw lastErr
  }
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


  if (error) {
    if (isRunStorageUnavailable(error)) return { ...FALLBACK_RUN }
    throw error
  }
  if (!data) return { ...FALLBACK_RUN }
  return data as RunRecord
}

export async function archiveActiveRunAndStartNext(

  client: ServiceClient,

  gameCode: string,
  ownerId: string
): Promise<{ previous: RunRecord | null; run: RunRecord }> {
  const active = await getActiveRun(client, gameCode, ownerId)

  let nextNumber = 1
  if (active && active.id) {

    nextNumber = (active.run_number || 0) + 1
    const { error: archiveErr } = await client
      .from('herd_game_runs')
      .update({ status: 'archived', ended_at: new Date().toISOString() })
      .eq('id', active.id)
    if (archiveErr) {
      if (!isRunStorageUnavailable(archiveErr)) throw archiveErr
      return { previous: null, run: { ...FALLBACK_RUN } }
    }
  } else {
    const { data: last, error: lastErr } = await client

      .from('herd_game_runs')
      .select('run_number')
      .eq('game_code', gameCode)
      .eq('owner_id', ownerId)
      .order('run_number', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (lastErr) {
      if (isRunStorageUnavailable(lastErr)) {
        return { previous: null, run: { ...FALLBACK_RUN } }
      }
      throw lastErr
    }
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

  if (error) {
    if (isRunStorageUnavailable(error)) return { previous: null, run: { ...FALLBACK_RUN } }
    throw error
  }
  if (!data) return { previous: null, run: { ...FALLBACK_RUN } }


  return { previous: active ?? null, run: data as RunRecord }
}
