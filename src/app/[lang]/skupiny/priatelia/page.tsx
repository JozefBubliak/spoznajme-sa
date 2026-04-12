import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const moments = [
  {
    title: 'Večer, keď už nechceš ďalší small talk',
    description: 'Najprv ľahké a vtipné otázky, potom spomienky, sny a veci, ktoré medzi vami doteraz len plávali vo vzduchu.',
  },
  {
    title: 'Priateľstvo po ťažšom období',
    description: 'Keď sa medzi vás dostalo ticho, sklamanie alebo vzdialenosť a chcete sa k sebe vrátiť bez umelých fráz.',
  },
  {
    title: 'Nová partia alebo zmiešaná skupina',
    description: 'DeepTalks funguje aj tam, kde sa ľudia ešte len spoznávajú a nechcú sa cítiť trápne.',
  },
]

const tracks = [
  {
    title: 'Zábava a ľahký vstup',
    points: 'Anti-small-talk kartičky, Hádanka alebo Herd Vote ako prvé zahriatie skupiny.',
  },
  {
    title: 'Skutočné spomienky',
    points: 'Otázky o tom, čo vás formovalo, čo si o sebe pamätáte a čo ste si o sebe možno zle vysvetlili.',
  },
  {
    title: 'Sny, hodnoty, smer',
    points: 'Keď už nejde len o večer, ale o to, kým sa pri sebe stávate.',
  },
]

const tools = [
  {
    title: 'Kartičky pre priateľov',
    description: 'Najprirodzenejší vstup do večera. Fungujú v dvojici aj v partii.',
    href: '/apps/spoznajme-sa',
    cta: 'Otvoriť kartičky',
  },
  {
    title: 'Herd Vote',
    description: 'Skupinová hra na odhad druhých. Výborný most od smiechu k hlbšiemu rozhovoru.',
    href: '/apps/herd-vote',
    cta: 'Spustiť Herd Vote',
  },
  {
    title: 'Spontánky',
    description: 'Ak sa nechcete len rozprávať online, ale aj reálne stretnúť, výjsť von alebo niečo zorganizovať.',
    href: '/komunita/spontanky',
    cta: 'Pozrieť Spontánky',
  },
]

const prompts = [
  'Ktorý tvoj zvyk som si na tebe všimol skôr než ty sám?',
  'Kedy si sa pri mne cítil naozaj prijatý?',
  'Čo by sme mali ešte spolu zažiť, kým budeme starí a príliš pohodlní?',
]

export default async function PriateliaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.13),transparent_58%)] px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Skupiny
          </Link>
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Priatelia
            </span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Anti-small-talk pre ľudí, ktorých máš rád, ale nechceš s nimi zostať len pri povrchu.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Priateľstvá neumierajú len konfliktom. Často skôr tým, že sa roky rozprávame len o logistike, práci a tom, čo je nové.
              DeepTalks vracia do partie zvedavosť, humor aj skutočné prepojenie.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/apps/spoznajme-sa`}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Kartičky pre priateľov
            </Link>
            <Link
              href={`/${lang}/apps/herd-vote`}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              Herd Vote pre partiu
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-5 md:grid-cols-3">
            {moments.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako ísť hlbšie</p>
              <div className="mt-6 space-y-4">
                {tracks.map((item, index) => (
                  <div key={item.title} className="grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 sm:grid-cols-[44px_1fr]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.points}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ukážky otázok</p>
              <div className="mt-5 space-y-4">
                {prompts.map((prompt) => (
                  <div key={prompt} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-foreground">
                    „{prompt}“
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Nástroje</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Vyber si vstup podľa energie vašej skupiny.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.title} className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{tool.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                  <Link href={`/${lang}${tool.href}`} className="mt-5 text-sm font-medium text-primary">
                    {tool.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
