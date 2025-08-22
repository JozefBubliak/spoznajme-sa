'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function LoginPageContent() {
  const params = useSearchParams()
  const next = params.get('next') || '/app'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="max-w-sm mx-auto py-10">
        <p className="text-center text-sm text-muted-foreground">
          Odkaz na prihlásenie bol odoslaný na {email}. Skontrolujte svoj e‑mail.
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vam@example.com"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Odosielam…' : 'Prihlásiť e‑mailom'}
        </Button>
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}
