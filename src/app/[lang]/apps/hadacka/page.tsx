import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const gameModes = [
  {
    icon: '💬',
    title: 'Opis / TABU',
    description: 'Opis slovo bez zakazanych vyrazov. Klasika, ktora funguje aj pri zmiesanych skupinach.',
    bestFor: 'Najlepsie pre prve hry a vacsie partie',
  },
  {
    icon: '🎭',
    title: 'Pantomima',
    description: 'Ukaz slovo len pohybom. Idealne pre rodiny, party a okamzity smiech.',
    bestFor: 'Najlepsie pre rodiny a neformalnu zabavu',
  },
  {
    icon: '☝️',
    title: 'Jedno slovo',
    description: 'Povies len jednu napovedu. Ukaze, ako dobre sa naozaj poznate.',
    bestFor: 'Najlepsie pre pary a blizkych priatelov',
  },
  {
    icon: '🔀',
    title: 'Mix modov',
    description: 'Kazde kolo ine tempo a iny typ napovedy, aby energia nepadla.',
    bestFor: 'Najlepsie pre dlhsie vecery a eventy',
  },
]

const categories = [
  { icon: '🐕', title: 'Zvierata', note: 'klasicka' },
  { icon: '🍕', title: 'Jedlo a napoje', note: 'klasicka' },
  { icon: '⚽', title: 'Sport', note: 'klasicka' },
  { icon: '🎵', title: 'Hudba', note: 'klasicka' },
  { icon: '🌍', title: 'Cestovanie', note: 'klasicka' },
  { icon: '🎬', title: 'Film a TV', note: 'klasicka' },
  { icon: '💛', title: 'Emocie a pocity', note: 'nova tema' },
  { icon: '🏠', title: 'Vztahy a rodina', note: 'nova tema' },
  { icon: '🇸🇰', title: 'Slovensko', note: 'lokalna edicia' },
]

const audience = [
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Rodiny',
    description: 'Rodinne vecery, oslavy a stretnutia, kde chcu hrat deti aj dospeli rovnakou mierou.',
  },
  {
    icon: '🎉',
    title: 'Party a skupiny priatelov',
    description: 'Rozprudena energia bez trapneho small talku. Hra funguje aj ked sa ludia este len spoznavaju.',
  },
  {
    icon: '💼',
    title: 'Firemne timy',
    description: 'Teambuilding bez korporatneho pocitu. Display na TV a rychly onboarding pre moderatora.',
  },
  {
    icon: '🏫',
    title: 'Skoly a kurzy',
    description: 'Rozvoj slovnej zasoby, spoluprace a pohotovej komunikacie cez hru.',
  },
]

const steps = [
  'Moderator vytvori hru a nastavi mody',
  'Na TV alebo projektore otvori Player Display',
  'Hraci sa rozdelia do timov',
  'Striedaju sa v napovedani a hadani slov',
  'Vyhrava tim s najvyssim skore',
]

export default async function HadackaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-4 pb-16 pt-24 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="max-w-3xl space-y-5">
            <Link
              href={`/${lang}/apps`}
              className="inline-block text-xs uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
            >
              ← Spat na nastroje
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span>Party hra</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>Naivo na TV</span>
            </div>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Hadacka
              <br />
              <span className="gradient-text italic">nazivo.</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Party konverzacna hra pre skupiny. Jeden moderator riadi hru,
              vsetci ostatni hadzu, hadaju a smeju sa spolu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">4</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Herne mody</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">10+</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Kategorii slov</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">TV</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Display na projektor</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">2+</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Hraci a timy</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-primary/25 bg-primary/10 p-7 shadow-[0_10px_40px_rgba(197,168,128,0.08)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Spustit Hadacku teraz</p>
                <h2 className="text-3xl">Moderator potrebuje ucet, hraci nie.</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Moderator vytvori hru a pusti Player Display na televizore alebo projektore.
                  Hracom staci prist do miestnosti a hrat.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={`/auth/login?next=/apps/hadacka/moderator`}
                  className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm"
                >
                  Prihlasit sa ako moderator
                </Link>
                <Link
                  href="/apps/hadacka/display"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-warm inline-flex items-center justify-center px-6 py-3 text-sm"
                >
                  Otvorit Player Display
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="label-gold">Herne mody</p>
            <h2 className="text-4xl sm:text-5xl">Kazda partia si najde svoj rytmus.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gameModes.map((mode) => (
              <article key={mode.title} className="card-elegant p-6">
                <div className="text-3xl">{mode.icon}</div>
                <h3 className="mt-4 text-2xl">{mode.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mode.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-primary">{mode.bestFor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="label-gold">Kategorie slov</p>
            <h2 className="text-4xl sm:text-5xl">Klasiky aj lokalne temy.</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Od jedla a sportu az po emocie, vztahy a slovensku ediciu. Hra sa da
              prisposobit detom, partii priatelov aj firemnemu timu.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div key={category.title} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-2xl">{category.icon}</div>
                <h3 className="mt-3 text-xl text-foreground">{category.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{category.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="label-gold">Ako to funguje</p>
            <h2 className="text-4xl sm:text-5xl">Piatimi krokmi od prihlasenia ku smiechu.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-border bg-card p-5 text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="label-gold">Pre koho</p>
            <h2 className="text-4xl sm:text-5xl">Idealna hra pre rozne typy skupin.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {audience.map((item) => (
              <article key={item.title} className="card-elegant p-6">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[28px] border border-border bg-card p-8">
            <p className="label-gold">Rozohriati?</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Pokracujte hlbsie po hre.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Ked je skupina uvolnena a naladena, karticky alebo dalsie DeepTalks nastroje
              vedia otvorit aj hlbsiu vrstvu rozhovoru.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${lang}/apps/spoznajme-sa`}
                className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm"
              >
                Otvorit konverzacne karticky
              </Link>
              <Link
                href={`/${lang}/apps`}
                className="btn-warm inline-flex items-center justify-center px-6 py-3 text-sm"
              >
                Pozriet dalsie hry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
