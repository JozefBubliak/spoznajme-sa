import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const beliefs = [
  {
    title: 'Realita je lepšia ako obrazovka',
    desc: 'Nie preto, že digitál je zlý. Ale preto, že nič nenahradí pocit, keď ti niekto odpovie úprimne a bez masky.',
  },
  {
    title: 'Jeden dobrý rozhovor mení viac než sto motivačných viet',
    desc: 'DeepTalks nestavia na veľkých rečiach. Skôr na presných otázkach, konkrétnych vetách a formátoch, ktoré ľudia naozaj použijú.',
  },
  {
    title: 'Zraniteľnosť nemusí byť veľká scéna',
    desc: 'Niekedy začína jednou malou otázkou pri stole, na prechádzke alebo v emaile, ktorý príde v nedeľu ráno.',
  },
]

const pillars = [
  {
    title: 'Komunikačný kompas',
    desc: 'Konkrétne vety a minipostupy, keď človek nevie, ako začať alebo čo povedať citlivo.',
    href: '/kompas',
  },
  {
    title: 'Nástroje a hry',
    desc: 'Kartičky, Daily Connection, CoupleSync, skupinové formáty a ďalšie vstupy podľa situácie.',
    href: '/apps',
  },
  {
    title: 'Komunita',
    desc: 'Akcie, spontánky a lokálne stretnutia, kde sa myšlienka presúva z webu do reálneho sveta.',
    href: '/komunita',
  },
  {
    title: 'Produkty a B2B',
    desc: 'Kartičky, Legacy, workshopy, školy, firmy a ďalšie spôsoby, ako dostať túto myšlienku medzi ľudí.',
    href: '/produkty',
  },
]

const values = [
  {
    name: 'Jemnosť',
    desc: 'Citlivé témy nechceme siliť. Hľadáme jazyk, ktorý otvára a nie tlačí.',
  },
  {
    name: 'Použiteľnosť',
    desc: 'Ak to nevie človek použiť dnes večer, je to len pekná idea. My chceme funkčné vstupy.',
  },
  {
    name: 'Otvorenosť',
    desc: 'DeepTalks nie je len pre extrovertov, psychológov alebo páry v kríze. Je pre každého, kto chce hovoriť o trochu skutočnejšie.',
  },
  {
    name: 'Offline odvaha',
    desc: 'Digitál je most. Cieľ je stále reálny kontakt, prítomnosť a rozhovor, ktorý sa naozaj stane.',
  },
]

export default async function ONasPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Domov
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Prečo hovoriť
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                DeepTalks je odpoveď na jednoduchý pocit: sme hyperprepojení a napriek tomu často sami.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Vznikol z pozorovania, že ľudia sú vedľa seba, ale málo naozaj spolu. Partneri riešia logistiku, rodičia výkon,
                priatelia small talk a kolegovia funkciu. Chýbajú presné otázky, bezpečný jazyk a dôvod zastaviť sa.
              </p>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-2xl leading-relaxed text-foreground sm:text-3xl">
                „Jeden úprimný rozhovor zmení viac ako tisíc lajkov.“
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Manifest</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Čomu veríme</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {beliefs.map((belief) => (
                <div key={belief.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{belief.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Čo robíme</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">DeepTalks nie je jedna appka. Je to ekosystém vstupov do lepšieho rozhovoru.</h2>
              <div className="mt-6 space-y-3">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.title}
                    href={`/${lang}${pillar.href}`}
                    className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                    <div className="mt-4 text-sm font-medium text-primary">Otvoriť →</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako k tomu pristupujeme</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Nechceme ľudí ohúriť. Chceme ich jemne odomknúť.</h2>
              <div className="mt-6 space-y-4">
                {values.map((value) => (
                  <div key={value.name} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <h3 className="text-lg font-semibold text-foreground">{value.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Spolupráca</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Sme otvorení partnerstvám, odbornému vstupu, komunite aj značkám, ktoré chcú vracať ľudí k sebe.
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Ak vnímaš rozhovor ako infraštruktúru zdravých vzťahov, pravdepodobne si rozumieme. DeepTalks môže fungovať doma, v škole, v práci aj v meste.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={`/${lang}/kontakt`} className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                  Kontaktovať nás
                </Link>
                <Link href={`/${lang}/b2b`} className="rounded-xl border border-border bg-card px-5 py-3 text-center text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                  B2B a školy
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
