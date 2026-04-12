import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const gameModes = [
  {
    icon: '💬',
    title: 'Opis / TABU',
    description: 'Opíš slovo bez zakázaných výrazov. Klasika, ktorá funguje aj pri zmiešaných skupinách.',
    bestFor: 'Najlepšie pre prvé hry a väčšie partie',
  },
  {
    icon: '🎭',
    title: 'Pantomíma',
    description: 'Ukáž slovo len pohybom. Ideálne pre rodiny, párty a okamžitý smiech.',
    bestFor: 'Najlepšie pre rodiny a neformálnu zábavu',
  },
  {
    icon: '☝️',
    title: 'Jedno slovo',
    description: 'Povieš len jednu nápovedu. Ukáže, ako dobre sa naozaj poznáte.',
    bestFor: 'Najlepšie pre páry a blízkych priateľov',
  },
  {
    icon: '🔀',
    title: 'Mix módov',
    description: 'Každé kolo iné tempo a iný typ nápovedy, aby energia nepadla.',
    bestFor: 'Najlepšie pre dlhšie večery a eventy',
  },
]

const categories = [
  { icon: '🐕', title: 'Zvieratá', note: 'klasická' },
  { icon: '🍕', title: 'Jedlo a nápoje', note: 'klasická' },
  { icon: '⚽', title: 'Šport', note: 'klasická' },
  { icon: '🎵', title: 'Hudba', note: 'klasická' },
  { icon: '🌍', title: 'Cestovanie', note: 'klasická' },
  { icon: '🎬', title: 'Film a TV', note: 'klasická' },
  { icon: '💛', title: 'Emócie a pocity', note: 'nová téma' },
  { icon: '🏠', title: 'Vzťahy a rodina', note: 'nová téma' },
  { icon: '🇸🇰', title: 'Slovensko', note: 'lokálna edícia' },
]

const audience = [
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Rodiny',
    description: 'Rodinné večery, oslavy a stretnutia, kde chcú hrať deti aj dospelí rovnakou mierou.',
  },
  {
    icon: '🎉',
    title: 'Párty a skupiny priateľov',
    description: 'Rozprúdená energia bez trápneho small talku. Hra funguje aj keď sa ľudia ešte len spoznávajú.',
  },
  {
    icon: '💼',
    title: 'Firemné tímy',
    description: 'Teambuilding bez korporátneho pocitu. Display na TV a rýchly onboarding pre moderátora.',
  },
  {
    icon: '🏫',
    title: 'Školy a kurzy',
    description: 'Rozvoj slovnej zásoby, spolupráce a pohotovej komunikácie cez hru.',
  },
]

const steps = [
  'Moderátor vytvorí hru a nastaví módy',
  'Na TV alebo projektore otvorí Player Display',
  'Hráči sa rozdelia do tímov',
  'Striedajú sa v napovedaní a hádaní slov',
  'Vyhráva tím s najvyšším skóre',
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
              ← Späť na nástroje
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span>Párty hra</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>Naživo na TV</span>
            </div>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Hádanka
              <br />
              <span className="gradient-text italic">naživo.</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Párty konverzačná hra pre skupiny. Jeden moderátor riadi hru,
              všetci ostatní hádžu, hádajú a smejú sa spolu.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">4</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Herné módy</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">10+</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Kategórií slov</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">TV</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Display na projektor</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-3xl font-semibold text-primary">2+</div>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Hráči a tímy</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-primary/25 bg-primary/10 p-7 shadow-[0_10px_40px_rgba(197,168,128,0.08)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Spustiť Hádanku teraz</p>
                <h2 className="text-3xl">Moderátor potrebuje účet, hráči nie.</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Moderátor vytvorí hru a pustí Player Display na televízore alebo projektore.
                  Hráčom stačí prísť do miestnosti a hrať.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={`/auth/login?next=/apps/hadacka/moderator`}
                  className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm"
                >
                  Prihlásiť sa ako moderátor
                </Link>
                <Link
                  href="/apps/hadacka/display"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-warm inline-flex items-center justify-center px-6 py-3 text-sm"
                >
                  Otvoriť Player Display
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="label-gold">Herné módy</p>
            <h2 className="text-4xl sm:text-5xl">Každá partia si nájde svoj rytmus.</h2>
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
            <p className="label-gold">Kategórie slov</p>
            <h2 className="text-4xl sm:text-5xl">Klasiky aj lokálne témy.</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Od jedla a športu až po emócie, vzťahy a slovenskú edíciu. Hra sa dá
              prispôsobiť deťom, partii priateľov aj firemnému tímu.
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
            <h2 className="text-4xl sm:text-5xl">Piatimi krokmi od prihlásenia ku smiechu.</h2>
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
            <h2 className="text-4xl sm:text-5xl">Ideálna hra pre rôzne typy skupín.</h2>
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
            <h2 className="mt-3 text-4xl sm:text-5xl">Pokračujte hlbšie po hre.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Keď je skupina uvoľnená a naladená, kartičky alebo ďalšie DeepTalks nástroje
              vedia otvoriť aj hlbšiu vrstvu rozhovoru.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${lang}/apps/spoznajme-sa`}
                className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm"
              >
                Otvoriť konverzačné kartičky
              </Link>
              <Link
                href={`/${lang}/apps`}
                className="btn-warm inline-flex items-center justify-center px-6 py-3 text-sm"
              >
                Pozrieť ďalšie hry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
