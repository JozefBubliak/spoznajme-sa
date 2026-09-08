import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Service-role klient — plný prístup, obchádza RLS. Len na serveri.
// Kľúč VÝHRADNE z env (SUPABASE_SERVICE_ROLE_KEY na Verceli), nikdy v kóde.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[supabaseAdmin] Chýba NEXT_PUBLIC_SUPABASE_URL alebo SUPABASE_SERVICE_ROLE_KEY.')
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
