// PATH: src/integrations/supabase/server.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Číta env tak, ako ich máš nastavené (.env.local / Vercel):
const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uoochdvpvjlcuxwlyhnb.supabase.co'
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY || // voliteľný alias
  ''

if (!URL || !SERVICE_KEY) {
  // Fail‑fast v dev; ak chceš len varovanie, zmeň na console.warn(...)
  throw new Error(
    '[supabaseServer] Missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
  )
}

/** Server‑only Supabase klient (SERVICE ROLE KEY; RLS bypass). */
export function supabaseServer(): SupabaseClient<Database> {
  return createClient<Database>(URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export type { SupabaseClient } from '@supabase/supabase-js'
