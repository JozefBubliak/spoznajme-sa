import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const AGE_RANGES = [
  {
    slug: '0-3',
    label: '0–3 roky',
    description: 'Bezpečie, kontakt, rytmus a úplne prvé pomenovanie emócií.',
  },
  {
    slug: '3-6',
    label: '3–6 rokov',
    description: 'Predškolský vek, hranice, hra a upokojujúci jazyk.',
  },
  {
    slug: '7-11',
    label: '7–11 rokov',
    description: 'Škola, kamarátstva, sebadôvera a rozhovory bez výsluchu.',
  },
  {
    slug: '12-15',
    label: '12–15 rokov',
    description: 'Skorá adolescencia, rešpekt, vzdor a digitálny život.',
  },
  {
    slug: '16-18',
    label: '16–18 rokov',
    description: 'Dôvera, autonómia, budúcnosť, partnerstvá a ťažké témy.',
  },
]

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Vekové mapy | DeepTalks',
    description: 'Prehľad vstupov podľa veku dieťaťa a typu rozhovoru, ktorý potrebuješ viesť.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/vekove-mapy`,
      languages: buildHreflangAlternates('/vekove-mapy'),
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
            <Breadcrumbs
              items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Vekové mapy' }]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Vek ako filter
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Vekové mapy pomáhajú zvoliť jazyk, ktorý je primeraný vývinu aj situácii.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Keď nevieš, ako jemne začať alebo koľko vysvetľovať, vek je dobrý prvý filter.
                Odtiaľ sa potom vieš prekliknúť na konkrétne témy a pomôcky.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {AGE_RANGES.map((range) => (
            <Link
              key={range.slug}
              href={`/${lang}/vekove-mapy/${range.slug}`}
              className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <h2 className="text-2xl font-semibold text-foreground">{range.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{range.description}</p>
              <div className="mt-5 text-sm font-medium text-primary">Otvoriť vekovú mapu →</div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
