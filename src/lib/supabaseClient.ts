// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = "https://uoochdvpvjlcuxwlyhnb.supabase.co"
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvb2NoZHZwdmpsY3V4d2x5aG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTk0NTEsImV4cCI6MjA2OTg5NTQ1MX0.jyq4HucMx_27DLaa6wN611VVMCXg2Z42VRJ1XDxqJHs"

declare global {
  interface Window {
    __spoznajmeSupabaseClient?: ReturnType<typeof createClient>
  }
}

// Pozor: na serveri nie je localStorage – vytvorme klienta bezpečne podľa prostredia
export const supabase =
  typeof window !== 'undefined'
    ? window.__spoznajmeSupabaseClient ??= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storageKey: 'cards-auth',
          storage: localStorage,
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })

/**
 * Synchronizuje Supabase access token do cookie `sb-auth-token`, aby ho
 * server-side `getSession()` vedel prečítať z HTTP požiadaviek.
 * Volá sa pri každej zmene auth stavu (login, token refresh, logout).
 */
export function syncAuthCookie(token: string | null, expiresIn = 3600) {
  if (typeof document === 'undefined') return
  if (token) {
    document.cookie = `sb-auth-token=${token}; path=/; max-age=${expiresIn}; SameSite=Lax`
  } else {
    document.cookie = 'sb-auth-token=; path=/; max-age=0'
  }
}

// Automaticky udržuj cookie aktuálnu pri každej zmene session
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((_event, session) => {
    syncAuthCookie(session?.access_token ?? null, session?.expires_in ?? 3600)
  })
}
