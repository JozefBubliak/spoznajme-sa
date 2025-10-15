// PATH: src/app/api/games/[code]/_reset.ts
import type { SupabaseClient } from '@/integrations/supabase/server'
import { isMissingRelationError, isPostgrestError } from './_runs'

type ServiceClient = SupabaseClient<any, any, any>

type TableReset = {
  table: string
  column: string
}

const TABLES: TableReset[] = [
  { table: 'herd_rounds', column: 'game_code' },
  { table: 'herd_answers', column: 'game_code' },
  { table: 'herd_players', column: 'game_code' },
  { table: 'herd_question_usage', column: 'game_code' },
]

function isMissing(error: unknown, relation: string) {
  return isPostgrestError(error) && isMissingRelationError(error, relation)
}

export async function resetGameArtifacts(client: ServiceClient, gameCode: string) {
  const errors: string[] = []

  for (const { table, column } of TABLES) {
    const { error } = await client.from(table).delete().eq(column, gameCode)
    if (error && !isMissing(error, table)) {
      errors.push(error.message || `Failed to reset ${table}`)
    }
  }

  if (errors.length > 0) {
    throw new Error(errors[0] ?? 'Failed to reset game state')
  }
}
