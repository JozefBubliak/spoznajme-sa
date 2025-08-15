// PATH: src/integrations/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

export function supabaseServer() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://uoochdvpvjlcuxwlyhnb.supabase.co'

  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY || // fallback názov, ak by bol
    ''

  if (!url || !serviceKey) {
    throw new Error('Supabase server credentials missing')
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export type { SupabaseClient } from '@supabase/supabase-js'
