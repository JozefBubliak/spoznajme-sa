'use client'

import { useState, useEffect, Suspense, FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

function safeNext(next: string | null) {
  // allow only internal paths; otherwise fall back to home page
  if (!next || !next.startsWith('/')) return '/'
  return next
}

function AuthPageContent() {
  const params = useSearchParams()
  const router = useRouter()
  const next = safeNext(params.get('next'))

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // persistencia URL (host) – použijeme env alebo aktuálny origin
  const siteUrl =
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
    (typeof window !== 'undefined' ? window.location.origin : '')

  // ak už je user prihlásený, presmeruj rovno na next
  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) router.replace(next)
    })
    return () => {
      mounted = false
    }
  }, [next, router])

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  const handleOAuth = async (provider: 'google' /* | 'github' */) => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Skontroluj si e-mail</CardTitle>
            <CardDescription>
              Poslali sme ti magický odkaz na <b>{email}</b>. Platí pár minút.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Vstup do súkromnej miestnosti</CardTitle>
          <CardDescription>Nepoužívame heslá – prihlásenie cez Google alebo magický odkaz.</CardDescription>
          {next !== '/' && (
            <CardDescription>Táto sekcia vyžaduje prihlásenie.</CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            type="button"
            className="w-full"
            onClick={() => handleOAuth('google')}
            disabled={loading}
          >
            Pokračovať cez Google
          </Button>

          <div className="text-center text-xs text-muted-foreground">alebo</div>

          <form onSubmit={handleMagicLink} className="space-y-2">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="meno@domena.sk"
            />
            <Button type="submit" disabled={loading} className="w-full">
              Pošlite mi odkaz
            </Button>
          </form>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Súkromie: nezhromažďujeme citlivé údaje. Údaje sú viazané len k anonymnej miestnosti.</p>
            <p>Pokračovaním súhlasíš s Podmienkami a Zásadami ochrany súkromia.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  )
}

