import type { SupabaseClient } from '@supabase/supabase-js';
import { TABLES } from './tables';

// Returns list of existing and missing tables in the database.
export async function introspectTables(client: SupabaseClient) {
  const tableNames = Object.values(TABLES);
  const { data, error } = await client
    .from('information_schema.tables')
    .select('table_name')
    .in('table_name', tableNames);

  if (error) throw error;
  const existing = data?.map((d) => d.table_name) ?? [];
  const missing = tableNames.filter((t) => !existing.includes(t));
  return { existing, missing };
}
