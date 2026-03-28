'use client'

import { useRouter } from 'next/navigation'
import { Sparkles, Check } from 'lucide-react'

const features = [
  '8 000+ premyslených otázok',
  'Všetky 4 skupiny bez obmedzenia',
  'Ukladanie obľúbených otázok',
  'História videných otázok',
  'Jednorazová platba — navždy',
  'Žiadne predplatné, žiadne skrytá poplatky',
]

export default function UpgradePage() {
  const router = useRouter()

  const handleUpgrade = () => {
    window.location.href = 'https://buy.stripe.com/test_bJefZg2BJbQ3dzv4L34Vy00'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-16">
      <div className="max-w-md w-full space-y-6">

        {/* Card */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-2">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Plný prístup</h1>
            <p className="text-muted-foreground text-sm">
              Raz zaplatiť, navždy mať prístup ku všetkým otázkam.
            </p>
          </div>

          <div className="text-center py-2">
            <span className="text-4xl font-black text-primary">6,99 €</span>
            <span className="text-muted-foreground text-sm ml-2">jednorazovo</span>
          </div>

          <ul className="space-y-2.5">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Odomknúť za 6,99 €
          </button>

          <button
            onClick={() => router.back()}
            className="w-full py-2.5 rounded-xl border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Späť
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Platba cez Stripe. Bezpečné a šifrované.
        </p>
      </div>
    </div>
  )
}
