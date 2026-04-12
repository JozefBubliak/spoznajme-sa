import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'CoupleSync – vzťahový dotazník | DeepTalks',
  description:
    'Partnerský dotazník, v ktorom odpovedáte oddelene a až potom vidíte, kde ste si blízki a kde sa líšite.',
}

const situations = [
  {
    title: 'Nové páry',
    description: 'Pre dvojice, ktoré sa chcú spoznať hlbšie skôr, než sa začnú spoliehať na domnienky.',
    meta: '45 otázok · približne 20 minút',
  },
  {
    title: 'Dlhodobý vzťah',
    description: 'Keď ste spolu roky, ale niektoré témy ste stále len obchádzali alebo odkladali.',
    meta: '80 otázok · približne 35 minút',
  },
  {
    title: 'Pred svadbou alebo veľkým rozhodnutím',
    description: 'Deti, bývanie, financie, hodnoty a budúcnosť. Témy, ktoré sa oplatí vidieť ešte pred záväzkom.',
    meta: '100 otázok · približne 45 minút',
  },
  {
    title: 'Po napätí alebo v ťažšom období',
    description: 'Keď cítite vzdialenosť a potrebujete odhaliť, v čom sa naozaj rozchádzate.',
    meta: '60 otázok · približne 25 minút',
  },
]

const topics = [
  {
    title: 'Každodenný život',
    description: 'Rutiny, poriadok, čas pre seba, bežný chod domácnosti.',
    sample: 'Kto z vás zvyčajne rozhoduje, čo sa bude večer diať?',
  },
  {
    title: 'Financie',
    description: 'Spoločný účet, úspory, míňanie, dlhodobé finančné ciele.',
    sample: 'Mali by sme mať skôr spoločný alebo oddelený účet?',
  },
  {
    title: 'Rodina a deti',
    description: 'Deti, výchova, svokrovci, miesto širšej rodiny vo vašom živote.',
    sample: 'Ako si predstavuješ, že budeme raz nastavovať pravidlá pre deti?',
  },
  {
    title: 'Intimita a blízkosť',
    description: 'Citlivá, ale kľúčová oblasť: potreby, bezpečie a komunikácia o blízkosti.',
    sample: 'Čo ti dáva najjasnejší pocit, že si naozaj milovaný/á?',
  },
  {
    title: 'Budúcnosť a sny',
    description: 'Bývanie, kariéra, životný štýl, sny a smer, ktorým sa chcete vydať.',
    sample: 'Kde si predstavuješ, že budeme žiť o desať rokov?',
  },
  {
    title: 'Hodnoty',
    description: 'To, čo považujete za dôležité, správne a nevyjednateľné.',
    sample: 'Čo je pre teba v živote tak dôležité, že by si kvôli tomu spravil/a veľkú zmenu?',
  },
  {
    title: 'Konflikty',
    description: 'Ako sa hádate, čo potrebujete po konflikte a čo vás eskaluje.',
    sample: 'Keď sa pohádame, potrebuješ skôr priestor alebo okamžité zmierenie?',
  },
  {
    title: 'Jazyky lásky',
    description: 'Ako spoznávate starostlivosť, lásku a pozornosť v každodennom živote.',
    sample: 'Kedy sa pri mne cítiš najviac videný/á a cenený/á?',
  },
  {
    title: 'Minulosť a príbehy',
    description: 'Detstvo, rodinné vzorce, formujúce udalosti a príbehy, ktoré si nesieme.',
    sample: 'Čo z tvojho detstva dnes najviac ovplyvňuje to, ako miluješ a dôveruješ?',
  },
]

const results = [
  {
    area: 'Každodenný život',
    score: '92 % zhoda',
    note: 'Veľmi podobné návyky a rytmus. Toto je vaša stabilná zóna.',
  },
  {
    area: 'Jazyky lásky',
    score: '87 % zhoda',
    note: 'Dobre sa rozumiete v tom, čo každému z vás pomáha cítiť blízkosť.',
  },
  {
    area: 'Rodina a deti',
    score: '74 % zhoda',
    note: 'Dobrá báza, ale zopár miest si pýta poctivý rozhovor bez stresu.',
  },
  {
    area: 'Financie',
    score: '58 % zhoda',
    note: 'Výrazný rozdiel v prístupe k peniazom. Ideálna téma na ďalší krok s kartičkami alebo vedeným rozhovorom.',
  },
]

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/apps`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Nástroje
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                CoupleSync
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Partnerský dotazník, v ktorom odpovedáte každý sám. Až potom zistíte, kde ste si blízki a kde sa míňate.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                CoupleSync nie je rýchly kvíz. Je to bezpečný vstup do tém, o ktorých páry často tušia, že sú dôležité,
                ale nevedia, ako ich otvoriť bez obrany alebo ovplyvňovania.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-sm font-semibold text-foreground">1. Každý odpovedá sám</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Partnerove odpovede nevidíš, kým neodošleš svoje.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-sm font-semibold text-foreground">2. Vidíte mapu zhôd a rozdielov</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nie len jednu známku, ale konkrétne oblasti, kde sa oplatí pokračovať.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
                <div className="text-sm font-semibold text-foreground">3. Výsledok vedie ďalej</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Na citlivé oblasti nadviažeš kartičkami, ďalšou sériou alebo pravidelným rituálom.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="https://couplesync.deeptalks.eu">Otvoriť aktuálnu verziu</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/skupiny/pary`}>Sekcia pre páry</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Vyber situáciu</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Dotazník má najväčší zmysel vtedy, keď vieš, prečo ho práve teraz otvárate.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {situations.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.meta}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Tematické oblasti</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Deväť oblastí, ktoré odhalia, či sa len máte radi, alebo si naozaj rozumiete.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {topics.map((topic) => (
                <div key={topic.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                  <div className="mt-5 rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ukážka otázky</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">„{topic.sample}“</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ukážka výsledku</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Výsledok nie je len percento. Je to mapa oblastí, ktoré si zaslúžia rozhovor.</h2>
              <div className="mt-6 space-y-4">
                {results.map((item) => (
                  <div key={item.area} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-foreground">{item.area}</h3>
                      <span className="text-sm font-semibold text-primary">{item.score}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prečo to funguje</p>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Najväčšia sila CoupleSync je v tom, že znižuje ovplyvňovanie. Každý partner sa najprv stretne sám so
                    sebou a až potom so spoločným obrazom.
                  </p>
                  <p>
                    Výsledkom nie je „kto má pravdu“, ale zrozumiteľný prehľad tém, kde sa oplatí ísť ďalej citlivo a
                    konkrétne.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Ďalší krok po výsledku</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Keď objavíte citlivé miesto, nenechajte ho visieť vo vzduchu.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Na oblasti, kde sa líšite, môže plynulo nadviazať Kompas, kartičky alebo pravidelný návyk v Daily Connection.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild size="lg">
                    <Link href="https://couplesync.deeptalks.eu">Spustiť CoupleSync</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${lang}/apps/daily-connection`}>Pozrieť Daily Connection</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${lang}/apps/spoznajme-sa`}>Konverzačné kartičky</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
