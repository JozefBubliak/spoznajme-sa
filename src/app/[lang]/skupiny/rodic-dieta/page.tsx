import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const realities = [
  {
    title: '„Ako bolo?“ — „Dobre.“',
    description: 'Každý deň ten istý pokus o rozhovor, ktorý skončí pri jednej slabike.',
  },
  {
    title: 'Dieťa v mobile, rodič v únave',
    description: 'Ste doma spolu, ale pozornosť je rozbitá na obrazovky, povinnosti a prežitie.',
  },
  {
    title: 'Tínedžer sa zatvára',
    description: 'Nie preto, že nechce vzťah. Často len nechce výsluch alebo ďalšie rýchle rady.',
  },
  {
    title: 'Ťažké témy sa odkladajú',
    description: 'Šikana, smrť, rozvod, puberta či obrazovky. Čakáme na „lepší čas“, ktorý nepríde sám.',
  },
]

const ageGroups = [
  {
    label: 'Predškolák',
    range: '3–6 rokov',
    description: 'Otázky musia byť hravé, konkrétne a bez tlaku. Najlepšie fungujú pri hre alebo pred spaním.',
    questions: [
      'Čo ťa dnes potešilo — ukáž mi to rukami aj slovami.',
      'Keby si bol/a kúzelník/čka, čo by si dnes zmenil/a na svete?',
      'Kto ťa dnes rozosmial — a čo urobil?',
    ],
  },
  {
    label: 'Základná škola',
    range: '7–11 rokov',
    description: 'Deti už riešia školu, kamarátov a porovnávanie sa. Rozhovor funguje lepšie bokom než zoči-voči.',
    questions: [
      'Keby si mohol/a zrušiť jedno školské pravidlo, ktoré by to bolo?',
      'Kto je v triede najzábavnejší — a prečo?',
      'Stalo sa ti dnes niečo, čo ťa mrzelo, ale nechcel/a si to hovoriť hneď?',
    ],
  },
  {
    label: 'Tínedžer',
    range: '12–17 rokov',
    description: 'Tínedžeri nechcú výsluch. Chcú byť vypočutí bez okamžitej opravy, poučenia alebo paniky.',
    questions: [
      'Čo by si chcel/a, aby som o tvojom živote lepšie chápal/a?',
      'Je niečo, o čom by si chcel/a hovoriť, ale nevieš ako začať?',
      'Čo ti teraz v živote robí naozajstnú radosť — nie aktivita, ale pocit?',
    ],
  },
  {
    label: 'Dospelé dieťa',
    range: '18+',
    description: 'Vzťah sa mení z výchovy na partnerstvo. Viac rešpektu, menej automatického vedenia.',
    questions: [
      'Na čo sa ťa pýtam málo, hoci by som mal/a viac?',
      'Kedy sa pri mne cítiš naozaj prijato aj ako dospelý človek?',
      'Čo by si chcel/a, aby sme si vo vzťahu rodič–dieťa zachovali navždy?',
    ],
  },
]

const scripts = [
  {
    title: 'Po škole',
    description: 'Namiesto „ako bolo?“ skús: „Ktorá chvíľa dnes stála za to — a ktorá nie?“',
  },
  {
    title: 'Pri hneve',
    description: '„Nechcem ťa teraz zastaviť, chcem pochopiť, čo sa v tebe deje. Skús mi to povedať jednou vetou.“',
  },
  {
    title: 'Pri obrazovkách',
    description: '„Nechcem ti len vziať mobil. Chcem sa dohodnúť tak, aby sme obaja vedeli, prečo to robíme.“',
  },
  {
    title: 'Pri ťažkej téme',
    description: '„Neviem to povedať dokonale, ale toto je dôležité a chcem pri tom zostať s tebou, nie proti tebe.“',
  },
]

const tools = [
  {
    badge: 'Zadarmo',
    title: 'Kompas rodič–dieťa',
    description: 'Konkrétne vety a postupy pre emócie, školu, obrazovky aj ťažké témy podľa veku dieťaťa.',
    href: '/kompas/rodic-dieta',
  },
  {
    badge: 'Zadarmo',
    title: 'Vekové mapy',
    description: 'Praktické prehľady tém a potrieb podľa veku dieťaťa. Dobrý most medzi intuíciou a realitou.',
    href: '/vekove-mapy/3-6',
  },
  {
    badge: 'Fyzický produkt',
    title: 'Kartičky rodič–dieťa',
    description: 'Otázky a malé aktivity, ktoré z bežného večera urobia priestor na kontakt.',
    href: '/produkty/rodic-dieta',
  },
  {
    badge: 'Indexy tém',
    title: 'Čo trápi deti a rodičov',
    description: 'Orientácia v tom, čo deti a rodičia riešia najčastejšie, bez chaosu a domýšľania.',
    href: '/indexy/co-trapi-deti',
  },
]

