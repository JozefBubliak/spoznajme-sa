// PATH: src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

declare global {
  interface Window {
    __spoznajmeSupabaseClient?: ReturnType<typeof createClient>
  }
}

export const supabaseClient =
  typeof window !== 'undefined'
    ? window.__spoznajmeSupabaseClient ??= createClient(url, anon, {
        auth: {
          storageKey: 'cards-auth',
          storage: localStorage,
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : createClient(url, anon, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
