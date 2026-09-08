'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase, syncAuthCookie } from '@/lib/supabaseClient'

function AuthCallbackContent() {
  const router = useRouter()
  const params = useSearchParams()
  const nextParam = params?.get('next')
  const next = nextParam && nextParam.startsWith('/') ? nextParam : '/'
  const [error, setError] = useState<string | null>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    // The shared client has `detectSessionInUrl: true`, so it already tries to
    // pick up the session from the URL on load — implicit flow (`#access_token=…`)
    // AND PKCE (`?code=…`). We must NOT blindly call exchangeCodeForSession too:
    // in the implicit flow it throws "both auth code and code verifier should be
    // non-empty" even though login actually succeeded.
    const finish = (session: { access_token: string; expires_in?: number } | null) => {
      if (doneRef.current) return
      doneRef.current = true
      if (session) {
        syncAuthCookie(session.access_token, session.expires_in ?? 3600)
        router.replace(next)
      } else {
        router.replace(`/auth?next=${encodeURIComponent(next)}`)
      }
    }

    // Provider returned an explicit error (query or hash)?
    const q = new URLSearchParams(window.location.search)
    const h = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const errDesc = q.get('error_description') || h.get('error_description') || q.get('error') || h.get('error')
    if (errDesc) {
      setError(decodeURIComponent(errDesc.replace(/\+/g, ' ')))
      return
    }

    // Already have a session (auto-detect finished first, or one existed)?
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish(data.session)
    })

    // Otherwise wait for auto-detect to sign us in.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) finish(session)
    })

    // Last-resort: if a PKCE code is present and nothing fired, exchange manually.
    const timer = setTimeout(async () => {
      if (doneRef.current) return
      if (q.has('code')) {
        const { data, error: exErr } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (exErr) { setError(exErr.message); return }
        finish(data.session)
      } else {
        finish(null)
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
      sub.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <div className="text-center space-y-3 max-w-sm">
          <h1 className="text-xl font-semibold">Prihlásenie zlyhalo</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => router.replace(`/auth?next=${encodeURIComponent(next)}`)}
            className="text-sm underline text-primary"
          >
            Skúsiť znova
          </button>
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
