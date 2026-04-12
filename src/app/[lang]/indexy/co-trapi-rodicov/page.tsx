import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const PARENT_CONCERNS = [
  {
    title: 'Dieťa sa uzatvára alebo nič nepovie',
    description: 'Keď odpoveď končí pri „neviem“ alebo „nič“, rodič potrebuje iný začiatok rozhovoru.',
    href: '/pomocky/tema/zacinat-rozovor',
  },
  {
    title: 'Výbuchy, plač alebo zahltenie emóciami',
    description: 'Situácie, kde nepomôže tlak ani logika ako prvá reakcia, ale regulácia a tempo.',
    href: '/pomocky/tema/emocie-a-regulacia',
  },
  {
    title: 'Hranice doma nefungujú',
    description: 'Večerné rutiny, obrazovky, dohody a každodenné konflikty bez zbytočného kriku.',
    href: '/pomocky/tema/hranice-a-dohody',
  },
  {
    title: 'Škola, výkon a tlak',
    description: 'Ako hovoriť o výsledkoch, snahe a podpore bez porovnávania a hanby.',
    href: '/pomocky/tema/skola-a-ucenie',
  },
]

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  return {
    title: 'Čo trápi rodičov | DeepTalks',
    description:
      'Prehľad najčastejších rodičovských komunikačných situácií a živých ciest, kam na webe pokračovať.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-rodicov`,
      languages: buildHreflangAlternates('/indexy/co-trapi-rodicov'),
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
              items={[
                { href: `/${lang}`, label: 'Domov' },
                { href: `/${lang}/indexy`, label: 'Indexy' },
                { label: 'Čo trápi rodičov' },
              ]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Perspektíva rodiča
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Čo trápi rodičov, keď rozhovor doma prestáva fungovať.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Tento index nespája rodičov len s problémom, ale aj s prvým ďalším krokom:
                vhodnou témou, vekovou mapou alebo konkrétnou vetvou Kompasu.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-10">
          <section className="grid gap-5 md:grid-cols-2">
            {PARENT_CONCERNS.map((item) => (
              <Link
                key={item.title}
                href={`/${lang}${item.href}`}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <h2 className="text-2xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-5 text-sm font-medium text-primary">Otvoriť tému →</div>
              </Link>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Ďalšie filtre
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/vekove-mapy`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Vstup cez vek dieťaťa</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/kompas/rodic-dieta`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Kompas rodič–dieťa</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Podporné vetvy
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/produkty/rodic-dieta`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Produkty rodič–dieťa</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/skupiny/rodic-dieta`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Skupina rodič–dieťa</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
