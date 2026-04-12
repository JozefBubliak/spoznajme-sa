import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const pillars = [
  {
    title: 'Psychologická bezpečnosť',
    description: 'Ľudia nemusia byť rovnakí, ale musia mať pocit, že môžu hovoriť bez poníženia alebo trestu.',
  },
  {
    title: 'Spätná väzba bez obrany',
    description: 'Dobré otázky vedia zmeniť tón porady aj rozhovoru 1:1 rýchlejšie než ďalší firemný slogan.',
  },
  {
    title: 'Vzťahy, nie len proces',
    description: 'Tím nefunguje dobre len preto, že má task board. Funguje, keď si ľudia vedia dôverovať a rozumieť.',
  },
]

const situations = [
  'Onboarding nového človeka do tímu',
  'Napätie medzi oddeleniami alebo rolami',
  'Retrospektíva po náročnom období',
  'Porada, kde sú všetci fyzicky prítomní, ale mentálne inde',
]

const offers = [
  {
    title: 'Kartičky pre tímy',
    description: 'Nízko-prahový nástroj na porady, workshopy a pravidelné tímové check-iny.',
    href: '/b2b',
    cta: 'Pozrieť B2B vetvu',
  },
  {
    title: 'Herd Vote pre firmy',
    description: 'Icebreaker, ktorý je hravý, ale stále pomáha ľuďom čítať sa navzájom a prirodzene sa rozprávať.',
    href: '/apps/herd-vote',
    cta: 'Pozrieť Herd Vote',
  },
  {
    title: 'Workshop a facilitácia',
    description: 'Keď nestačí len produkt, ale treba aj citlivé vedenie skupiny a preklad do firemnej reality.',
    href: '/b2b/workshop',
    cta: 'Otvoriť workshop',
  },
]

export default async function PracaPage({ params }: P) {
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
              Práca a tímy
            </span>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Tímová komunikácia, ktorá nezostane pri „ako sa máme?“ a predsa nepôsobí trápne.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              DeepTalks pre prácu nie je terapia ani povinný wellness. Je to súbor otázok, hier a workshopových formátov,
              ktoré zlepšujú bezpečie, spätnú väzbu a spoluprácu medzi ľuďmi, ktorí spolu reálne pracujú.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/b2b`}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              B2B pre firmy
            </Link>
            <Link
              href={`/${lang}/apps/herd-vote`}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              Herd Vote pre tím
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="grid gap-5 md:grid-cols-3">
            {pillars.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kedy to dáva zmysel</p>
              <div className="mt-6 space-y-3">
                {situations.map((item, index) => (
                  <div key={item} className="grid gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 sm:grid-cols-[44px_1fr]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako to znie v praxi</p>
              <div className="mt-5 space-y-4">
                {[
                  '„Čo je jedna vec, ktorú by si chcel, aby o tvojej práci ostatní vedeli lepšie?“',
                  '„Kedy sa ti v tíme pracuje najľahšie a čo ti to umožňuje?“',
                  '„Čo by sme mali prestať robiť, ak chceme menej obrany a viac spolupráce?“',
                ].map((prompt) => (
                  <div key={prompt} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-foreground">
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ponuka</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Od kariet až po facilitovaný workshop.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {offers.map((item) => (
                <article key={item.title} className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <Link href={`/${lang}${item.href}`} className="mt-5 text-sm font-medium text-primary">
                    {item.cta} →
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
