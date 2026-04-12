import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const useCases = [
  {
    title: 'Chceme sa pýtať skôr, než bude neskoro',
    desc: 'Najčastejšia motivácia nie je nostalgia. Je to vedomie, že rodinné príbehy sa ľahko stratia, ak ostanú len v hlave.',
  },
  {
    title: 'Medzi generáciami je veľa lásky, ale málo jazyka',
    desc: 'Mladší sa nevedia opýtať, starší nevedia kde začať. DeepTalks tu vytvára most namiesto trápneho ticha.',
  },
  {
    title: 'Seniori nechcú ďalšiu komplikovanú aplikáciu',
    desc: 'Preto Legacy stojí na emaile, jednoduchých otázkach a postupnom rytme, nie na technologickej bariére.',
  },
  {
    title: 'Rodina chce niečo hmatateľné, nie len digitálny archív',
    desc: 'Kniha spomienok dáva celému procesu zmysel, kontinuitu a darčekovú hodnotu.',
  },
]

const tools = [
  {
    badge: 'Hlavná vetva',
    title: 'Legacy Spomienky',
    desc: 'Týždenná otázka emailom pre rodiča alebo starého rodiča. Po roku vznikne kniha spomienok.',
    href: '/produkty/legacy',
  },
  {
    badge: 'Darček',
    title: 'Darčekový poukaz',
    desc: 'Ak nechceš hneď riešiť edíciu a termín, poukaz je jemný vstup do zmysluplného daru.',
    href: '/produkty/darcekovy-poukaz',
  },
  {
    badge: 'Doplňujúci vstup',
    title: 'Kartičkový systém',
    desc: 'Kartičky a konverzačné otázky vedia fungovať aj ako živý most medzi generáciami pri osobných stretnutiach.',
    href: '/produkty/karticky',
  },
  {
    badge: 'Obsahová vetva',
    title: 'Kompas tém',
    desc: 'Pre citlivé rozhovory o pamäti, zdraví, hraniciach a generačných rozdieloch je užitočný aj Kompas.',
    href: '/kompas/temy',
  },
]

const scenarios = [
  'Darček na okrúhle narodeniny rodiča alebo starého rodiča',
  'Projekt pre súrodencov, ktorí chcú zachytiť príbeh rodiny spoločne',
  'Výročie svadby a párový príbeh do knihy',
  'Osobná kniha spomienok pre seba alebo svoje deti',
]

export default async function SenioriPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Skupiny
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Seniori & medzigeneračné mosty
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                „Babka vie veci“ nie je slogan. Je to pripomienka, že rodinné príbehy treba stihnúť zachytiť.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Vetva seniori je o rozhovoroch so starými rodičmi, rodičmi a medzi generáciami. Nerieši len spomínanie, ale aj
                vďačnosť, odkaz, porozumenie a to, ako sa pýtať citlivo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/produkty/legacy`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Otvoriť Legacy
              </Link>
              <Link
                href={`/${lang}/produkty/darcekovy-poukaz`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Darčekový poukaz
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prečo je to dôležité</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Medzigeneračné rozhovory zvyčajne nebrzdí nezáujem. Brzdí ich neistota, kde začať.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {useCases.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kedy sa to hodí</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Táto vetva je silná ako darček, ale ešte silnejšia ako rodinný projekt.</h2>
              <div className="mt-6 space-y-3">
                {scenarios.map((scenario) => (
                  <div key={scenario} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm leading-relaxed text-foreground">
                    {scenario}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prvý krok</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Ak chceš začať hneď, najlepší vstup je Legacy.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Emailový rytmus funguje pre starších ľudí prirodzenejšie než appky. Zároveň dáva rodine dôvod vracať sa k príbehom postupne, bez tlaku na dlhé sedenie.
              </p>
              <Link
                href={`/${lang}/produkty/legacy`}
                className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Pozrieť Legacy detail
              </Link>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Nástroje pre seniorov</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Táto skupina už má konkrétne miesta v DeepTalks mape.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {tools.map((tool) => (
                <Link
                  key={tool.title}
                  href={`/${lang}${tool.href}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                    {tool.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{tool.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                  <div className="mt-5 text-sm font-medium text-primary">Otvoriť →</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
