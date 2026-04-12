import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const categories = [
  {
    title: 'Priame pozvanie',
    desc: 'Jednoduché texty, pri ktorých druhá strana presne vie, čo má urobiť.',
    ideas: [
      { front: 'Oslov ma. :)', back: 'Čo ťa dnes prekvapilo?' },
      { front: 'Opýtaj sa ma niečo.', back: 'Vážne. Kľudne.' },
      { front: 'Porozprávajme sa.', back: 'Nie o počasí.' },
    ],
  },
  {
    title: 'S humorom',
    desc: 'Odľahčené, virálne a vhodné na spontánne stretnutia či komunitné eventy.',
    ideas: [
      { front: 'Toto tričko je icebreaker.', back: 'Funguje. Práve si to dokázal/a.' },
      { front: 'Nemám small talk.', back: 'Len big talk. Poď na to.' },
      { front: 'Nekúsam.', back: 'Oslov ma.' },
    ],
  },
  {
    title: 'Filozofické',
    desc: 'Silnejšia identita značky a texty, ktoré fungujú aj bez vysvetľovania.',
    ideas: [
      { front: 'Realita je lepšia ako obrazovka.', back: 'Odlož telefón. Porozprávajme sa.' },
      { front: 'Jeden rozhovor zmení všetko.', back: 'Možno práve tento.' },
      { front: 'Ľudia sú zaujímavejší ako internet.', back: 'Overené.' },
    ],
  },
  {
    title: 'Otázka priamo na tričku',
    desc: 'Tričko začne rozhovor samo. Človek sa zastaví, prečíta si ho a zareaguje.',
    ideas: [
      { front: 'Čo ťa dnes prekvapilo?', back: 'Odpovedaj nahlas. Som zvedavý/á.' },
      { front: 'Kedy si sa naposledy naozaj zasmial/a?', back: 'Povedz mi ten príbeh.' },
      { front: 'Čo by si urobil/a, keby sa nebál/a?', back: 'Vážne. Čo?' },
    ],
  },
  {
    title: 'Anti-small-talk',
    desc: 'Rebellious línia pre ľudí, ktorých unavuje povrchný automatizmus pri zoznamovaní.',
    ideas: [
      { front: 'Počasie ma nezaujíma.', back: 'Zaujímaš ma ty.' },
      { front: 'V poriadku nie je odpoveď.', back: 'Ako si naozaj?' },
      { front: 'Preskoč small talk.', back: 'Začnime tam, kde to bolí alebo teší.' },
    ],
  },
  {
    title: 'Komunita a hnutie',
    desc: 'Texty pre ľudí, ktorí chcú značku aj hodnotovo reprezentovať navonok.',
    ideas: [
      { front: 'DeepTalks.', back: 'Pretože realita je lepšia ako obrazovka.' },
      { front: 'Offline je nové online.', back: 'deeptalks.eu' },
      { front: 'Ostrov ľudskosti.', back: 'deeptalks.eu/komunita' },
    ],
  },
]

const useCases = [
  'Komunitné eventy, spontánky a stretnutia v mestách',
  'Merch pre organizátorov a ambasádorov značky',
  'QR preklik na komunitu, otázku dňa alebo landing',
  'Malý produkt s veľkou šancou na organické oslovenie',
]

export default async function TrickaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Produkty
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Merch · Tričká
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Tričko tu nie je len obal. Má spustiť kontakt, otázku alebo úsmev ešte skôr, než niekto prehovorí.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Merch DeepTalks má fungovať ako nositeľ značky aj ako mikro-icebreaker v reálnom svete. Vhodné pre komunitu,
                eventy, spontánky aj ľudí, ktorí chcú prirodzene vytvoriť priestor na rozhovor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${lang}/komunita`} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Prepojiť s komunitou
              </Link>
              <Link href={`/${lang}/produkty`} className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                Celá produktová mapa
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prečo merch</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Tričko môže byť QR kód na ľudskosť, nie len logo na hrudi.</h2>
              <div className="mt-6 space-y-3">
                {useCases.map((item) => (
                  <div key={item} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm leading-relaxed text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Produktová logika</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Najlepšie funguje tam, kde sa ľudia už fyzicky stretávajú.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Preto merch prepájam na komunitu, spontánky a akcie. Má dávať zmysel v kontexte živých stretnutí, nie ako izolovaný e-shopový suvenír.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href={`/${lang}/komunita/spontanky`} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                  Spontánky a lokálne stretnutia →
                </Link>
                <Link href={`/${lang}/komunita/akcie`} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                  Akcie a eventy →
                </Link>
                <Link href={`/${lang}/apps/otazka-dna`} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                  Otázka dňa ako QR cieľ →
                </Link>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Textové línie</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Každá línia má iný sociálny efekt.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {categories.map((category) => (
                <div key={category.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-2xl font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.desc}</p>
                  <div className="mt-5 space-y-3">
                    {category.ideas.map((idea) => (
                      <div key={idea.front} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Front</p>
                        <p className="mt-2 text-base font-medium text-foreground">{idea.front}</p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Chrbát</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{idea.back}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
