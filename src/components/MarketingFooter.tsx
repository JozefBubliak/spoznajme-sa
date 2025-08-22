'use client'

import Link from 'next/link'

export function MarketingFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/20">
      <div className="container-modern py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="font-bold text-xl gradient-connection">Spoznajme sa</div>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Otázky, ktoré pomáhajú ľuďom rozprávať sa lepšie — doma, v partnerskom vzťahu aj s priateľmi.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Produkt</h4>
          <div className="space-y-2 text-sm">
            <Link href="/pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Cenník</Link>
            <Link href="/free" className="block text-muted-foreground hover:text-foreground transition-colors">Vyskúšať zdarma</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Spoločnosť</h4>
          <div className="space-y-2 text-sm">
            <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">O nás</Link>
            <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Právne</h4>
          <div className="space-y-2 text-sm">
            <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">Podmienky</Link>
            <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">Súkromie</Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-modern py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {year} Spoznajme sa. Všetky práva vyhradené.</span>
          <span>Vyrobené s ❤️ pre lepšiu komunikáciu</span>
        </div>
      </div>
    </footer>
  )
}
