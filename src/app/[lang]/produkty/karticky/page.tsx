import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const editions = [
  {
    name: 'Páry & manželia',
    badge: 'Dostupné',
    desc: 'Tri úrovne hĺbky, 60 kariet a prompt cards pre páry, ktoré chcú ísť od každodennosti k skutočnej blízkosti.',
    meta: 'Fyzická edícia + online nadväznosť',
    href: '/produkty/pary',
  },
  {
    name: 'Rodič–dieťa',
    badge: 'Dostupné',
    desc: 'Verzie podľa veku, bezpečné štarty rozhovoru a kartičky pre rodičov, ktorí nechcú tlačiť ani moralizovať.',
    meta: 'Fyzická edícia + kompas + vekové situácie',
    href: '/produkty/rodic-dieta',
  },
  {
    name: 'Priatelia',
    badge: 'Plánované',
    desc: 'Anti-small-talk edícia na večer, výlet či spoločný byt. Od zábavných vstupov po zraniteľné otázky.',
    meta: '55 kariet · spoločenská vetva',
  },
  {
    name: 'Práca & tím',
    badge: 'Plánované',
    desc: 'Icebreakery, psychologické bezpečie a otázky, ktoré v tíme robia z kolegov znova ľudí.',
    meta: 'B2B edícia pre firmy a workshopy',
    href: '/b2b',
  },
  {
    name: 'Starí rodičia & vnuci',
    badge: 'Plánované',
    desc: 'Legacy línia pre spomienky, rodinné príbehy a rozhovory, ktoré je dobré stihnúť včas.',
    meta: 'Medzigeneračná a darčeková edícia',
  },
  {
    name: 'Páry — hlboká edícia',
    badge: 'Plánované',
    desc: 'Intimita, sexualita, strach, sny a témy, ktoré si žiadajú väčšiu citlivosť aj väčšiu hĺbku.',
    meta: '18+ rozšírenie pre páry',
  },
  {
    name: 'Cudzinci → priatelia',
    badge: 'Plánované',
    desc: 'Bilingválna SK/UA línia pre zoznamovanie, nové komunity, susedov a bezpečný prvý kontakt.',
    meta: 'Komunitná a eventová edícia',
  },
]

const levels = [
  {
    title: 'Ľahké vstupy',
    desc: 'Otázky, ktoré znižujú trému a pomáhajú ľuďom vôbec začať.',
  },
  {
    title: 'Stredná hĺbka',
    desc: 'Príbehy, hodnoty, spomienky a veci, ktoré sa bežne vynoria až neskôr.',
  },
  {
    title: 'Hlboké karty',
    desc: 'Zraniteľnejšie témy, budúcnosť, konflikty, intimita a citlivé body vzťahu.',
  },
]

const mechanics = [
  {
    title: 'Prompt cards',
    desc: 'Špeciálne karty, ktoré menia spôsob odpovedania. Namiesto ďalšej otázky zmenia energiu rozhovoru.',
  },
  {
    title: 'Wildcardy',
    desc: 'Akcia, gesto, ticho alebo pohyb. Nie všetko musí ísť cez slová, niektoré karty majú fungovať aj bez nich.',
  },
  {
    title: 'Online a fyzický most',
    desc: 'Digitálne kartičky sú mäkký vstup. Fyzické edície sú rituál, darček a produkt, ku ktorému sa ľudia vracajú offline.',
  },
]

export default async function KartickyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">← Produkty</Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Kartičkový systém
          </div>
          <h1 className="text-4xl font-bold text-foreground">Konverzačné kartičky DeepTalks</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Nie jedna hra, ale celý systém edícií. Online vstup pre každého, fyzické balíčky pre páry a rodiny, plánované línie
            pre priateľov, tímy aj medzigeneračné rozhovory.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/apps/spoznajme-sa`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              Online kartičky
            </Link>
            <Link href={`/${lang}/produkty/pary`} className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted">
              Kartičky pre páry
            </Link>
            <Link href={`/${lang}/b2b/dopyt`} className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted">
              Bulk objednávka (B2B)
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako sú poskladané</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Každá edícia stojí na rovnakom princípe: ľahký vstup, rastúca hĺbka, bezpečný rámec.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {levels.map((level) => (
                <div key={level.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{level.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{level.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Edície</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Nie všetko musí byť dostupné hneď, ale každá vetva už má svoje miesto v mape.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {editions.map((edition) => {
                const content = (
                  <div className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                        {edition.badge}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{edition.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{edition.desc}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">{edition.meta}</p>
                    <div className="mt-5 text-sm font-medium text-primary">
                      {edition.href ? 'Otvoriť vetvu →' : 'Zaradené v roadmape'}
                    </div>
                  </div>
                )

                if (!edition.href) {
                  return <div key={edition.name}>{content}</div>
                }

                return (
                  <Link key={edition.name} href={`/${lang}${edition.href}`} className="block h-full">
                    {content}
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Mechanika navyše</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Kartičky nemajú byť len zoznam otázok. Majú meniť rytmus rozhovoru.</h2>
              <div className="mt-6 space-y-4">
                {mechanics.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prepojenia</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Kartičkový systém sa prepája s ostatnými DeepTalks vetvami.</h2>
              <div className="mt-6 space-y-3">
                <Link
                  href={`/${lang}/apps/spoznajme-sa`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Online kartičky</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/produkty/pary`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Fyzická edícia pre páry</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/produkty/rodic-dieta`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Fyzická edícia rodič–dieťa</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/${lang}/b2b`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>Firemné a školské využitie</span>
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
