import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const stats = [
  { value: '500+', label: 'otázok použiteľných v tímoch a skupinách' },
  { value: '2–4 h', label: 'štandardný workshopový formát' },
  { value: 'SK + UA', label: 'bilingválne vedenie podľa potreby' },
  { value: '24 h', label: 'odpoveď na dopyt pri vážnom záujme' },
]

const pains = [
  {
    title: 'Tím funguje, ale nepozná sa',
    description: 'Výkon je, no bezpečie chýba. Ľudia spolu spolupracujú, ale nie sú vo vzťahu.',
  },
  {
    title: 'Teambuilding bez efektu',
    description: 'Zábava prebehne, no v pondelok sú vzťahy aj spätná väzba na rovnakom bode.',
  },
  {
    title: 'Noví ľudia sa začleňujú pomaly',
    description: 'Onboarding trvá dlho, lebo tím nemá jednoduchý nástroj na otvorenie rozhovoru.',
  },
  {
    title: 'Školy bojujú s rutinou a vylúčením',
    description: 'Ranné kruhy znejú rovnako, deti sa nepoznajú a ťažké témy zostávajú nevyslovené.',
  },
]

const segments = [
  {
    title: 'Firmy',
    description: 'Psychologické bezpečie, spätná väzba, onboarding a teambuilding, ktorý zanechá efekt aj po evente.',
    href: '/b2b/firmy',
    tags: ['HR', 'manažéri', 'teambuilding', 'retrospektívy'],
  },
  {
    title: 'Školy',
    description: 'Programy pre triedy, učiteľov a školských psychológov. Menej poučovania, viac pomenovaných emócií a vzťahov.',
    href: '/b2b/skoly',
    tags: ['ranné kruhy', 'triedy', 'prevencia šikany', 'metodika'],
  },
  {
    title: 'Workshop na mieru',
    description: 'Jednorazový alebo opakovaný formát prispôsobený konkrétnej situácii v tíme či komunite.',
    href: '/b2b/workshop',
    tags: ['off-site', 'zmena v tíme', 'komunikácia', 'facilitácia'],
  },
  {
    title: 'Dopyt',
    description: 'Keď chceš navrhnúť formát, cenník a kombináciu produktov priamo pre svoju organizáciu.',
    href: '/b2b/dopyt',
    tags: ['brief', 'ponuka', 'termín', 'rozpočet'],
  },
]

const offers = [
  {
    badge: 'Najvyššia hodnota',
    title: 'Workshop psychologického bezpečia',
    description:
      'Facilitovaný 2–4 hodinový formát pre tím 6–30 ľudí. Menej prednášky, viac cielených otázok, reflexie a bezpečne vedených rozhovorov.',
    price: '500–2 000 € / session',
    href: '/b2b/workshop',
  },
  {
    badge: 'Opakované objednávky',
    title: 'Kartičky pre tímy',
    description:
      'Firemná edícia na onboarding, porady a interné eventy. Možnosť loga, väčšie balenia a množstevných cien.',
    price: 'Od 50 € / tím',
    href: '/b2b/firmy',
  },
  {
    badge: 'Rastúci segment',
    title: 'Program pre školy',
    description:
      'Kartičky, metodika a vedenie ranných kruhov alebo triednických hodín. Nástroj, ktorý sa zmestí aj do krátkeho času.',
    price: '100–300 € / škola / rok',
    href: '/b2b/skoly',
  },
  {
    badge: 'Freemium vstup',
    title: 'Herd Vote pre skupiny',
    description:
      'Skupinový kvíz na telku či projektor s možnosťou firemnej alebo školskej verzie. Dobrý vstupný produkt do ďalšej spolupráce.',
    price: 'Zadarmo, premium podľa eventu',
    href: '/apps/herd-vote',
  },
]

const agenda = [
  { slot: '0:00–0:20', title: 'Rozohriatie tímu', description: 'Krátke icebreakery a otázky, ktoré znižujú obrany bez lacnej zábavy.' },
  { slot: '0:20–1:15', title: 'Skutočné témy v tíme', description: 'Bezpečný priestor na pomenovanie treníc, potrieb a slepých miest.' },
  { slot: '1:15–2:00', title: 'Mikro návyky do praxe', description: 'Ako viesť porady, spätnú väzbu a onboarding tak, aby atmosféra nevyprchala po workshope.' },
  { slot: '2:00–2:30', title: 'Záver a ďalšie kroky', description: 'Dohoda na konkrétnych krokoch, follow-up formáte a odporúčaných produktoch.' },
]

