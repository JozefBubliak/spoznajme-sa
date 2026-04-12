import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const highlights = [
  { value: '4', label: 'vekové fázy, cez ktoré rodina prechádza' },
  { value: '1', label: 'jazyk na emócie, ktorý rodič často potrebuje ako prvý' },
  { value: '10 min', label: 'malý rituál, ktorý je realistický aj v bežný deň' },
]

const products = [
  {
    badge: 'Fyzický produkt',
    title: 'Kartičky rodič–dieťa',
    price: '18–25 €',
    description:
      'Otázky a malé aktivity, ktoré pomáhajú dostať sa za automatické „ako bolo?“ a vytvoriť bezpečný kontakt.',
    points: ['vhodné na večer, cestu autom aj víkend', 'fungujú aj ako darček do rodiny', 'jednoduchý vstup bez tlaku na dokonalý rozhovor'],
    href: '/skupiny/rodic-dieta',
  },
  {
    badge: 'Zadarmo',
    title: 'Kompas rodič–dieťa',
    price: 'Online',
    description:
      'Konkrétne vety a mikro postupy pre školu, hnev, obrazovky, pubertu aj citlivé rodinné situácie.',
    points: ['rýchla pomoc pred ťažkým rozhovorom', 'podľa veku dieťaťa', 'keď rodič potrebuje prvú vetu'],
    href: '/kompas/rodic-dieta',
  },
  {
    badge: 'Zadarmo',
    title: 'Vekové mapy',
    price: 'Praktický obsah',
    description:
      'Prehľad toho, čo deti riešia v rôznych vekoch. Pomáha rodičovi rozlišovať medzi vývinom a skutočným problémom.',
    points: ['zrozumiteľný orientačný rámec', 'most medzi intuíciou a realitou', 'doplnenie ku kartičkám a kompasu'],
    href: '/vekove-mapy/3-6',
  },
  {
    badge: 'Tematický prehľad',
    title: 'Indexy detských a rodičovských tém',
    price: 'Zadarmo',
    description:
      'Orientácia v tom, čo deti a rodičia najčastejšie riešia, aby sa človek nestratil v chaose alebo vine.',
    points: ['témy detí', 'témy rodičov', 'dobrý vstup pred hlbším obsahom'],
    href: '/indexy/co-trapi-deti',
  },
]

const useCases = [
  {
    title: 'Predškolák',
    description: 'Najlepšie fungujú hravé otázky a spoločný čas pri hre alebo pred spaním.',
  },
  {
    title: 'Školák',
    description: 'Pomáhajú konkrétne otázky o škole, kamarátoch a zvládnutí dňa bez dojmu výsluchu.',
  },
  {
    title: 'Tínedžer',
    description: 'Dôležitejší je bezpečný tón a rešpekt než množstvo otázok alebo rýchlych rád.',
  },
]

export default async function ProduktyRodicDietaPage({ params }: P) {
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
                Produkty rodič–dieťa
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Produkty pre rodičov, ktorí nechcú čakať, kým sa vzťah s dieťaťom uzavrie do rutiny alebo ticha.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Kartičky, kompasové vety, vekové mapy a tematické indexy. Nie ako náhradné rodičovstvo, ale ako pomoc,
                keď rodič potrebuje jednoduchý a použiteľný vstup do rozhovoru.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/skupiny/rodic-dieta`}>Sekcia rodič–dieťa</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/kompas/rodic-dieta`}>Otvoriť kompas</Link>
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
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Rôzne produkty pre rôzne rodičovské situácie.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {products.map((product) => (
                <Link
                  key={product.title}
                  href={`/${lang}${product.href}`}
                  className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
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
                  <div className="mt-6 text-sm font-medium text-primary">Otvoriť →</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Podľa veku dieťaťa</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">To, čo funguje na škôlkara, nefunguje automaticky na tínedžera.</h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Najjednoduchší štart</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ak dnes potrebuješ pomôcku, nezačínaj dokonalým plánom. Začni jednou použitelnou vetou alebo otázkou.</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Kompas je najrýchlejšia pomoc. Kartičky sú vhodné, keď chceš spoločný rituál. Vekové mapy pomôžu, keď
                  potrebuješ lepšie rozumieť tomu, čo je v danom veku normálne a čo už nie.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/kompas/rodic-dieta`}>Otvoriť kompas</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/skupiny/rodic-dieta`}>Viac o rodič–dieťa</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/indexy/co-trapi-deti`}>Index tém</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
