import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const stats = [
  { value: '5', label: 'produktových vetiev na jednej mape' },
  { value: '6+', label: 'digitálnych nástrojov dostupných už teraz' },
  { value: '2', label: 'fyzické edície pripravené na predaj' },
  { value: 'B2B', label: 'workshopy, školy a firemné balíčky' },
]

const sections = [
  {
    id: 'digital',
    eyebrow: 'Digitálne produkty',
    title: 'Zadarmo alebo freemium',
    description:
      'Nástroje, ktoré fungujú bez veľkej bariéry. Môžeš ich použiť hneď teraz doma, vo dvojici alebo v skupine.',
    items: [
      {
        badge: 'Zadarmo',
        name: 'Komunikačný kompas',
        description: 'Konkrétne vety a minipostupy pre páry, rodičov, prácu, školu aj ťažké témy.',
        price: 'Online bez registrácie',
        href: '/kompas',
      },
      {
        badge: 'Zadarmo',
        name: 'Konverzačné kartičky',
        description: 'Digitálna verzia kartičiek rozdelená podľa skupiny a úrovne hĺbky.',
        price: 'Online verzia DeepTalks',
        href: '/apps/spoznajme-sa',
      },
      {
        badge: 'Zadarmo',
        name: 'CoupleSync',
        description: 'Partnerský dotazník, ktorý odhalí zhodu aj slepé miesta vo vzťahu.',
        price: 'Vyplníte každý zvlášť',
        href: '/apps/couplesync',
      },
      {
        badge: 'Zadarmo',
        name: 'Herd Vote',
        description: 'Skupinový kvíz na projektor, telku alebo mobil. Výborný na večer aj teambuilding.',
        price: 'Moderátor + hráči cez kód',
        href: '/apps/herd-vote',
      },
      {
        badge: 'Freemium',
        name: 'Daily Connection',
        description: 'Jedna otázka denne pre pár. Návyk malých rozhovorov, ktoré držia blízkosť pri živote.',
        price: 'Pripravujeme premium rozšírenie',
        href: '/apps/daily-connection',
      },
      {
        badge: 'Lead magnet',
        name: 'Otázka dňa',
        description: 'Krátky denný impulz, ktorý môže viesť do newslettera, archívu a ďalších sérií.',
        price: 'Obsahový most medzi návštevou a vzťahom so značkou',
      },
    ],
  },
  {
    id: 'cards',
    eyebrow: 'Fyzické kartičky',
    title: 'Produkty, ktoré vyťahujú ľudí od obrazoviek',
    description:
      'Kráľovská disciplína DeepTalks. Elegantné balenie, zrozumiteľná mechanika a otázky, ktoré sa dajú vytiahnuť na stole, v aute aj na víkend.',
    items: [
      {
        badge: 'Mapa',
        name: 'Kartičkový systém DeepTalks',
        description: 'Prehľad všetkých online, fyzických aj plánovaných kartičkových edícií na jednom mieste.',
        price: 'Mapa edícií',
        href: '/produkty/karticky',
      },
      {
        badge: 'Dostupné',
        name: 'Kartičky pre páry',
        description: 'Tri úrovne hĺbky, otázky na blízkosť, konflikty aj budúcnosť. Fungujú ako darček aj rituál.',
        price: '18–25 €',
        href: '/produkty/pary',
      },
      {
        badge: 'Dostupné',
        name: 'Kartičky rodič–dieťa',
        description: 'Otázky a mikroaktivity podľa veku. Pre rodičov, ktorí nechcú zostať pri „ako bolo v škole?“',
        price: '18–25 €',
        href: '/produkty/rodic-dieta',
      },
      {
        badge: 'Pripravujeme',
        name: 'Kartičky pre priateľov',
        description: 'Anti-small-talk edícia na večer, výlet, oheň alebo spoločný byt.',
        price: 'Plánovaná ďalšia edícia',
      },
      {
        badge: 'Pripravujeme',
        name: 'Kartičky pre tímy',
        description: 'Icebreakery, psychologické bezpečie a rozhovory, ktoré fungujú aj v práci.',
        price: 'B2B balíčky a brandované verzie',
        href: '/b2b',
      },
      {
        badge: 'Pripravujeme',
        name: 'Legacy / seniori',
        description: 'Otázky na spomienky, rodinné príbehy a most medzi generáciami.',
        price: 'Darček s dlhodobou hodnotou',
      },
      {
        badge: 'Pripravujeme',
        name: 'Ťažké situácie',
        description: 'Ako začať, keď treba povedať niečo bolestivé, citlivé alebo dlho odkladané.',
        price: 'Špecializovaná tematická edícia',
      },
    ],
  },
  {
    id: 'subscriptions',
    eyebrow: 'Predplatné a digitálne služby',
    title: 'Produkty, ku ktorým sa ľudia vracajú',
    description:
      'Nie všetko musí byť jednorazový nákup. Práve pravidelnosť vytvára najväčšiu zmenu vo vzťahoch.',
    items: [
      {
        badge: 'Nové',
        name: 'Daily Connection Premium',
        description: 'Archív otázok, tematické série, párovanie s partnerom a hlbší režim pre dlhodobý návyk.',
        price: 'Cieľ: 3–5 € / mesiac',
      },
      {
        badge: 'Nové',
        name: 'Legacy predplatné',
        description: 'Týždenná otázka pre starého rodiča emailom. Po roku môže vzniknúť kniha spomienok.',
        price: 'Darčekový model na rok',
      },
      {
        badge: 'Jednoduchý štart',
        name: 'Darčekový poukaz',
        description: 'Bezpečná voľba pre výročie, Vianoce, svadbu alebo keď chceš darovať rozhovor bez výberovej paralýzy.',
        price: 'Hodnota podľa výberu',
        href: '/produkty/darcekovy-poukaz',
      },
      {
        badge: 'Experiment',
        name: 'Deep Talk Walk',
        description: 'Audio séria pre prechádzky vo dvojici. Ľudia často hovoria ľahšie vedľa seba než oproti sebe.',
        price: 'Digitálny download alebo bundle',
      },
    ],
  },
  {
    id: 'b2b',
    eyebrow: 'B2B a organizácie',
    title: 'DeepTalks ako nástroj pre tímy, školy a komunity',
    description:
      'Produkty nemusia končiť doma v obývačke. Ten istý princíp sa dá preložiť do triedy, firmy aj partnerskej kaviarne.',
    items: [
      {
        badge: 'Vysoká marža',
        name: 'Workshop pre tímy',
        description: 'Psychologické bezpečie, spätná väzba a dôvera cez facilitované otázky a aktivity.',
        price: '500–2 000 € / session',
        href: '/b2b/workshop',
      },
      {
        badge: 'Opakované objednávky',
        name: 'Firemné balíčky kartičiek',
        description: 'Hromadné objednávky pre onboarding, porady a interné eventy. Aj s logom firmy.',
        price: 'Od 50 € / tím',
        href: '/b2b/firmy',
      },
      {
        badge: 'Rastúci segment',
        name: 'Program pre školy',
        description: 'Kartičky, metodika a vedenie ranných kruhov pre učiteľov, psychológov aj celé školy.',
        price: '100–300 € / škola / rok',
        href: '/b2b/skoly',
      },
      {
        badge: 'Komunita',
        name: 'Partnerské kaviarne',
        description: 'Kartičky na stoloch, rozhovorové večery a zapojenie do mapy miest, kde sa dá hovoriť inak.',
        price: 'Dohodou alebo barterovo',
        href: '/komunita',
      },
    ],
  },
  {
    id: 'merch',
    eyebrow: 'Merch',
    title: 'Produkty, ktoré nesú značku aj mimo aplikácie',
    description:
      'Merch tu nie je len doplnok. Má signalizovať otvorenosť rozhovoru a robiť z ľudí ambasádorov myšlienky.',
    items: [
      {
        badge: 'Pripravené',
        name: 'Tričká',
        description: 'Texty typu „Rád sa rozprávam — oslov ma“ s QR prvkom alebo otázkou na chrbte.',
        price: '20–35 €',
      },
      {
        badge: 'Nové',
        name: 'Odznaky a buttony',
        description: 'Malý, lacný a viditeľný signál, že človek je otvorený kontaktu a rozhovoru.',
        price: '3–5 €',
      },
      {
        badge: 'Nové',
        name: 'Gratitude lístočky',
        description: 'Doplnok ku kartičkám. Krátke odkazy vďačnosti, ktoré sa z rozhovoru prenesú do každodennosti.',
        price: '2–4 € ako doplnok',
      },
    ],
  },
]

