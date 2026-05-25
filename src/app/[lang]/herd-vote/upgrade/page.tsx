'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function HerdVoteUpgradePage() {
  const params = useParams() as { lang?: string }
  const lang = params?.lang ?? 'sk'
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const startCheckout = async () => {
    if (!user) {
      router.push(`/auth?next=/${lang}/herd-vote/upgrade`)
      return
    }
    setLoading(true)
    setErr('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: 'herd-vote', lang }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setErr(data.error ?? 'Niečo sa pokazilo')
        setLoading(false)
      }
    } catch {
      setErr('Chyba spojenia')
      setLoading(false)
    }
  }

  return (
    <div className="hv-bg hv-particles min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 animate-fade-in">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20">
            <span>🐂</span><span>Herd Vote</span>
          </div>
          <h1 className="text-3xl font-black text-white">Získaj prístup</h1>
          <p className="hv-text-muted text-sm">
            Jednorázová platba — hra navždy.
          </p>
        </div>

        {/* Pricing card */}
        <div className="hv-card-glow p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="text-5xl font-black text-white">9 €</div>
            <div className="text-sm text-white/40">jednorazovo · bez predplatného</div>
          </div>

          <ul className="space-y-3 text-sm text-white/70">
            {[
              '🎮 Neobmedzené hry ako moderátor',
              '👥 Až 50 hráčov v jednej hre',
              '📚 Plný prístup ku všetkým kategóriám',
              '📱 QR kód + zdieľateľný link',
              '🏆 Výsledková obrazovka',
            ].map(f => (
              <li key={f} className="flex items-start gap-2">
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {err && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-300 text-sm text-center">
              {err}
            </div>
          )}

          <button
            onClick={startCheckout}
            disabled={loading}
            className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Presmerovávam…
              </span>
            ) : user ? '💳 Kúpiť prístup — 9 €' : '🔐 Prihlásiť sa a kúpiť'}
          </button>

          <p className="text-xs text-white/30 text-center">
            Platba cez Stripe · Karta, Apple Pay, Google Pay
          </p>
        </div>

        <div className="text-center">
          <Link href={`/${lang}/herd-vote`}
            className="text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Späť na Herd Vote
          </Link>
        </div>
      </div>
    </div>
  )
}
