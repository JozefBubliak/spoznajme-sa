import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { FilterBar } from '@/components/FilterBar'
import { getToolFrontmatters, getTopicFrontmatters } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'
import { KOMPAS_AUDIENCES, KOMPAS_OVERVIEW_GROUPS } from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string }> }

const AGE_MAP_LINKS = [
  {
    slug: '0-3',
    label: '0–3 roky',
    description: 'Blízkosť, rytmus, spoluregulácia a prvé vzorce bezpečia.',
  },
  {
    slug: '3-6',
    label: '3–6 rokov',
    description: 'Hranice, emócie, hra a jazyk, ktorým dieťa rozumie.',
  },
  {
    slug: '7-11',
    label: '7–11 rokov',
    description: 'Škola, výkony, kamarátstva a každodenné domáce dohody.',
  },
  {
    slug: '12-15',
    label: '12–15 rokov',
    description: 'Identita, odpor, tlak skupiny a jemnejší jazyk rešpektu.',
  },
  {
    slug: '16-18',
    label: '16–18 rokov',
    description: 'Autonómia, dôvera, partnerstvá a náročné otvorené témy.',
  },
]

const INDEX_LINKS = [
  {
    href: '/indexy/co-trapi-deti',
    label: 'Čo trápi deti',
    description: 'Zoradenie tém podľa toho, čo deti najčastejšie nevedia pomenovať doma.',
  },
  {
    href: '/indexy/co-trapi-rodicov',
    label: 'Čo trápi rodičov',
    description: 'Najčastejšie rodičovské vstupy, situácie a cesty, kam ich na webe poslať ďalej.',
  },
]

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Pomôcky | DeepTalks',
    description:
      'Prehľad praktických komunikačných pomôcok, tém, vekových máp a vstupov do Kompasu.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky`,
      languages: buildHreflangAlternates('/pomocky'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const topics = getTopicFrontmatters(lang)
  const tools = getToolFrontmatters(lang)

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Pomôcky' }]} />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Praktické vstupy
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Pomôcky sú rozcestník na konkrétny jazyk, nie slepá zložka s placeholdermi.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Nájdeš tu živé techniky, tematické vetvy, vekové mapy a indexy, ktoré ťa posunú
                ďalej podľa situácie, veku alebo typu vzťahu.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card/80 p-4">
              <FilterBar />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Live obsah
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                To, čo už má v projekte vlastný detail a vieš to hneď použiť.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Témy
                </p>
                <div className="mt-5 space-y-4">
                  {topics.map((topic) => (
                    <Link
                      key={String(topic.slug)}
                      href={`/${lang}/pomocky/tema/${topic.slug}`}
                      className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                    >
                      <h3 className="text-lg font-semibold text-foreground">{String(topic.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {String(topic.description ?? topic.seoDescription ?? '')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Techniky
                </p>
                <div className="mt-5 space-y-4">
                  {tools.map((tool) => (
                    <Link
                      key={`${tool.topicSlug}-${String(tool.slug)}`}
                      href={`/${lang}/pomocky/tema/${tool.topicSlug}/${tool.slug}`}
                      className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-foreground">{String(tool.title)}</h3>
                        {tool.tool_id ? (
                          <span className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {String(tool.tool_id)}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {String(tool.summary ?? '')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Rýchle vstupy
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Keď ešte nevieš, či potrebuješ tému, vekovú mapu alebo publikum.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <Link
                href={`/${lang}/kompas`}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-xl font-semibold text-foreground">Komunikačný kompas</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Publikum, situácie a konkrétne vstupné vety naprieč vzťahmi.
                </p>
                <div className="mt-5 text-sm font-medium text-primary">Otvoriť Kompas →</div>
              </Link>
              <Link
                href={`/${lang}/indexy`}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-xl font-semibold text-foreground">Indexy potrieb</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Rodičia a deti sa často pýtajú inak. Indexy pomáhajú nájsť správny vstup.
                </p>
                <div className="mt-5 text-sm font-medium text-primary">Prejsť indexy →</div>
              </Link>
              <Link
                href={`/${lang}/vekove-mapy`}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-xl font-semibold text-foreground">Vekové mapy</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Vstup cez vek, keď potrebuješ rýchlo odhadnúť primeraný jazyk a rytmus rozhovoru.
                </p>
                <div className="mt-5 text-sm font-medium text-primary">Otvoriť vekové mapy →</div>
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Publikum
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                Vyber si vzťahový kontext, v ktorom sa problém odohráva.
              </h2>
              <div className="mt-6 space-y-3">
                {KOMPAS_AUDIENCES.slice(0, 4).map((audience) => (
                  <Link
                    key={audience.slug}
                    href={`/${lang}${audience.canonicalHref}`}
                    className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    <span>{audience.label}</span>
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Mapovanie
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                Prehľadové skupiny z dokumentácie máme už priamo napojené na živé vetvy.
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {KOMPAS_OVERVIEW_GROUPS.slice(0, 4).map((group) => (
                  <div
                    key={group.slug}
                    className="rounded-2xl border border-border/60 bg-background/70 p-5"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{group.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Indexy
              </p>
              <div className="mt-5 space-y-4">
                {INDEX_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${lang}${item.href}`}
                    className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Vekové mapy
              </p>
              <div className="mt-5 space-y-4">
                {AGE_MAP_LINKS.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${lang}/vekove-mapy/${item.slug}`}
                    className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
