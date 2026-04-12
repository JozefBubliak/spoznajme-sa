import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const painPoints = [
  {
    title: 'Večer vedľa seba, každý v inom svete',
    description: 'Ste spolu, ale nie ste spolu. Telefón zje pozornosť skôr, než sa stihne začať rozhovor.',
  },
  {
    title: 'Hádky sa točia dookola',
    description: 'Stále ten istý konflikt, len iné kulisy. Bez slov pre skutočnú bolesť zostáva iba obrana.',
  },
  {
    title: 'Chcem sa rozprávať, ale neviem ako začať',
    description: 'Niektoré témy sú dôležité práve preto, že sú nepríjemné. A preto sa odkladajú.',
  },
  {
    title: 'Rutina vytlačila zvedavosť',
    description: 'Život funguje, logistika beží, ale vzťah sa prestal pýtať a počúvať.',
  },
]

const tools = [
  {
    badge: 'Odporúčané',
    title: 'Daily Connection',
    description: 'Jedna otázka denne pre vás dvoch. Päť minút, ktoré držia blízkosť pri živote aj počas rušných týždňov.',
    when: 'Každý deň večer alebo pri rannej káve',
  },
  {
    badge: 'Zadarmo',
    title: 'CoupleSync',
    description: 'Partnerský dotazník v 9 témach. Každý odpovedá sám a až potom vidí partnera.',
    when: 'Keď sa chcete znovu zosúladiť alebo stojíte pred veľkým rozhodnutím',
    href: '/apps/couplesync',
  },
  {
    badge: 'Online + fyzické',
    title: 'Konverzačné kartičky pre páry',
    description: 'Otázky v troch úrovniach hĺbky. Ľahký vstup, hlboký dosah, bez terapeutskej omáčky.',
    when: 'Na spoločný večer, výročie alebo keď chcete zámerne vypnúť telefóny',
    href: '/apps/spoznajme-sa',
  },
  {
    badge: 'Zadarmo',
    title: 'Komunikačný kompas pre páry',
    description: 'Konkrétne vety a kroky pre hádky, vzdialenosť, potreby, intimitu či ťažké témy.',
    when: 'Hneď teraz, keď nevieš, ako začať rozhovor bez ďalšieho konfliktu',
    href: '/kompas/pary',
  },
  {
    badge: 'Fyzický produkt',
    title: 'Kartičky pre páry',
    description: 'Elegantná fyzická edícia ako darček aj rituál. Hĺbka, ktorú si vytiahnete na stole a ostane v hlave.',
    when: 'Výročie, víkend, Vianoce alebo „len tak“',
    href: '/produkty/pary',
  },
  {
    badge: 'Čoskoro',
    title: 'Deep Talk Walk',
    description: 'Audio prechádzka vo dvojici. Hlas vás vedie rozhovorom, keď je jednoduchšie hovoriť vedľa seba než oproti sebe.',
    when: 'Na víkend alebo večernú prechádzku',
  },
]

const sampleQuestions = [
  'Kedy si sa naposledy cítil/a v našom vzťahu naozaj slobodne — a čo to umožnilo?',
  'O čom si hovoríme často, ale stále sa míňame v tom podstatnom?',
  'Čo by si chcel/a, aby som o tebe v najbližšom období lepšie chápal/a?',
]

const journey = [
  {
    stage: 'Nový vzťah',
    title: 'Spoznávame sa',
    recommendation: 'Začnite CoupleSync dotazníkom a ľahšou úrovňou kartičiek. Uvidíte sa skôr, než sa stihnete hrať na správne odpovede.',
  },
  {
    stage: '1–5 rokov',
    title: 'Budujeme spolu',
    recommendation: 'Daily Connection a pravidelný večer s kartičkami sú ideálny spôsob, ako neprepadnúť čistej logistike.',
  },
  {
    stage: '5+ rokov',
    title: 'Rutina nás pohltila',
    recommendation: 'Kompas a hlbšie otázky pomáhajú obnoviť zvedavosť aj pomenovať veci, ktoré sa dlho odkladali.',
  },
  {
    stage: 'Ťažké obdobie',
    title: 'Potrebujeme sa znovu nájsť',
    recommendation: 'Začni konkrétnymi vetami z Kompasu. Keď napätie trochu klesne, doplň CoupleSync alebo fyzické kartičky.',
  },
]

