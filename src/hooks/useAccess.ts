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
 * Client-side access check hook.
 * Uses onAuthStateChange for reliable session detection (no race condition after login redirect).
 */
export function useAccess(productSlug: ProductSlug): AccessState {
  const [state, setState] = useState<AccessState>({
    result: null,
    loading: true,
    userEmail: null,
  })

  useEffect(() => {
    let cancelled = false

    async function check(sessionUser: { id: string; email?: string } | null) {
      if (cancelled) return

      if (!sessionUser) {
        setState({ result: 'no-auth', loading: false, userEmail: null })
        return
      }

      const email = sessionUser.email ?? null

      // Admins always have access
      if (isAdminEmail(email)) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }

      // Testing mode: any logged-in user has access
      if (TESTING_MODE) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }

      // Production: check entitlements table
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
      setState({
        result: expired ? 'no-access' : 'granted',
        loading: false,
        userEmail: email,
      })
    }

    // Subscribe to auth state — fires immediately with current state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      check(session?.user ?? null)
    })

    // Also run immediately in case onAuthStateChange has a delay
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled) check(session?.user ?? null)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [productSlug])

  return state
}
