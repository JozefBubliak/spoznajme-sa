import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const steps = [
  {
    n: '01',
    title: 'Darujete predplatné',
    desc: 'Vyberiete rozprávača, zadáte email a zvolíte, či ide o starého rodiča, rodiča, vlastný príbeh alebo párovú verziu.',
  },
  {
    n: '02',
    title: 'Každý týždeň príde otázka',
    desc: 'Každú nedeľu príde email. Odpoveď ide obyčajným reply. Bez hesla, bez aplikácie, bez zbytočného učenia.',
  },
  {
    n: '03',
    title: 'Po roku vznikne kniha',
    desc: '52 odpovedí sa zmení na rodinnú kroniku. Dá sa doplniť o fotky, editáciu a tlačené výtlačky.',
  },
]

const editions = [
  {
    name: 'Môj starý rodič',
    badge: 'Najpopulárnejší darček',
    desc: 'Príbehy z detstva, vojnové časy, prvé lásky, rodinné rozhodnutia a veci, ktoré by inak ostali nezapísané.',
    fit: 'Pre vnukov a deti, ktoré chcú zachytiť históriu rodiny kým je čas.',
  },
  {
    name: 'Môj rodič',
    badge: 'Darček k narodeninám',
    desc: 'Sny, obavy, mladé roky, prvá práca, rodičovstvo aj rozhodnutia, ktorým sme ako deti možno nikdy nerozumeli.',
    fit: 'Pre dospelé deti, ktoré chcú spoznať rodiča aj ako človeka.',
  },
  {
    name: 'Môj vlastný príbeh',
    badge: 'Pre seba',
    desc: 'Osobná memoriálová kniha vedená otázkami. Pre ľudí, ktorí chcú niečo zanechať deťom alebo sebe.',
    fit: 'Pre jednotlivcov, ktorí si chcú zachytiť vlastný príbeh v priebehu roka.',
  },
  {
    name: 'Náš párový príbeh',
    badge: 'Výročie / svadba',
    desc: 'Dvaja partneri odpovedajú na rovnaké otázky a po roku vznikne spoločná kniha z dvoch perspektív.',
    fit: 'Pre výročia, svadobné jubileá a páry, ktoré chcú zachytiť vlastný príbeh.',
  },
]

const themes = [
  {
    title: 'Detstvo',
    questions: [
      'Kde ste vyrastali a čo z toho miesta stále nosíte v sebe?',
      'Aká bola vaša obľúbená hra a s kým ste ju hrali?',
      'Čoho ste sa ako dieťa najviac báli a vedel o tom niekto?',
    ],
  },
  {
    title: 'Mladosť',
    questions: [
      'Čo bola prvá práca, za ktorú ste dostali vlastné peniaze?',
      'Ako ste spoznali človeka, ktorý vám zmenil život?',
      'Aký sen ste v mladosti mali a čo sa s ním stalo?',
    ],
  },
  {
    title: 'Rodina',
    questions: [
      'Čo ste sa naučili ako rodič, čo ste predtým vôbec nečakali?',
      'Na čo ste doma boli najviac pyšní?',
      'Ktorý rodinný moment by ste chceli, aby sme si pamätali navždy?',
    ],
  },
  {
    title: 'Múdrosť & odkaz',
    questions: [
      'Čo by ste si želali vedieť skôr?',
      'Ktoré hodnoty by podľa vás v rodine nikdy nemali zmiznúť?',
      'Čo by ste chceli, aby si po vás deti a vnuci niesli ďalej?',
    ],
  },
]

const emailFlow = [
  'Email príde v nedeľu ráno zrozumiteľne a pokojne.',
  'Odpoveď sa dá napísať jednoducho reply na email.',
  'Rodina má prístup k odpovediam bez zložitého onboarding-u.',
  'Na konci roka sa všetko uprace do knihy alebo PDF archívu.',
]

const pricing = [
  {
    name: 'Legacy — Digitálna',
    price: '39 €',
    desc: 'Ročné predplatné s 52 otázkami emailom, online archívom a PDF exportom.',
    features: ['52 otázok počas roka', 'Email každú nedeľu', 'Ukladanie odpovedí online', 'Editácia a zoradenie odpovedí', 'PDF výstup'],
    highlight: false,
  },
  {
    name: 'Legacy — Tlačená kniha',
    price: '39 € + 29 €',
    desc: 'Predplatné plus jedna viazaná kniha A5 s fotkami a možnosťou ďalších kópií pre rodinu.',
    features: ['Všetko z digitálnej verzie', 'Jedna viazaná kniha A5', 'Farebná tlač vrátane fotiek', 'Ďalšie kusy pre rodinu', 'Silný darčekový moment'],
    highlight: true,
  },
]

