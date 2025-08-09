'use client'

import Link from 'next/link'

export function MarketingFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="font-semibold">Spoznajme sa</div>
          <p className="text-sm text-muted-foreground max-w-md">
            Otázky, ktoré pomáhajú ľuďom rozprávať sa lepšie — doma, v partnerskom vzťahu aj s priateľmi.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/terms" className="hover:underline">Podmienky</Link>
          <Link href="/privacy" className="hover:underline">Súkromie</Link>
          <span className="ml-auto text-muted-foreground">© {year} Spoznajme sa. Všetky práva vyhradené.</span>
        </div>
      </div>
    </footer>
  )
}
