'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Heart,
  MessageCircleQuestion,
  Sparkles,
  Users,
  Briefcase,
  GraduationCap,
  Trees,
  MapPin,
  MessagesSquare,
  CalendarDays,
} from 'lucide-react'

type MarketingHomePageProps = {
  lang?: string
}

const questionPool = [
  'Co by si mi povedal/a, keby si vedel/a, ze sa nehnevam a nebudem sudit?',
  'Co si si o mne dlho nechaval/a pre seba, lebo si nevedel/a, ako to povedat?',
  'Kedy si sa pri mne naposledy citil/a naozaj v bezpeci?',
  'Aku vetu by si dnes potreboval/a pocut viac nez radu?',
  'Co medzi nami funguje lepsie, nez si bezne pripustame?',
  'Ktora tema sa nam vracia dokola a stale ju obchadzame?',
  'Co by zmenilo dnesny vecer z "ok" na naozaj blizky?',
  'Za co mi chces podakovat, aj ked to znie uplne obycajne?',
  'Co by si si prial/a, aby som si vsimal/a skor?',
  'Kde medzi nami este existuje priestor na vacsiu jemnost?',
]

const problemCards = [
  {
    title: '"Ako ti bolo?" - "Dobre."',
    description: 'Kazdy den ten isty nerozhovor.',
  },
  {
    title: 'Vecer vedla seba, kazdy v telefone',
    description: 'Spolu, ale kazdy v inom svete.',
  },
  {
    title: 'Tinedzer sa zatvara a rodic nevie preco',
    description: 'Stena rastie postupne. A potom uz stoji.',
  },
  {
    title: 'Chcem sa ospravedlnit, neviem ako zacat',
    description: 'Slova cakaju. Chyba len prva veta.',
  },
]

const relationshipAreas = [
  {
    icon: Heart,
    title: 'Pary',
    description: 'Kazdodenne aj hlboke rozhovory, dovera a intimita.',
    href: '/skupiny/pary',
    badge: 'Priorita',
  },
  {
    icon: Users,
    title: 'Rodic a dieta',
    description: 'Od prvych emocii po citlive rozhovory s teenagerom.',
    href: '/skupiny/rodic-dieta',
    badge: 'Priorita',
  },
  {
    icon: Sparkles,
    title: 'Priatelia',
    description: 'Anti-small-talk. Otazky, ktore spravia zo znamych blizkych ludi.',
    href: '/skupiny/priatelia',
  },
  {
    icon: Briefcase,
    title: 'Praca',
    description: 'Psychologicke bezpecie, hranice a lepsia timova komunikacia.',
    href: '/skupiny/praca',
  },
  {
    icon: GraduationCap,
    title: 'Skola',
    description: 'Trieda ako komunita. Rozhovory, ktore pomahaju ucit aj patrit.',
    href: '/skupiny/skola',
  },
  {
    icon: Trees,
    title: 'Seniori',
    description: 'Pribehy, spomienky a mosty medzi generaciami.',
    href: '/skupiny/seniori',
  },
]

const tools = [
  {
    featured: true,
    badge: 'Nove · Zadarmo',
    title: 'Daily Connection',
    description: 'Kazdy den jedna otazka pre vas dvoch. Odpovedas sam/a, potom objavis partnerovu odpoved.',
    meta: 'Pary · 5 minut denne · streak',
    href: '/apps/couplesync',
    cta: 'Vyskusat',
  },
  {
    badge: 'Zadarmo',
    title: 'Komunikacny kompas',
    description: 'Konkretne vety pre 100+ situacii, ked nevies ako zacat.',
    meta: 'Vsetky skupiny · hned pouzitelne',
    href: '/kompas',
    cta: 'Otvorit',
  },
  {
    badge: 'Online + fyzicke',
    title: 'Konverzacne karticky',
    description: 'Otazky v roznych urovniach pre partnerov, priatelov aj rodiny.',
    meta: 'Karticky · stolova atmosfera',
    href: '/apps/spoznajme-sa',
    cta: 'Vybrat',
  },
  {
    badge: 'Zadarmo',
    title: 'CoupleSync',
    description: 'Otazky o hodnotach, hraniciach a buducnosti s odhalenim zhody.',
    meta: 'Pary · 300+ tem',
    href: '/apps/couplesync',
    cta: 'Vyplnit',
  },
  {
    badge: 'Skupinove',
    title: 'Herd Vote a Hadajka',
    description: 'Hrave formaty pre partiu, tim alebo event, kde sa kazdy zapoji.',
    meta: 'Priatelia · eventy · timy',
    href: '/apps',
    cta: 'Pozriet hry',
  },
  {
    badge: 'Predplatne',
    title: 'Legacy Spomienky',
    description: 'Tyzdenne otazky emailom a pribeh, z ktoreho raz vznikne kniha spomienok.',
    meta: 'Rodina · seniori · darcek',
    href: '/produkty/predplatne',
    cta: 'Zistit viac',
  },
]

