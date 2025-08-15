// PATH: src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * !!! Dôležité:
 *  - V prehliadači používame výhradne ANON key (NEXT_PUBLIC_SUPABASE_ANON_KEY).
 *  - Na serveri (Route Handlers / server actions) môžete použiť aj SERVICE ROLE key
 *    (SUPABASE_SERVICE_ROLE_KEY) – nikdy ho neposielajte do klienta.
 */

// Čítame z env (funguje lokálne aj na Verceli)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '' // len server

if (!SUPABASE_URL || !SUPABASE_ANON) {
  // Pomôcka pri vývoji – nech je hneď vidieť, čo chýba
  // (na produkcii by som túto vetu nechal v logu, nie ako throw)
  console.warn(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY env variables.'
  )
}

/**
 * Browser/SSR safe klient.
 * - v prehliadači perzistuje session v localStorage
 * - na serveri nepoužíva žiadne úložisko
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
})

/**
 * Server-only klient (voliteľný).
 * Použite ho iba v serverových handleroch (route.ts, server actions),
 * keď potrebujete práva Service Role (insert/update/… bez RLS limitov).
 *
 * Príklad použitia v route handleri:
 *   import { supabaseServer } from '@/integrations/supabase/client'
 *   const sb = supabaseServer()
 *   await sb.from('herd_games').insert({...})
 */
export function supabaseServer() {
  // ak chýba service key, padneme späť na anon (bezpečné, len s menšími právami)
  const key = SUPABASE_SERVICE || SUPABASE_ANON
  return createClient<Database>(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
