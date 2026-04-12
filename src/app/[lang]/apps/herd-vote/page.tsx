import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const contexts = ['Rodinná večera', 'Opekačka s priateľmi', 'Firemný teambuilding', 'Výlet', 'Vianoce', 'Trieda v škole']

const categories = [
  {
    title: 'Rodina',
    description: 'Spomienky, tradície, detstvo a to, čo si o sebe myslíme, že už dávno vieme.',
    sample: 'Čo robil náš rodič ako prvú vec každé ráno, keď sme boli malí?',
  },
  {
    title: 'Páry',
    description: 'Láskavé aj prekvapivé otázky, ktoré ukážu, ako dobre sa naozaj poznáte.',
    sample: 'Čo by si partner/ka objednal/a v reštaurácii, kde ešte nikdy nebol/a?',
  },
  {
    title: 'Priatelia',
    description: 'Večerný formát pre skupiny, ktoré sa chcú zabaviť aj trochu odhaliť.',
    sample: 'Čo by tvoj kamarát urobil ako prvé, keby vyhral milión eur?',
  },
  {
    title: 'Tím / práca',
    description: 'Psychologicky bezpečné otázky na spoznávanie kolegov a icebreaker bez trápnosti.',
    sample: 'Čo robil tento kolega pred tým, ako nastúpil do súčasnej práce?',
  },
  {
    title: 'Škola',
    description: 'Pre triedy a detské skupiny. Ľahké, zrozumiteľné a bez vylučovania.',
    sample: 'Akú superschopnosť by si asi vybral tvoj spolužiak?',
  },
  {
    title: 'Zmiešané skupiny',
    description: 'Pre partie, ktoré sa ešte dobre nepoznajú, ale chcú sa rýchlo rozhýbať.',
    sample: 'Čo by táto osoba robila, keby mala celý deň bez povinností len pre seba?',
  },
]

const modes = [
  {
    badge: 'Zadarmo',
    title: 'Klasický mód',
    description: 'Moderátor vytvorí lobby, pošle kód a hráči sa pripájajú na mobile.',
    href: '/apps/herd-vote/admin',
  },
  {
    badge: 'Zadarmo',
    title: 'Rýchly mód',
    description: 'Jeden telefón, otázky na obrazovke a odpovede nahlas. Ideálne pre 2–4 ľudí bez techniky.',
  },
  {
    badge: 'Premium',
    title: 'Vlastné otázky',
    description: 'Pre eventy, firmy a školy, ktoré chcú do hry pridať vlastný obsah a kontext.',
  },
  {
    badge: 'Premium',
    title: 'Turnaj',
    description: 'Viac kôl, finále a väčší dramatický oblúk pre väčšie skupiny alebo eventy.',
  },
]

const flow = [
  'Vyber kategóriu a mód hry',
  'Moderátor vytvorí lobby alebo spustí rýchly mód',
  'Hráči odpovedajú na telefónoch alebo nahlas',
  'Výsledky sa porovnajú v reálnom čase',
  'Skupina si odnesie smiech, prekvapenia a témy na ďalší rozhovor',
]

const scoreboard = [
  { name: 'Marta', score: '11 b.' },
  { name: 'Peter', score: '9 b.' },
  { name: 'Zuzka', score: '7 b.' },
  { name: 'Tomáš', score: '5 b.' },
]

export default async function HerdVotePage({ params }: P) {
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
                Herd Vote
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Otestujte, ako dobre sa navzájom poznáte. Nie ako kvíz na fakty, ale ako hra na odhad ľudí.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Herd Vote je skupinová hra pre rodiny, páry, priateľov, školy aj tímy. Moderátor spustí hru, ostatní sa
                pripoja cez kód a odpovede ukážu, kto vie o druhých najviac.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {contexts.map((context) => (
                <span key={context} className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                  {context}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/apps/herd-vote/admin`}>Vytvoriť lobby</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/b2b`}>Pre firmy a školy</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Krok 1</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Vyber kategóriu otázok, aby hra sedela na skupinu aj náladu.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <div key={category.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                  <div className="mt-5 rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ukážka otázky</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">„{category.sample}“</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Krok 2</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Zvoľ mód hry podľa situácie.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {modes.map((mode) => {
                const card = (
                  <div className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                      {mode.badge}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{mode.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mode.description}</p>
                    <div className="mt-5 text-sm font-medium text-primary">
                      {mode.href ? 'Otvoriť →' : 'Plánovaný rozvoj'}
                    </div>
                  </div>
                )

                if (!mode.href) return <div key={mode.title}>{card}</div>

                return (
                  <Link key={mode.title} href={`/${lang}${mode.href}`} className="block h-full">
                    {card}
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako to funguje</p>
              <div className="mt-6 space-y-4">
                {flow.map((item, index) => (
                  <div key={item} className="grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 sm:grid-cols-[44px_1fr] sm:items-start">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ukážka výsledku</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Po hre ostane viac než poradie.</h2>
              <div className="mt-6 space-y-4">
                {scoreboard.map((player, index) => (
                  <div key={player.name} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{player.name}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Miesto {index + 1}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">{player.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground">
                Výsledková obrazovka môže prirodzene viesť ďalej: hrať znova, zdieľať výsledok alebo prejsť na kartičky a
                hlbší rozhovor.
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
