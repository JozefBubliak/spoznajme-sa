'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'          // same client as auth/page.tsx
import { type ProductSlug, TESTING_MODE, isAdminEmail, type AccessResult } from '@/lib/access'

interface AccessState {
  result: AccessResult | null  // null = still loading
  loading: boolean
  userEmail: string | null
}

/**
 * Client-side access check.
 *
 * Reliability rule: we NEVER conclude "no-auth" from a single early
 * getSession() call — on a cold load that can transiently return null before
 * the persisted session is rehydrated/refreshed, which used to bounce a
 * logged-in user to /auth for nothing. Instead we trust onAuthStateChange
 * (its first INITIAL_SESSION event is authoritative) and only fall back to a
 * timeout.
 */
export function useAccess(productSlug: ProductSlug): AccessState {
  const [state, setState] = useState<AccessState>({
    result: null,
    loading: true,
    userEmail: null,
  })

  useEffect(() => {
    let cancelled = false
    let settled = false

    async function check(sessionUser: { id: string; email?: string } | null) {
      if (cancelled) return
      settled = true

      if (!sessionUser) {
        setState({ result: 'no-auth', loading: false, userEmail: null })
        return
      }

      const email = sessionUser.email ?? null

      if (isAdminEmail(email)) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }
      if (TESTING_MODE) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }

      try {
        const { data } = await supabase
          .from('user_entitlements')
          .select('id, expires_at')
          .eq('user_id', sessionUser.id)
          .eq('product_slug', productSlug)
          .maybeSingle()

        if (cancelled) return

        if (!data) {
          setState({ result: 'no-access', loading: false, userEmail: email })
          return
        }
        const expired = data.expires_at && new Date(data.expires_at as string) < new Date()
        setState({ result: expired ? 'no-access' : 'granted', loading: false, userEmail: email })
      } catch {
        // Network hiccup on the entitlement lookup must not read as "logged out"
        // for someone who clearly has a session. Let them through; the API
        // routes still enforce ownership server-side.
        if (!cancelled) setState({ result: 'granted', loading: false, userEmail: email })
      }
    }

    // Authoritative source: fires INITIAL_SESSION immediately, then live updates.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      check(session?.user ?? null)
    })

    // Fast path: if a session is already in memory, grant without waiting.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled && session?.user) check(session.user)
    })

    // Safety net: if the auth system never reported (offline, blocked storage),
    // decide after a grace period rather than hanging on the spinner forever.
    const timer = setTimeout(() => {
      if (!cancelled && !settled) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (!cancelled && !settled) check(session?.user ?? null)
        })
      }
    }, 4000)

    return () => {
      cancelled = true
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [productSlug])

  return state
}
