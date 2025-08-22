'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseHerd } from '@/lib/supabaseHerdClient'

export const dynamic = 'force-dynamic'

function HerdAuthCallbackInner() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const handleRedirect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await supabaseHerd.auth.getSession()

      const defaultCookie = document.cookie
        .split('; ')
        .find((c) => c.startsWith('sb-'))
      if (defaultCookie) {
        const value = defaultCookie.substring(defaultCookie.indexOf('=') + 1)
        document.cookie = `sb-herd-auth-token=${value}; path=/; max-age=604800`
      }

      const lang = params.get('lang') || 'sk'
      router.push(`/${lang}/apps/herd-vote`)
    }
    handleRedirect()
  }, [params, router])

  return <p className="text-center p-10 text-gray-500">Prihlasovanie...</p>
}

export default function HerdAuthCallback() {
  return (
    <Suspense fallback={<p className="text-center p-10 text-gray-500">Prihlasovanie...</p>}>
      <HerdAuthCallbackInner />
    </Suspense>
  )
}