const communityItems = [
  {
    icon: CalendarDays,
    title: 'Akcie a stretnutia',
    description: 'Opekacky, vylety, Blind Talk a dalsie formaty v mestach napriec Slovenskom.',
    href: '/komunita/akcie',
  },
  {
    icon: MapPin,
    title: 'Spontanky',
    description: '"Ideme tam, pridajte sa." Rychle lokalne stretnutia bez zbytocnej organizacie.',
    href: '/komunita/spontanky',
  },
  {
    icon: MessagesSquare,
    title: 'Organizuj vlastne stretnutie',
    description: 'Pomoc s grafikou, kartickami aj tym, ako prilakat ludi vo svojom meste.',
    href: '/komunita/organizuj',
  },
]

const stories = [
  {
    quote: 'Prvykrat po rokoch sme sa s dcerou rozpravali celu noc. Jedna otazka otvorila dvere, na ktore sme uz skoro zabudli.',
    author: 'Marta, Bratislava',
  },
  {
    quote: 'Z Daily Connection sa stal nas vecerny ritual. Pat minut denne spravilo viac nez dalsi serial.',
    author: 'Jana a Peter, Zilina',
  },
  {
    quote: 'Karticky na stole pred workshopom a za pol hodinu padli veci, ktore by inak nezazneli cele mesiace.',
    author: 'Lucia, HR manazerka',
  },
]