export default async function ProduktyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6 py-8">
            <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Domov
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Náš ekosystém
              </span>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Produkty DeepTalks nie sú e-shopová polica. Sú to rôzne spôsoby, ako dostať ľudí k hlbšiemu rozhovoru.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Na jednom mieste vidíš digitálne nástroje, fyzické kartičky, predplatné, B2B programy aj merch.
                Každá vetva rieši inú situáciu, ale všetky smerujú k tej istej veci: menej povrchu, viac kontaktu.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/apps`}>Preskúmať nástroje</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/b2b`}>Pozrieť B2B ponuku</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card/70 p-5">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-5 scroll-mt-24">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{section.title}</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{section.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => {
                  const content = (
                    <div className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                          {item.badge}
                        </span>
                        <span className="text-sm font-semibold text-primary">{item.price}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-5 text-sm font-medium text-primary">
                        {item.href ? 'Otvoriť detail →' : 'Zaradené v produktovej mape'}
                      </div>
                    </div>
                  )

                  if (!item.href) {
                    return <div key={item.name}>{content}</div>
                  }

                  return (
                    <Link key={item.name} href={`/${lang}${item.href}`} className="block h-full">
                      {content}
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Kam ďalej</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Ak chceš začať jednoducho, otvor si nástroj. Ak chceš darovať alebo nasadiť DeepTalks vo väčšom, choď do produktov a B2B.
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Táto stránka je mapa. Ďalší krok závisí od toho, či riešiš vzťah doma, triedu v škole alebo tím v práci.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/apps`}>Digitálne nástroje</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/produkty/pary`}>Produkty pre páry</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/produkty/rodic-dieta`}>Produkty rodič–dieťa</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
