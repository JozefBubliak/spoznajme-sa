import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'Nezabudni na ňu – malé gestá, veľký vzťah | DeepTalks',
  description:
    'Dostávaj inšpiráciu pre malé gestá lásky prispôsobené tvojmu partnerovi. Nie generické rady — konkrétne tipy podľa jazykov lásky.',
}

const howItWorks = [
  {
    num: '01',
    title: 'Spárujete sa',
    description:
      'Jeden z vás vytvorí párovací kód, druhý ho zadá. Stačí raz a systém si vás zapamätá.',
  },
  {
    num: '02',
    title: 'Nastav si rytmus',
    description:
      'Vyberieš si jazyk lásky a frekvenciu — od jedného po päť tipov týždenne. Systém sa prispôsobí.',
  },
  {
    num: '03',
    title: 'Dostávaš konkrétne nápady',
    description:
      'Nie "buď pozornejší/á" — ale "dnes večer mu/jej uvár čaj bez pýtania". Micro, krátke alebo večerné gestá.',
  },
  {
    num: '04',
    title: 'Označíš ako splnené',
    description:
      'Každé gesto si môžeš označiť. Systém si pamätá históriu a neposiela to isté dvakrát za 3 týždne.',
  },
]

const loveLanguages = [
  {
    key: 'words',
    label: 'Slová uznania',
    icon: '💬',
    example: 'Napíš mu/jej správu, prečo ti dnes ráno záleží na ňom/nej.',
  },
  {
    key: 'time',
    label: 'Spoločný čas',
    icon: '⏱️',
    example: 'Naplánuj spoločnú prechádzku bez telefónu — aj keď len 20 minút.',
  },
  {
    key: 'touch',
    label: 'Fyzický dotyk',
    icon: '🤝',
    example: 'Daj mu/jej dlhší objím, než odíde z domu — dlhší, než obvykle.',
  },
  {
    key: 'gifts',
    label: 'Darčeky',
    icon: '🎁',
    example: 'Kúp mu/jej dnes niečo malé, čo vieš, že má rád/a.',
  },
  {
    key: 'acts',
    label: 'Skutky služby',
    icon: '🛠️',
    example: 'Urob jednu vec z jeho/jej zoznamu úloh skôr, než o to požiada.',
  },
]

const effortBands = [
  {
    band: 'Micro',
    time: '< 5 minút',
    description: 'Správa, gesto, jedno slovo v správny čas. Nepýta si nič iné.',
  },
  {
    band: 'Krátke',
    time: '15 – 30 min',
    description: 'Malý rituál, prechádzka, spoločná káva bez rušenia.',
  },
  {
    band: 'Večerné',
    time: '1 – 2 hodiny',
    description: 'Spoločná aktivita, relaxácia, čas pre vás dvoch.',
  },
  {
    band: 'Celodenné',
    time: 'deň+',
    description: 'Naplánovaný výlet alebo prekvapenie, ktoré si žiada prípravu.',
  },
]

export default async function NudgeLandingPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link
              href={`/${lang}/apps`}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ← Nástroje
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Nezabudni na ňu · Nudge Engine
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Malé gestá, ktoré udržiavajú vzťah živý. Každý deň, bez veľkého premýšľania.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Nudge Engine ti pravidelne pošle konkrétny nápad, ako dnes prejaviť partnerovi lásku —
                prispôsobený jeho jazyku lásky a tvojmu tempu. Nie motivačné citáty. Konkrétne kroky.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Príklad dnešného tipu
              </p>
              <p className="mt-3 text-xl leading-relaxed text-foreground">
                „Keď sa dnes vrátite domov, zastavte sa pri dverách a objímte sa dlhšie, než vám
                príde prirodzene. Bez telefónu, bez otázok čo bolo v práci."
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Fyzický dotyk · Micro gesto · 2 minúty
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/apps/nudge/home`}>Vyskúšať zadarmo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/apps/nezabudni`}>Otvoriť súkromný zápisník</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/skupiny/pary`}>Viac pre páry</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          {/* ── How it works ── */}
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Ako to funguje
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Štyri kroky, ktoré naštartujú návyk bez vôle a disciplíny.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {howItWorks.map((step) => (
                <div
                  key={step.num}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {step.num}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Love languages ── */}
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Jazyky lásky
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Každý partner má iný jazyk. Tipy sa prispôsobia tomu jeho, nie len tomu tvojmu.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {loveLanguages.map((ll) => (
                <div
                  key={ll.key}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ll.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground">{ll.label}</h3>
                  </div>
                  <div className="mt-4 rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Príklad tipu
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      „{ll.example}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Effort bands + CTA ── */}
          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Náročnosť gestá
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                Máš 2 minúty alebo celý večer? Funguje to v oboch prípadoch.
              </h2>
              <div className="mt-6 space-y-4">
                {effortBands.map((band) => (
                  <div
                    key={band.band}
                    className="rounded-2xl border border-border/60 bg-background/70 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-foreground">{band.band}</h3>
                      <span className="text-sm font-semibold text-primary">{band.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {band.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Prečo nie len notifikácie z iných appiek
                </p>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Nudge Engine pozná váš pár — jazyky lásky, históriu odoslaných tipov a to,
                    čo ste si označili ako splnené. Vďaka tomu nikdy nedostanete tip, ktorý ste
                    dostali pred 3 týždňami, ani tip, ktorý nesedí na vášho konkrétneho partnera.
                  </p>
                  <p>
                    Systém strieda novosť a rutinu. Väčšina tipov vychádza z vášho nastavenia,
                    ale každý tretí je zámerne nový — aby vzťah nestagnoval v rovnakých rituáloch.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Pre koho to dáva zmysel
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pre páry, ktoré sa dobre poznajú, ale bez pripomenutia zabudnú na malé
                  prejavy lásky počas rušného týždňa. Nie terapia — skôr priateľský šepot
                  „dnes by to ocenila".
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild size="lg">
                    <Link href={`/${lang}/apps/nudge/home`}>Začať — je to zadarmo</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${lang}/apps/daily-connection`}>
                      Pozrieť Daily Connection
                    </Link>
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