const scripts = [
  {
    topic: 'Pred hádkou',
    line: 'Nechcem teraz vyhrať. Chcem pochopiť, čo ťa v tejto veci naozaj bolí.',
  },
  {
    topic: 'Pri vzdialenosti',
    line: 'Mám pocit, že sme posledné dni skôr vedľa seba než spolu. Chcem to zmeniť, nie ti to vyčítať.',
  },
  {
    topic: 'Pri ťažkej téme',
    line: 'Neviem to povedať dokonale, ale nechcem, aby toto medzi nami ďalej ticho rástlo.',
  },
]

const testimonials = [
  {
    quote: 'Kartičky nám dali jazyk na veci, ktoré sme obaja cítili, ale nevedeli pomenovať bez obrany.',
    author: 'Monika a Peter · spolu 6 rokov',
  },
  {
    quote: 'CoupleSync nás nehodil do konfliktu. Skôr nám ukázal, kde sa naozaj líšime a kde si len domýšľame.',
    author: 'Lenka a Juraj · zasnúbený pár',
  },
]

export default async function ParyPage({ params }: P) {
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
                DeepTalks pre páry
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Keď „ako ti bolo?“ nestačí, vzťah potrebuje lepšie otázky, lepší jazyk a menej obrany.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                DeepTalks pre páry je sada nástrojov pre všetky fázy vzťahu: spoznávanie, blízkosť, rutina aj ťažké
                rozhovory. Nie terapia. Skôr lepší štart, keď sa chcete k sebe dostať skôr, než sa stratíte v zvyku.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/apps/couplesync`}>Začať s CoupleSync</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/kompas/pary`}>Otvoriť kompas</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Poznáte to?</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Najčastejšie to nezačne veľkou krízou. Začne to tým, že sa prestaneme pýtať.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {painPoints.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Nástroje podľa situácie</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Nemusíte robiť všetko. Stačí zvoliť správny vstup pre vašu fázu vzťahu.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {tools.map((tool) => {
                const card = (
                  <div className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                      {tool.badge}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">{tool.when}</p>
                    <div className="mt-5 text-sm font-medium text-primary">
                      {tool.href ? 'Otvoriť →' : 'Plánovaný ďalší krok'}
                    </div>
                  </div>
                )

                if (!tool.href) return <div key={tool.title}>{card}</div>

                return (
                  <Link key={tool.title} href={`/${lang}${tool.href}`} className="block h-full">
                    {card}
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Skús jednu otázku</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Hlboký rozhovor nezačína ideálnou atmosférou. Začína jednou dobrou vetou.</h2>
              <div className="mt-6 space-y-4">
                {sampleQuestions.map((question) => (
                  <div key={question} className="rounded-2xl border border-border/60 bg-background/70 p-5 text-base leading-relaxed text-foreground">
                    „{question}“
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-6">
                <Link href={`/${lang}/apps/spoznajme-sa`}>Viac otázok pre páry</Link>
              </Button>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Komunikačný kompas</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Keď potrebuješ začať citlivo, pomôže konkrétny jazyk.</h2>
              <div className="mt-6 space-y-4">
                {scripts.map((script) => (
                  <div key={script.topic} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{script.topic}</p>
                    <p className="mt-3 text-base leading-relaxed text-foreground">„{script.line}“</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6">
                <Link href={`/${lang}/kompas/pary`}>Celý kompas pre páry</Link>
              </Button>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kde ste teraz?</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Iný vzťah, iný vstup. Nemusíte všetko používať naraz.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {journey.map((item) => (
                <div key={item.stage} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.stage}</p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Skúsenosti párov</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Najväčšia zmena často nepríde z veľkého zásahu. Príde z pravidelného priestoru povedať niečo skutočné.</h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Začni tam, kde to najmenej bolí</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ak neviete, čo zvoliť, začnite otázkou, nie analýzou.</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Pre väčšinu párov je najľahší vstup CoupleSync alebo kartičky. Keď je situácia napätejšia, bezpečnejší
                  býva Kompas. Dôležitý nie je ideálny výber, ale prvý poctivý krok.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/apps/couplesync`}>Vyplniť CoupleSync</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/apps/spoznajme-sa`}>Online kartičky</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/produkty/pary`}>Fyzické kartičky</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