const testimonials = [
  {
    quote: 'Najväčšia zmena nebola v tom, že sme mali viac tém. Ale že dcéra zistila, že ju naozaj počúvam až do konca.',
    author: 'Michaela · mama 11-ročnej dcéry',
  },
  {
    quote: 'Kompas mi dal prvé vety. Potom už rozhovor išiel sám, len som potreboval vedieť, ako ho nepokaziť hneď na začiatku.',
    author: 'Róbert · otec tínedžera',
  },
]

export default async function RodicDietaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_55%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/skupiny`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Skupiny
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                DeepTalks rodič–dieťa
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Deti nebudú malé večne. Rozhovory, ktoré odkladáme, sa samy nezačnú.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                DeepTalks pomáha rodičom vytvoriť bezpečný priestor pre emócie, školu, obrazovky aj ťažké témy. Nie cez
                dokonalé rady, ale cez lepšie otázky, konkrétne vety a vhodný formát podľa veku dieťaťa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/kompas/rodic-dieta`}>Otvoriť kompas</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/produkty/rodic-dieta`}>Kartičky rodič–dieťa</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Reálne situácie</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Vo väčšine rodín nechýba láska. Chýba čas, energia a jazyk, ktorý by otvoril bezpečný rozhovor.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {realities.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Vyber vek dieťaťa</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Každý vek potrebuje iný rytmus otázok, inú formu a inú dávku tlaku.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {ageGroups.map((group) => (
                <div key={group.label} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.label} · {group.range}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                  <div className="mt-5 space-y-3">
                    {group.questions.map((question) => (
                      <div key={question} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-relaxed text-foreground">
                        „{question}“
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kompasové situácie</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Keď rodič nevie, ako začať, pomôže jednoduchá veta bez nátlaku.</h2>
              <div className="mt-6 space-y-4">
                {scripts.map((script) => (
                  <div key={script.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{script.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{script.description}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6">
                <Link href={`/${lang}/kompas/rodic-dieta`}>Všetky situácie v kompase</Link>
              </Button>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Nástroje</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Nepotrebuješ všetko naraz. Potrebuješ vhodný vstup pre dnešnú situáciu.</h2>
              <div className="mt-6 grid gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={`/${lang}${tool.href}`}
                    className="rounded-2xl border border-border/60 bg-background/70 p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                      {tool.badge}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                    <div className="mt-4 text-sm font-medium text-primary">Otvoriť →</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Mikrotipy pre rodičov</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <h3 className="text-lg font-semibold text-foreground">Pýtaj sa bokom, nie proti dieťaťu</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Najmä pri školákoch a tínedžeroch funguje rozhovor lepšie v aute, pri varení alebo počas chôdze než pri „vážnom sedení“.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <h3 className="text-lg font-semibold text-foreground">Nehľadaj okamžite riešenie</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Dieťa často najprv potrebuje zažiť, že bolo vypočuté. Rada príliš skoro môže rozhovor zavrieť.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <h3 className="text-lg font-semibold text-foreground">Konkrétna otázka je silnejšia než všeobecná</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Namiesto „ako bolo?“ funguje „čo ťa dnes prekvapilo?“ alebo „kto ti dnes zlepšil deň?“.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <h3 className="text-lg font-semibold text-foreground">Malý rituál je viac než občasná veľká snaha</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Desať minút denne má väčšiu silu než jedna perfektne naplánovaná „hlboká debata“ raz za mesiac.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Rodičovská skúsenosť</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Aj rodičia potrebujú podporu, nie pocit, že zlyhávajú.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {testimonials.map((item) => (
                <div key={item.author} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-base leading-relaxed text-foreground">„{item.quote}“</p>
                  <p className="mt-4 text-sm text-muted-foreground">{item.author}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Začni tam, kde dnes naozaj ste</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ak potrebuješ okamžitú pomoc s vetou, otvor Kompas. Ak chceš spoločný rituál, siahni po kartičkách.</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  DeepTalks rodič–dieťa nemá vytvárať tlak na perfektné rodičovstvo. Má dať jednoduchý spôsob, ako sa
                  znovu stretnúť pri rozhovore.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/kompas/rodic-dieta`}>Otvoriť kompas</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/produkty/rodic-dieta`}>Pozrieť produkty</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/indexy/co-trapi-deti`}>Index detských tém</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
