import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

import quizGameImage from '@/assets/quiz-game.jpg'
import spoznajmeSaImage from '@/assets/spoznajme-sa-cards.jpg'
import hadackaImage from '@/assets/hadacka-game.jpg'
import couplesyncImage from '@/assets/couplesync-app.jpg'
import anoNieHmImage from '@/assets/hadacka-game.jpg'

type P = { params: Promise<{ lang: string }> }

const dailyQuestions = [
  'Čo ťa dnes potešilo — a povedal si to niekomu?',
  'Kedy si sa naposledy naozaj zasmial/a — a s kým?',
  'Čo by si urobil/a inak, keby si vedel/a, že ti to nikto nevyčíta?',
  'Na koho si dnes myslíš a ešte si mu to nepovedal/a?',
]

export default async function AppsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const dict = await getDictionary(lang as Locale)
  const apps = dict.apps
  const games = apps.games

  const availableTools = [
    {
      slug: 'spoznajme-sa',
      catKey: 'cards',
      image: spoznajmeSaImage,
      icon: '🃏',
      audience: ['páry', 'rodina', 'priatelia'],
      status: 'Live',
      description:
        'Otázky, ktoré vás zblížia od ľahkých po hlboké. Online vstup do celého kartičkového systému.',
      href: `/${lang}/apps/spoznajme-sa`,
      cta: 'Vybrať kartičky',
    },
    {
      slug: 'couplesync',
      catKey: 'surveys',
      image: couplesyncImage,
      icon: '💕',
      audience: ['páry'],
      status: 'Live',
      description:
        'Partnerský dotazník. Každý odpovedá sám a až potom sa ukáže, kde ste v zhode a kde mimo.',
      href: `/${lang}/apps/couplesync`,
      cta: 'Vyplniť dotazník',
    },
    {
      slug: 'herd-vote',
      catKey: 'herd-vote',
      image: quizGameImage,
      icon: '🐂',
      audience: ['priatelia', 'rodina', 'tím'],
      status: 'Live',
      title: 'Herd Vote',
      description:
        'Skupinový kvíz s moderátorom a hráčmi cez kód. Silný na event, večer aj teambuilding.',
      href: `/${lang}/herd-vote`,
      cta: 'Otvoriť Herd Vote',
    },
    {
      slug: 'hadacka',
      catKey: 'puzzles',
      image: hadackaImage,
      icon: '🎭',
      audience: ['priatelia', 'rodina'],
      status: 'Live',
      description:
        'Rýchla hra na rozohriatie, odhad a čítanie druhých. Funguje ako ľahký vstup pred hlbším rozhovorom.',
      href: `/${lang}/apps/hadacka`,
      cta: 'Spustiť Hádanku',
    },
    {
      slug: 'ano-nie-hm',
      catKey: 'party',
      image: anoNieHmImage,
      icon: '⏱️',
      audience: ['priatelia', 'rodina'],
      status: 'Live',
      description:
        'Rýchla party hra na tempo, reakciu a spoločnú energiu. Dobrá na prelomenie ľadov ešte pred ťažšími témami.',
      href: `/${lang}/apps/ano-nie-hm`,
      cta: 'Otvoriť hru',
    },
  ]

  const upcomingTools = [
    {
      title: 'Daily Connection',
      icon: '🔥',
      audience: ['páry'],
      status: 'Nové',
      description:
        'Jedna otázka denne pre vás dvoch. Päť minút, ktoré držia blízkosť pri živote aj počas rušných týždňov.',
      href: `/${lang}/apps/daily-connection`,
      cta: 'Otvoriť Daily Connection',
    },
    {
      title: 'Otázka dňa',
      icon: '💬',
      audience: ['páry', 'rodina', 'priatelia'],
      status: 'Lead magnet',
      description:
        'Jeden denný impulz zdarma, ktorý môže otvoriť rozhovor a prirodzene viesť do ďalších DeepTalks vetiev.',
      href: `/${lang}/apps/otazka-dna`,
      cta: 'Pozrieť Otázku dňa',
    },
    {
      title: 'Spomienky — Legacy',
      icon: '📖',
      audience: ['rodina'],
      status: 'Mapa hotová',
      description:
        'Týždenná otázka emailom pre rodiča alebo starého rodiča. Po roku vznikne kniha spomienok.',
      href: `/${lang}/produkty/legacy`,
      cta: 'Pozrieť Legacy',
    },
    {
      title: 'Deep Talk Walk',
      icon: '🚶',
      audience: ['páry', 'priatelia', 'rodina'],
      status: 'Roadmapa',
      description:
        'Audio prechádzka vo dvojici. Hlas vás vedie rozhovorom, keď je jednoduchšie hovoriť v pohybe než oproti sebe.',
      href: `/${lang}/produkty#subscriptions`,
      cta: 'Pozrieť produktovú mapu',
    },
    {
      title: 'Tímový icebreaker',
      icon: '🤝',
      audience: ['tím'],
      status: 'Roadmapa',
      description:
        'Generátor otázok pre porady a teambuildingy. Psychologické bezpečie, ktoré sa dá naštartovať aj v práci.',
      href: `/${lang}/b2b`,
      cta: 'Pozrieť B2B vetvu',
    },
  ]

  const filters = [
    { label: 'Všetko', href: '#dostupne' },
    { label: 'Páry', href: `/${lang}/skupiny/pary` },
    { label: 'Rodina', href: `/${lang}/skupiny/rodic-dieta` },
    { label: 'Priatelia', href: `/${lang}/skupiny/priatelia` },
    { label: 'Tím', href: `/${lang}/b2b` },
  ]

  const availableCount = availableTools.length

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/60 py-24 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl space-y-8">
          <span className="inline-block rounded-full border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {apps.bannerCTA}
          </span>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{apps.bannerTitle}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Hry, kartičky a cvičenia, ktoré vás dostanú od obrazovky späť k sebe. Vyber si podľa situácie, nie podľa náhodného moodu.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card/70 p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Otázka dňa</p>
            <div className="mt-4 space-y-3">
              {dailyQuestions.slice(0, 2).map((question) => (
                <div key={question} className="rounded-2xl border border-border/60 bg-background/80 px-5 py-4 text-left text-lg leading-relaxed text-foreground">
                  „{question}“
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href={`/${lang}/apps/otazka-dna`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Otvoriť Otázku dňa
              </Link>
              <Link
                href={`/${lang}/produkty`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Celá produktová mapa
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Zadarmo · nový denný impulz · môže viesť do Daily Connection aj ďalších vetiev</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Rýchle filtre</p>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Link
                  key={filter.label}
                  href={filter.href}
                  className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>

          <section id="dostupne" className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Dostupné teraz</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Tu sa dá vstúpiť hneď teraz bez čakania.</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Aktuálne je live {availableCount} nástrojov, ktoré pokrývajú kartičky, partnerské zosúladenie, skupinové hry aj ľahké rozohriatie.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {availableTools.map((item) => {
                const g = games[item.slug]
                return (
                  <article
                    key={item.slug}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title ?? g?.name ?? item.slug}
                        width={640}
                        height={320}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-background/85 text-xl backdrop-blur">
                        {item.icon}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-4 p-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{item.title ?? g?.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.audience.map((tag) => (
                          <span key={tag} className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                      >
                        {item.cta}
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ďalšie vetvy</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Tieto produkty už majú svoje miesto v mape, aj keď nie všetky sú hotové ako finálna appka.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {upcomingTools.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.audience.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 text-sm font-medium text-primary">{item.cta} →</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
