import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'Daily Connection | DeepTalks',
  description:
    'Každý deň jedna otázka pre vás dvoch. Odpovedáte oddelene a až potom vidíte partnerovu odpoveď.',
}

const steps = [
  {
    title: 'Spárujete sa',
    description: 'Raz si prepojíte partnera a systém si spojenie zapamätá.',
  },
  {
    title: 'Otázka príde každý deň',
    description: 'Obom príde rovnaká otázka v rovnakom čase.',
  },
  {
    title: 'Odpovedáš sám',
    description: 'Partner tvoju odpoveď nevidí, kým neodošle vlastnú.',
  },
  {
    title: 'Obaja odomknete rozhovor',
    description: 'Až po dvoch odpovediach sa ukáže, kde sa stretávate a kde sa prekvapíte.',
  },
]

const weeklySeries = [
  {
    title: 'Týždeň 1 — Spoznávanie znova',
    questions: [
      'Čo ťa dnes potešilo — a povedal/a si mi to?',
      'Čo ti o mne trvalo dlho pochopiť?',
      'Kedy sa pri mne cítiš najlepšie — a čo tomu predchádza?',
    ],
  },
  {
    title: 'Týždeň 2 — Každodenný život',
    questions: [
      'Čo doma robím, čo ti robí radosť, aj keď to nespomínaš nahlas?',
      'Čo by ti pomohlo, keby som dnes večer urobil/a bez pýtania?',
      'Aký malý rituál by si chcel/a zaviesť len pre nás dvoch?',
    ],
  },
  {
    title: 'Týždeň 3 — Pocity a potreby',
    questions: [
      'Čo ťa teraz v živote najviac unavuje — a hovoril/a si mi to?',
      'Kedy sa cítiš prehliadaný/á, aj keď to tak nemyslím?',
      'Čo potrebuješ odo mňa, keď máš ťažký deň — ticho alebo rozhovor?',
    ],
  },
]

const questionTypes = [
  {
    title: 'Ľahké',
    description: 'Otázky na otvorenie večera a vytvorenie pravidelnosti bez tlaku.',
    sample: 'Čo ťa dnes potešilo a ešte si mi to nepovedal/a?',
  },
  {
    title: 'Stredné',
    description: 'Otázky, ktoré odhaľujú drobné rozdiely v potrebách, rytme a očakávaniach.',
    sample: 'Čo by si chcel/a robiť častejšie, ale niečo ti v tom bráni?',
  },
  {
    title: 'Hlboké',
    description: 'Otázky na pocity, vzťahovú bezpečnosť a tému, ktorú stojí za to otvoriť ďalej.',
    sample: 'Kedy si sa pri mne naposledy cítil/a naozaj pochopený/á?',
  },
]

const plans = [
  {
    badge: 'Zadarmo',
    title: 'Free',
    price: '0 €',
    features: ['1 otázka denne', 'základný streak', 'spoločný rituál bez bariéry'],
  },
  {
    badge: 'Freemium jadro',
    title: 'Daily Connection Premium',
    price: '3–5 € / mesiac',
    features: ['archív otázok', 'tematické série', 'hlbšie follow-up odporúčania'],
  },
]

export default async function DailyConnectionPage({ params }: P) {
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
                Daily Connection
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Každý deň jedna otázka pre vás dvoch. Päť minút, ktoré môžu zmeniť tón celého vzťahu.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Daily Connection je denný mikrorituál pre páry. Každý odpovie sám, až potom sa odomkne odpoveď partnera
                a začne skutočný rozhovor bez ovplyvňovania.
              </p>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Otázka dňa</p>
              <p className="mt-3 text-xl leading-relaxed text-foreground">
                „Čo si dnes robil/a, čo by si chcel/a robiť častejšie — a čo ti v tom v poslednom čase bráni?“
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Partnerovu odpoveď uvidíš až po svojej. Práve to robí z jednoduchej otázky poctivý rozhovor.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Mechanika</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Daily Connection stojí na jednoduchom rytme, nie na komplikovanej disciplíne.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Série otázok</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Otázky môžu ísť po vrstvách, nie náhodne.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {weeklySeries.map((series) => (
                <div key={series.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{series.title}</h3>
                  <div className="mt-4 space-y-3">
                    {series.questions.map((question) => (
                      <div key={question} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-foreground">
                        „{question}“
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Typy otázok</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Nie každý deň potrebuje rovnakú hĺbku.</h2>
              <div className="mt-6 space-y-4">
                {questionTypes.map((type) => (
                  <div key={type.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{type.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">„{type.sample}“</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Freemium model</p>
                <div className="mt-4 space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                        {plan.badge}
                      </span>
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-foreground">{plan.title}</h3>
                        <span className="text-sm font-semibold text-primary">{plan.price}</span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Pre koho to dáva najväčší zmysel</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pre páry, ktoré nechcú čakať na „správny večer“, ale chcú malý každodenný kontakt, ktorý sa dá reálne udržať.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild size="lg">
                    <Link href={`/${lang}/produkty/predplatne`}>Pozrieť predplatné</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${lang}/skupiny/pary`}>Viac pre páry</Link>
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
