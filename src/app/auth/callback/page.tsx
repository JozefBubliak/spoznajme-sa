'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

function AuthCallbackContent() {
  const router = useRouter()
  const params = useSearchParams()
  const nextParam = params?.get('next')
  const next = nextParam && nextParam.startsWith('/') ? nextParam : '/'
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        setError(error.message)
        return
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

