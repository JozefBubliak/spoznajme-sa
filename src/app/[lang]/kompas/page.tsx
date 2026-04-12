// PATH: src/app/[lang]/kompas/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Kompas from '@/components/Kompas'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { KOMPAS_AUDIENCES, KOMPAS_THEMES } from '@/lib/kompas-content'

export const metadata: Metadata = {
  title: 'Komunikačný kompas | DeepTalks',
  description:
    'Krátke vety a minipostupy do bežných situácií. Vyber si publikum, otvor tému alebo prejdi živý prehliadač.',
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Domov
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Praktický jazyk do vzťahov
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Komunikačný kompas je mapa situácií, kde ľudia najčastejšie nevedia, ako začať.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Namiesto generických rád ponúka konkrétne vety, tematické vetvy a publikum, v ktorom sa problém odohráva:
                doma, vo vzťahu, medzi kamarátmi, v práci alebo v citlivých témach.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/kompas/temy`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Všetky témy
              </Link>
              <Link
                href={`/${lang}/kompas/pary`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Kompas pre páry
              </Link>
              <Link
                href={`/${lang}/kompas/rodic-dieta`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Kompas rodič–dieťa
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Publikum</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Vyber si, v akom type vzťahu alebo situácie sa práve nachádzaš.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {KOMPAS_AUDIENCES.map((audience) => (
                <Link
                  key={audience.slug}
                  href={`/${lang}${audience.canonicalHref}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{audience.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{audience.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
                  <div className="mt-5 text-sm font-medium text-primary">Otvoriť vetvu →</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Témy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Alebo choď cez presnú tému, ak už vieš, čo potrebuješ pomenovať.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {KOMPAS_THEMES.slice(0, 6).map((theme) => (
                <Link
                  key={theme.slug}
                  href={`/${lang}/kompas/tema/${theme.slug}`}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="text-xl font-semibold text-foreground">{theme.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.description}</p>
                  <div className="mt-5 text-sm font-medium text-primary">Otvoriť tému →</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>

      <div className="border-t border-border/60">
        <Kompas hideHero />
      </div>
    </div>
  )
}
