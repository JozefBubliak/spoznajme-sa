'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase, syncAuthCookie } from '@/lib/supabaseClient'

function AuthCallbackContent() {
  const router = useRouter()
  const params = useSearchParams()
  const nextParam = params?.get('next')
  const next = nextParam && nextParam.startsWith('/') ? nextParam : '/'
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        setError(error.message)
        return
      }
      // Explicitne nastav cookie pred redirectom, aby ju server videl hneď na ďalšej stránke
      if (data.session) {
        syncAuthCookie(data.session.access_token, data.session.expires_in ?? 3600)
      }
      router.replace(next)
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Prihlásenie zlyhalo</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <p>Prihlasujem…</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center p-4">
          <p>Prihlasujem…</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}

