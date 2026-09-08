import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getSession } from '@/app/api/games/_session'
import { isAdminEmail } from '@/lib/access'
import { ParTag } from './_par-info'

// Neverejné, nezaraditeľné do vyhľadávačov — pracovná verzia, len pre adminov.
export const metadata: Metadata = {
  title: 'Dotazník intímnych preferencií (pracovná verzia)',
  robots: { index: false, follow: false, nocache: true },
}

// Admin gate číta cookie → celý strom musí byť dynamický (žiadny prerender).
export const dynamic = 'force-dynamic'

// Záložný zoznam adminov (ak nie je nastavený ADMIN_EMAILS env na produkcii).
const FALLBACK_ADMINS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

async function guardAdmin() {
  const session = await getSession()
  const email = session?.user?.email?.toLowerCase()
  const ok = !!email && (isAdminEmail(email) || FALLBACK_ADMINS.includes(email))
  if (!ok) notFound()
}

export default async function DotaznikLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  // Zatiaľ prístup len pre adminov.
  await guardAdmin()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* pracovná lišta — kým je nástroj neverejný */}
      <div className="w-full border-b border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 px-4 py-1.5 text-center text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--warning))]">
        Pracovná verzia · len pre adminov · zatiaľ len kostra stromu
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-5">
          <Link
            href={`/${lang}/dotaznik`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 transition hover:text-foreground"
          >
            Dotazník
          </Link>
          <div className="flex items-center gap-4">
            <ParTag lang={lang} />
            <Link
              href={`/${lang}/dotaznik/moduly`}
              className="text-xs text-muted-foreground transition hover:text-foreground"
            >
              Mapa modulov
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
