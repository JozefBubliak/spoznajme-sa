'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Nezobrazovať v immersive vetvách (majú vlastný shell / sú to nástroje).
const HIDE = [
  /^\/[a-z]{2}\/herd-vote(\/|$)/,
  /^\/[a-z]{2}\/karticky(\/|$)/,
  /^\/[a-z]{2}\/dotaznik(\/|$)/,
  /^\/[a-z]{2}\/play\//,
]

// Spoločná pätička pre /[lang] stránky (montuje sa v [lang]/layout.tsx).
export default function SiteFooter({ lang }: { lang: string }) {
  const pathname = usePathname()
  if (pathname && HIDE.some((re) => re.test(pathname))) return null

  const p = (s: string) => `/${lang}${s}`
  const col = 'block text-muted-foreground transition hover:text-foreground'

  return (
    <footer className="border-t border-border bg-card/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <span className="text-lg font-semibold">DeepTalks</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Pretože realita je lepšia ako obrazovka. Nástroje, otázky a komunita pre lepšie rozhovory.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Nástroje</h3>
          <div className="space-y-2 text-sm">
            <Link href={p('/kompas')} className={col}>Kompas</Link>
            <Link href={p('/apps/spoznajme-sa')} className={col}>Kartičky</Link>
            <Link href={p('/apps/otazka-dna')} className={col}>Otázka dňa</Link>
            <Link href={p('/apps/daily-connection')} className={col}>Daily Connection</Link>
            <Link href={p('/apps/couplesync')} className={col}>CoupleSync</Link>
            <Link href={p('/herd-vote')} className={col}>Herd Vote</Link>
            <Link href={p('/apps')} className={col}>Ďalšie hry</Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Oblasti</h3>
          <div className="space-y-2 text-sm">
            <Link href={p('/skupiny/pary')} className={col}>Páry</Link>
            <Link href={p('/skupiny/rodic-dieta')} className={col}>Rodič a dieťa</Link>
            <Link href={p('/skupiny/priatelia')} className={col}>Priatelia</Link>
            <Link href={p('/skupiny/praca')} className={col}>Práca</Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Projekt</h3>
          <div className="space-y-2 text-sm">
            <Link href={p('/o-nas')} className={col}>Prečo hovoriť</Link>
            <Link href={p('/komunita')} className={col}>Komunita</Link>
            <Link href={p('/b2b')} className={col}>B2B</Link>
            <Link href={p('/produkty')} className={col}>Produkty</Link>
            <Link href={p('/produkty/tricka')} className={col}>Merch</Link>
            <Link href={p('/kontakt')} className={col}>Kontakt</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DeepTalks · Všetky práva vyhradené.</span>
          <div className="flex gap-4">
            <Link href={p('/ochrana-sukromia')} className="transition hover:text-foreground">Súkromie</Link>
            <Link href={p('/podmienky')} className="transition hover:text-foreground">Podmienky</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
