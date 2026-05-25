'use client'
import { useEffect, useState } from 'react'
import { supabaseClient } from '@/integrations/supabase/client'
import { type ProductSlug, TESTING_MODE, isAdminEmail, type AccessResult } from '@/lib/access'

interface AccessState {
  result: AccessResult | null  // null = still loading
  loading: boolean
  userEmail: string | null
}

/**
 * Client-side access check hook.
 * Mirrors the logic in access-server.ts for use in client components.
 */
export function useAccess(productSlug: ProductSlug): AccessState {
  const [state, setState] = useState<AccessState>({
    result: null,
    loading: true,
    userEmail: null,
  })

  useEffect(() => {
    let cancelled = false

    async function check() {
      const { data: { session } } = await supabaseClient.auth.getSession()
      if (cancelled) return

      if (!session?.user) {
        setState({ result: 'no-auth', loading: false, userEmail: null })
        return
      }

      const email = session.user.email ?? null

      // Admins always have access
      if (isAdminEmail(email)) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }

      // Testing mode: logged in = access
      if (TESTING_MODE) {
        setState({ result: 'granted', loading: false, userEmail: email })
        return
      }

      // Production: check entitlements
      const { data } = await supabaseClient
        .from('user_entitlements')
        .select('id, expires_at')
        .eq('user_id', session.user.id)
        .eq('product_slug', productSlug)
        .maybeSingle()

      if (cancelled) return

      if (!data) {
        setState({ result: 'no-access', loading: false, userEmail: email })
        return
      }

      const expired = data.expires_at && new Date(data.expires_at) < new Date()
      setState({
        result: expired ? 'no-access' : 'granted',
        loading: false,
        userEmail: email,
      })
    }

    check()
    return () => { cancelled = true }
  }, [productSlug])

  return state
}