export default function MarketingHomePage({ lang = 'sk' }: MarketingHomePageProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuestionIndex((current) => (current + 1) % questionPool.length)
    }, 8000)

    return () => window.clearInterval(interval)
  }, [])

  const currentQuestion = questionPool[questionIndex]
  const currentStory = stories[storyIndex]

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border px-6 pb-20 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.18),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(197,168,128,0.1),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                DeepTalks · Slovensko
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">
                  Pretoze realita je lepsia
                  <br />
                  <span className="gradient-text italic">ako obrazovka.</span>
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Nastroje, otazky a komunita pre ludi, ktori chcu mat hlbsie vztahy
                  v rodine, vztahu, praci aj priatelstve.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-primary">500+</div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">Otazok a situacii</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-primary">6</div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">Skupin vztahov</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-primary">SK · UA</div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">Bilingvalne</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="text-2xl font-semibold text-primary">100%</div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">Zadarmo zacat</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${lang}/kompas`}
                  className="btn-hero inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
                >
                  Vyskusaj otazku dna
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${lang}/apps`}
                  className="btn-warm inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
                >
                  Pozriet nastroje
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="card-connection overflow-hidden rounded-[28px] p-1">
                <div className="rounded-[24px] border border-white/5 bg-black/40 p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                        Otazka dna
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Klikni a rotuj dalsie inspiracie
                      </p>
                    </div>
                    <MessageCircleQuestion className="h-8 w-8 text-primary/80" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuestionIndex((current) => (current + 1) % questionPool.length)}
                    className="w-full rounded-[22px] border border-primary/15 bg-primary/5 p-6 text-left transition hover:border-primary/35 hover:bg-primary/10"
                  >
                    <p className="text-2xl leading-snug text-foreground sm:text-[1.9rem]">
                      &ldquo;{currentQuestion}&rdquo;
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Tato otazka je zadarmo. Dalsie najdes v Kompase a nastrojoch pre pary, rodiny aj priatelov.
                    </p>
                  </button>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={`/${lang}/kompas`}
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                    >
                      Otvorit Kompas
                    </Link>
                    <Link
                      href={`/${lang}/apps/spoznajme-sa`}
                      className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                    >
                      Pustit karticky
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="label-gold">Preco DeepTalks</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Hovorime viac
              <br />
              <span className="text-muted-foreground italic">ako kedykolvek predtym.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A predsa sa citime osameli. Sme v jednej miestnosti, ale kazdy v inom svete.
              DeepTalks pomaha vratit ludi k realnej komunikacii.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {problemCards.map((card) => (
              <article key={card.title} className="card-elegant min-h-[190px] p-6">
                <p className="text-xl leading-snug text-foreground">{card.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="label-gold">Pre koho</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Pre kazdy
              <br />
              <span className="gradient-text">dolezity vztah.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Iny vztah, ine napatie, iny jazyk. Vyber si skupinu a dostanes obsah,
              ktory sedi na realne situacie.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relationshipAreas.map((area) => (
              <Link
                key={area.title}
                href={`/${lang}${area.href}`}
                className="card-elegant group block p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <area.icon className="h-6 w-6" />
                  </div>
                  {area.badge ? (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {area.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl text-foreground transition group-hover:text-primary">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Zistit viac
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="label-gold">Nastroje</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Zacni hned,
              <br />
              <span className="gradient-text">zadarmo.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Bez zbytocnej bariery. Vyber si format, ktory vam sadne dnes vecer,
              pri stole, na prechadzke alebo vo dvojici.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={`/${lang}${tool.href}`}
                className={`group rounded-[24px] border p-6 transition ${
                  tool.featured
                    ? 'border-primary/30 bg-primary/10 shadow-[0_12px_40px_rgba(197,168,128,0.12)] xl:col-span-2'
                    : 'card-elegant'
                }`}
              >
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-primary/20 bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {tool.badge}
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary/80 transition group-hover:translate-x-1" />
                  </div>
                  <div className="space-y-3">
                    <h3 className={`leading-tight ${tool.featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                      {tool.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{tool.meta}</p>
                    <span className="text-sm font-medium text-primary">{tool.cta}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl space-y-4">
            <p className="label-gold">Komunita</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              Ostrov ludskosti
              <br />
              <span className="text-muted-foreground italic">uprostred digitalneho chaosu.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              DeepTalks nie je len web. Je to siet stretnuti, mikroformatov a ludi,
              ktori chcu byt viac spolu offline.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {communityItems.map((item) => (
              <Link key={item.title} href={`/${lang}${item.href}`} className="card-elegant group block p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl text-foreground transition group-hover:text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Otvorit
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-8 text-center">
          <div className="space-y-4">
            <p className="label-gold">Ludia hovoria</p>
            <h2 className="text-4xl sm:text-5xl">Pribehy z realneho zivota</h2>
          </div>

          <blockquote className="card-connection rounded-[28px] p-8 sm:p-10">
            <p className="text-2xl leading-relaxed text-foreground sm:text-3xl">
              &ldquo;{currentStory.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {currentStory.author}
            </footer>
          </blockquote>

          <div className="flex justify-center gap-3">
            {stories.map((story, index) => (
              <button
                key={story.author}
                type="button"
                onClick={() => setStoryIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  storyIndex === index ? 'w-10 bg-primary' : 'w-2.5 bg-primary/30'
                }`}
                aria-label={`Pribeh ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.2),transparent_42%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-3xl leading-relaxed text-foreground sm:text-5xl">
            &ldquo;Sme hyperprepojeni a napriek tomu osameli. Jeden uprimny rozhovor
            zmeni viac ako tisic lajkov.&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            DeepTalks nie je terapia. Je to jemny, prakticky sprievodca zranitelnostou,
            ked chces prestat obchadzat to podstatne.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/${lang}/kompas`}
              className="btn-hero inline-flex items-center justify-center gap-2 px-8 py-4 text-base"
            >
              Jedna otazka na dnesny vecer
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/o-nas`}
              className="btn-warm inline-flex items-center justify-center px-8 py-4 text-base"
            >
              Citat manifest
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span className="text-lg font-semibold">DeepTalks</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Pretoze realita je lepsia ako obrazovka. Nastroje, otazky a komunita
              pre lepsie rozhovory.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Nastroje</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${lang}/kompas`} className="block text-muted-foreground transition hover:text-foreground">Kompas</Link>
              <Link href={`/${lang}/apps/spoznajme-sa`} className="block text-muted-foreground transition hover:text-foreground">Karticky</Link>
              <Link href={`/${lang}/apps/couplesync`} className="block text-muted-foreground transition hover:text-foreground">CoupleSync</Link>
              <Link href={`/${lang}/apps`} className="block text-muted-foreground transition hover:text-foreground">Dalsie hry</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Oblasti</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${lang}/skupiny/pary`} className="block text-muted-foreground transition hover:text-foreground">Pary</Link>
              <Link href={`/${lang}/skupiny/rodic-dieta`} className="block text-muted-foreground transition hover:text-foreground">Rodic a dieta</Link>
              <Link href={`/${lang}/skupiny/priatelia`} className="block text-muted-foreground transition hover:text-foreground">Priatelia</Link>
              <Link href={`/${lang}/skupiny/praca`} className="block text-muted-foreground transition hover:text-foreground">Praca</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Projekt</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${lang}/o-nas`} className="block text-muted-foreground transition hover:text-foreground">Preco hovorit</Link>
              <Link href={`/${lang}/komunita`} className="block text-muted-foreground transition hover:text-foreground">Komunita</Link>
              <Link href={`/${lang}/b2b`} className="block text-muted-foreground transition hover:text-foreground">B2B</Link>
              <Link href={`/${lang}/produkty`} className="block text-muted-foreground transition hover:text-foreground">Produkty</Link>
              <Link href={`/${lang}/kontakt`} className="block text-muted-foreground transition hover:text-foreground">Kontakt</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} DeepTalks · Vsetky prava vyhradene.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="transition hover:text-foreground">Sukromie</Link>
              <Link href="/terms" className="transition hover:text-foreground">Podmienky</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
