import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const highlights = [
  { value: '3', label: 'úrovne hĺbky v kartičkách' },
  { value: '9', label: 'tematických okruhov v CoupleSync' },
  { value: '5 min', label: 'stačí denne na malý posun' },
]

const products = [
  {
    badge: 'Fyzický produkt',
    title: 'Kartičky pre páry',
    price: '18–25 €',
    description:
      'Elegantná sada otázok pre partnerov. Funguje ako darček aj ako rituál, ktorý vracia zvedavosť do vzťahu.',
    points: ['otázky v troch úrovniach hĺbky', 'na večer bez telefónov', 'darček s reálnym použitím'],
    href: '/apps/spoznajme-sa',
  },
  {
    badge: 'Zadarmo',
    title: 'CoupleSync',
    price: 'Online',
    description:
      'Partnerský dotazník, ktorý ukáže, kde sa zhodujete, kde sa míňate a ktoré témy si zaslúžia poctivý rozhovor.',
    points: ['každý vypĺňa zvlášť', '9 tém vrátane financií, intimity a hodnôt', 'výsledok vedie k ďalšiemu rozhovoru'],
    href: '/apps/couplesync',
  },
  {
    badge: 'Freemium',
    title: 'Daily Connection',
    price: 'Pripravujeme',
    description:
      'Jedna otázka denne pre vás dvoch. Produkt pre páry, ktoré chcú malý, ale pravidelný návyk namiesto veľkých sľubov.',
    points: ['rýchly denný rituál', 'pre páry v rutine', 'prirodzený vstup do premium modelu'],
    href: '/apps/daily-connection',
  },
  {
    badge: 'Darček',
    title: 'Darčekový poukaz',
    price: 'Od 10 €',
    description:
      'Keď chceš darovať niečo zmysluplné, ale nechceš vybrať za druhého konkrétny formát alebo edíciu.',
    points: ['výročie, svadba, Vianoce', 'bez výberovej paralýzy', 'použiteľný na fyzické aj digitálne produkty'],
    href: '/produkty/darcekovy-poukaz',
  },
]

const useCases = [
  {
    title: 'Nový vzťah',
    description: 'CoupleSync a ľahšie kartičky pomôžu spoznať sa bez hry na dokonalý pár.',
  },
  {
    title: 'Dlhodobý vzťah',
    description: 'Kartičky a každodenné mikrootázky vracajú zvedavosť tam, kde ju prehlušila rutina.',
  },
  {
    title: 'Náročné obdobie',
    description: 'Kompas a citlivejšie otázky sú bezpečnejší začiatok než tlak na „veľký rozhovor“ hneď.',
  },
]

export default async function ProduktyParyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_55%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Produkty
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Produkty pre páry
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Produkty pre páry, ktoré nechcú žiť len vedľa seba, ale naozaj sa počuť.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Fyzické kartičky, digitálny dotazník, denné mikrootázky aj darčekové riešenie. Každý produkt má iný
                vstup, ale rovnaký cieľ: dostať vzťah od rutiny späť k zvedavosti.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/skupiny/pary`}>Sekcia Páry</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/apps/couplesync`}>Otvoriť CoupleSync</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-card/80 p-5 text-center">
                  <div className="text-2xl font-bold text-foreground">{item.value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Produktová zostava</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Každý produkt rieši inú situáciu vo vzťahu.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {products.map((product) => {
                const card = (
                  <div className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                        {product.badge}
                      </span>
                      <span className="text-sm font-semibold text-primary">{product.price}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{product.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                    <ul className="mt-5 space-y-2">
                      {product.points.map((point) => (
                        <li key={point} className="text-sm text-muted-foreground">
                          • {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 text-sm font-medium text-primary">
                      {product.href ? 'Otvoriť →' : 'Pripravovaná vetva produktu'}
                    </div>
                  </div>
                )

                if (!product.href) return <div key={product.title}>{card}</div>

                return (
                  <Link key={product.title} href={`/${lang}${product.href}`} className="block h-full">
                    {card}
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kedy siahnuť po čom</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Nie každá fáza vzťahu potrebuje rovnaký produkt.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {useCases.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Najľahší štart</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ak nevieš, ktorý produkt je pre vás, začni tam, kde je najmenej odporu.</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Pre väčšinu párov je to CoupleSync alebo online kartičky. Fyzická edícia je výborná, keď chcete darček
                  aj rituál v jednom.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/apps/couplesync`}>Začať s CoupleSync</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/apps/spoznajme-sa`}>Online kartičky</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/skupiny/pary`}>Viac o pároch</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
