'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

function RegisterPageContent() {
  const params = useSearchParams()
  const next = params.get('next') || '/app'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || location.origin

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  const handleOAuth = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
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
            <CardTitle>Skontrolujte si e‑mail</CardTitle>
            <CardDescription>
              Odkaz na prihlásenie bol odoslaný na {email}.
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
          <CardTitle>Zaregistruj sa a zapoj sa do rozhovorov</CardTitle>
          <CardDescription>
            Jeden účet pre všetky konverzačné hry, otázky a nástroje na DeepTalks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>Prístup k uzamknutým sekciám a aplikáciám</li>
            <li>Ukladanie výsledkov a súkromných miestností pre páry</li>
            <li>Komentáre, hodnotenia a personalizované odporúčania</li>
            <li>Denné otázky a nové balíčky obsahu</li>
          </ul>
          <Button
            type="button"
            className="w-full"
            onClick={handleOAuth}
            disabled={loading}
          >
            Pokračovať cez Google
          </Button>
          <form onSubmit={handleSignup} className="space-y-2">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tvoj@example.com"
            />
            <Button type="submit" disabled={loading} className="w-full">
              Pokračovať e‑mailom
            </Button>
          </form>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Registrácia je bezplatná. Žiadny spam. Účet aj dáta môžeš kedykoľvek vymazať.</p>
            <p>Tvoje súkromie chránime – údaje nezdieľame s tretími stranami.</p>
          </div>
          <div className="text-sm text-center">
            <Link href={`/auth/login${next ? `?next=${encodeURIComponent(next)}` : ''}`}>Mám účet – Prihlásiť sa</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  )
}