const testimonials = [
  {
    quote:
      'Kartičky na stole pred retrospektívou otvorili veci, ktoré sme za rok nevedeli pomenovať ani na jednom meetingu.',
    author: 'Lucia K., HR manažérka · SaaS tím, Bratislava',
  },
  {
    quote:
      'Workshop nebol ďalšia firemná aktivita. Bol to moment, keď sa tím prvýkrát naozaj počul bez toho, aby sa hneď bránil.',
    author: 'Martin P., CEO · marketingová agentúra, Košice',
  },
]

export default async function B2BPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_55%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Domov
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Pre firmy a školy
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Tímy fungujú lepšie, keď sa navzájom poznajú. A triedy sa menej zraňujú, keď vedia hovoriť.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                DeepTalks ponúka workshopy, kartičky a digitálne nástroje pre organizácie, ktoré nechcú ďalší generický
                program. Chcú reálny posun v tom, ako sa ľudia počúvajú, hovoria a spolupracujú.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/${lang}/b2b/dopyt`}>Poslať dopyt</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${lang}/b2b/workshop`}>Pozrieť workshop</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card/80 p-5 text-center">
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
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Čo organizácie riešia</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Nejde len o atmosféru. Ide o výkon, dôveru a schopnosť povedať dôležité veci včas.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {pains.map((pain) => (
                <div key={pain.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{pain.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pain.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Segmenty</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Vyber si cestu podľa toho, komu chceš pomôcť.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {segments.map((segment) => (
                <Link
                  key={segment.title}
                  href={`/${lang}${segment.href}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary">{segment.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{segment.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {segment.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Produkty a služby</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Najsilnejšie vstupy do spolupráce s DeepTalks.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {offers.map((offer) => (
                <Link
                  key={offer.title}
                  href={`/${lang}${offer.href}`}
                  className="group rounded-3xl border border-border/60 bg-card/80 p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                    {offer.badge}
                  </span>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-foreground">{offer.title}</h3>
                    <span className="text-sm font-semibold text-primary">{offer.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
                  <div className="mt-5 text-sm font-medium text-primary">Pozrieť detail →</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Workshopový formát</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Ako vyzerá typický workshop</h2>
              <div className="mt-6 space-y-4">
                {agenda.map((item) => (
                  <div key={item.slot} className="grid gap-2 rounded-2xl border border-border/60 bg-background/70 p-4 sm:grid-cols-[88px_1fr] sm:items-start">
                    <div className="text-sm font-semibold text-primary">{item.slot}</div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Formáty</p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <h3 className="font-semibold text-foreground">Prezenčne</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Najsilnejší variant pre tímy, ktoré chcú intenzívny zážitok a priamu facilitáciu v miestnosti.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <h3 className="font-semibold text-foreground">Online</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Vhodné pre distribuované tímy alebo follow-up formáty po hlavnom workshope.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <h3 className="font-semibold text-foreground">Hybridný balík</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Workshop + kartičky + online nástroj, aby zmena nezostala iba na úrovni jedného eventu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Dopyt bez chaosu</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Pošli pár faktov a pripravíme vhodný formát.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Stačí vedieť, o aký typ organizácie ide, koľko ľudí bude zapojených a akú situáciu chceš riešiť.
                </p>
                <Button asChild className="mt-5 w-full" size="lg">
                  <Link href={`/${lang}/b2b/dopyt`}>Otvoriť dopyt</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Skúsenosti z praxe</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Najdôležitejšie je, čo zostane po workshope.</h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Spoločný ďalší krok</p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Ak riešiš komunikáciu v tíme alebo škole, nemusíš si vymyslieť celý program sám.</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  DeepTalks vie byť workshop, sada kartičiek, online nástroj alebo kombinácia všetkého. Záleží na kontexte, nie na univerzálnom balíčku.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <Link href={`/${lang}/b2b/dopyt`}>Nezáväzný dopyt</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/b2b/firmy`}>Riešenia pre firmy</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${lang}/b2b/skoly`}>Riešenia pre školy</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
