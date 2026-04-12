import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const INDEX_CARDS = [
  {
    href: '/indexy/co-trapi-deti',
    label: 'Čo trápi deti',
    description:
      'Vstup cez detské prežívanie, školu, kamarátstva, tlak, úzkosť a ticho, ktoré rodič často nevie rozlúštiť.',
  },
  {
    href: '/indexy/co-trapi-rodicov',
    label: 'Čo trápi rodičov',
    description:
      'Vstup cez rodičovské otázky, viny, bezmocnosť, konflikty a situácie, kde už bežné rady nepomáhajú.',
  },
]

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Indexy | DeepTalks',
    description: 'Tematické indexy podľa toho, čo najčastejšie trápi deti a rodičov.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy`,
      languages: buildHreflangAlternates('/indexy'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Indexy' }]} />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Indexové vstupy
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Indexy sú rýchla orientácia podľa toho, čo človeka práve trápi.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Namiesto hľadania správnej kategórie od nuly vieš začať cez perspektívu dieťaťa
                alebo rodiča a odtiaľ sa prekliknúť na vhodné témy, pomôcky a skupiny.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {INDEX_CARDS.map((card) => (
            <Link
              key={card.href}
              href={`/${lang}${card.href}`}
              className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <h2 className="text-2xl font-semibold text-foreground">{card.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              <div className="mt-5 text-sm font-medium text-primary">Otvoriť index →</div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
