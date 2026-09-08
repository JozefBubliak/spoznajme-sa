import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

// Neverejné, nezaraditeľné do vyhľadávačov — pracovná verzia.
export const metadata: Metadata = {
  title: 'Dotazník intímnych preferencií (pracovná verzia)',
  robots: { index: false, follow: false, nocache: true },
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* pracovná lišta — kým je nástroj neverejný */}
      <div className="w-full border-b border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 px-4 py-1.5 text-center text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--warning))]">
        Pracovná verzia · neverejné · zatiaľ len kostra stromu
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-5">
          <Link
            href={`/${lang}/dotaznik`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 transition hover:text-foreground"
          >
            Dotazník
          </Link>
          <Link
            href={`/${lang}/dotaznik/moduly`}
            className="text-xs text-muted-foreground transition hover:text-foreground"
          >
            Mapa modulov
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