export default async function LegacyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Produkty
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Legacy edícia
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Spomienky, ktoré sa neopýtame včas, sa často stratia navždy.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Legacy je týždenná otázka emailom pre rodiča, starého rodiča alebo aj pre seba. Po roku z nej vznikne kniha
                spomienok, ktorú bude rodina čítať ešte o desaťročia.
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                Zámer je jednoduchý: nepýtať sa cez komplikovanú appku, ale cez médium, ktoré starší ľudia skutočne používajú.
                Reply na email je feature, nie kompromis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/produkty/predplatne`}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Pozrieť predplatné
              </Link>
              <Link
                href={`/${lang}/skupiny/seniori`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Vetva seniori
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
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prečo to vzniká</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                Legacy nie je ďalší obsahový produkt. Je to rodinný archív, ktorý sa tvorí pomaly a ľudsky.
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-5 text-base leading-relaxed text-foreground">
                  „Babka vedela veci, ktoré nikto nezapísal. A potom odišla. A my sme sa nikdy neopýtali.“
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Presne na toto reaguje Legacy: dáva rodine jemnú pravidelnosť, aby dôležité otázky neostali len dobrým úmyslom.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Prečo email</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Najjednoduchšie UX je často najsilnejšie.</h2>
              <div className="mt-6 space-y-3">
                {emailFlow.map((item) => (
                  <div key={item} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako to funguje</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Tri kroky od darčeka k hmatateľnej knihe.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.n} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <div className="text-2xl font-bold text-primary">{step.n}</div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Edície</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Rovnaký princíp, iný typ príbehu.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {editions.map((edition) => (
                <div key={edition.name} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                    {edition.badge}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{edition.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edition.desc}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">{edition.fit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">52 otázok</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Otázky sú rozložené tak, aby z roka vznikol príbeh, nie len zoznam odpovedí.</h2>
              <div className="mt-6 space-y-4">
                {themes.map((theme) => (
                  <div key={theme.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <h3 className="text-lg font-semibold text-foreground">{theme.title}</h3>
                    <div className="mt-3 space-y-2">
                      {theme.questions.map((question) => (
                        <div key={question} className="text-sm leading-relaxed text-muted-foreground">
                          „{question}“
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Výstup po roku</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Kniha spomienok je pointa, nie bonus.</h2>
              <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Ukážková štruktúra knihy</p>
                <div className="mt-4 space-y-3">
                  {[
                    'Kapitola I — Detstvo a miesto, odkiaľ pochádzam',
                    'Kapitola II — Mladosť, prvé práce a prvé lásky',
                    'Kapitola III — Rodina, rozhodnutia a ťažké roky',
                    'Kapitola IV — Múdrosť, hodnoty a odkaz',
                    'Záver — List deťom a vnukom',
                  ].map((item) => (
                    <div key={item} className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Knihu je možné doplniť o fotky, zoradiť odpovede, pridať osobnú obálku a vytlačiť viac kusov pre súrodencov či vnúčatá.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Cena</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Jednoduchý model: predplatné na rok a voliteľná tlač knihy.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {pricing.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-3xl border p-6 shadow-sm ${tier.highlight ? 'border-primary/30 bg-primary/5' : 'border-border/60 bg-card/80'}`}
                >
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  <div className="mt-3 text-3xl font-bold text-primary">{tier.price}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground">
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Kam ďalej</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Legacy je zároveň darček, rodinný projekt aj dlhodobé predplatné.
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Preto ho prepájam do seniorov, predplatného aj darčekových produktov. Nejde o izolovanú stránku, ale o ďalšiu silnú vetvu DeepTalks mapy.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href={`/${lang}/skupiny/seniori`} className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                  Seniori a medzigeneračné témy
                </Link>
                <Link href={`/${lang}/produkty/predplatne`} className="rounded-xl border border-border bg-card px-5 py-3 text-center text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary">
                  Predplatné DeepTalks
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
