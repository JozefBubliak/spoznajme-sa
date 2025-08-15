// PATH: src/integrations/supabase/server.ts
import { createClient } from '@supabase/supabase-js'
// ak máš v projekte generované typy, nechaj si tento import (inak môžeš zmazať):
import type { Database } from './types'

/**
 * Server‑only Supabase klient so Service Role kľúčom.
 * - Používaj výhradne v server code (route handlers, server actions).
 * - Nikdy ho NEimportuj do client komponentov.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY || // fallback, ak by si mal iný názov
  ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('[supabaseServer] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
}

/** Vráti fresh serverový klient s plnými právami (RLS bypass). */
export function supabaseServer() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export type { SupabaseClient } from '@supabase/supabase-js'
