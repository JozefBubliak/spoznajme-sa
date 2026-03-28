'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // localStorage fallback until server-side webhook confirms paid status
    localStorage.setItem('paid', 'true')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-16">
      <div className="max-w-md w-full rounded-2xl border bg-card p-10 text-center space-y-6 shadow-sm">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mx-auto">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Ďakujeme za podporu!</h1>
          <p className="text-muted-foreground">
            Tvoja plná verzia je aktívna. Môžeš teraz využívať všetky otázky a funkcie bez obmedzení.
          </p>
        </div>

        <div className="rounded-xl border bg-muted px-4 py-3 text-sm text-muted-foreground">
          Ak sa plný prístup neaktivoval okamžite, odhlásiš a prihlásiš sa znova.
        </div>

        <button
          onClick={() => router.push('/sk/apps/spoznajme-sa/play')}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Pokračovať do aplikácie
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  )
}
