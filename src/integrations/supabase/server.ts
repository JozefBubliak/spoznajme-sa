// PATH: src/integrations/supabase/server.ts
import 'server-only'
import { createClient } from '@supabase/supabase-js'
// Ak máš generované typy, nechaj import. Ak nie, zmaž tento riadok aj <Database> nižšie.
import type { Database } from './types'

/**
 * Server‑only Supabase klient s SERVICE ROLE kľúčom.
 * - Používaj výhradne v server kode (route handlers, server actions).
 * - Nikdy ho NEimportuj do client komponentov.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY || // povolený fallback
  ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('[supabaseServer] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
}

/** Vráti fresh serverový klient s plnými právami (RLS bypass). */
export function supabaseServer() {
  // Pozn.: NEpoužívame persistSession v server prostredí
  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// Nepovinné: ak niekde typuješ klient
export type { SupabaseClient } from '@supabase/supabase-js'
