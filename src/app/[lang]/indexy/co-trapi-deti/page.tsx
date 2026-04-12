import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const KID_CONCERNS = [
  {
    title: 'Neviem povedať, čo cítim',
    description: 'Keď dieťa alebo tínedžer cíti veľa, ale nevie to preložiť do slov.',
    href: '/pomocky/tema/emocie-a-regulacia',
  },
  {
    title: 'V škole alebo medzi ľuďmi je mi ťažko',
    description: 'Tlak, hanba, konflikty, neistota a otázka, ako o tom hovoriť doma.',
    href: '/pomocky/tema/skola-a-ucenie',
  },
  {
    title: 'Mobil, internet a online svet ma zahlcujú',
    description: 'Digitálny život, dohody, tlak skupiny a bezpečné otvorenie témy.',
    href: '/pomocky/tema/digitalny-zivot',
  },
  {
    title: 'Sú veci, ktoré sa hanbím povedať nahlas',
    description: 'Citlivé témy okolo tela, psychiky, straty, šikany alebo osamelosti.',
    href: '/pomocky/tema/zdravie-a-tazke-temy',
  },
]

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Čo trápi deti | DeepTalks',
    description:
      'Prehľad tém, cez ktoré sa dajú pomenovať bežné detské a tínedžerské ťažkosti bez tlaku a výsluchu.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-deti`,
      languages: buildHreflangAlternates('/indexy/co-trapi-deti'),
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
                { label: 'Čo trápi deti' },
              ]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Perspektíva dieťaťa
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Čo trápi deti, keď ešte nevedia nájsť správne slová.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Tento index pomáha rodičovi aj dieťaťu nájsť tému, cez ktorú sa dá začať jemnejšie,
                bez výsluchu a bez pocitu, že treba všetko vyriešiť naraz.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-10">
          <section className="grid gap-5 md:grid-cols-2">
            {KID_CONCERNS.map((item) => (
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
                  <span>Vstup cez vek</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/kompas/deti`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Kompas pre deti</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Mäkšie vstupy
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/apps/spoznajme-sa`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Online kartičky</span>
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
