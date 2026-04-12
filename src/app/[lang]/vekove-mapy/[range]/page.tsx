import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { getAgeMapFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; range: string }> }

const AGE_MAP_CONTENT: Record<
  string,
  {
    title: string
    description: string
    lead: string
    links: Array<{ href: string; label: string }>
  }
> = {
  '0-3': {
    title: 'Veková mapa 0–3 roky',
    description: 'Blízkosť, spoluregulácia, rytmus a úplne prvé pomenovanie sveta.',
    lead:
      'V tomto veku ešte nejde o dlhé vysvetľovanie. Ide o tón, bezpečie, opakovanie a jednoduchý jazyk, ktorý dieťa cíti skôr telom než argumentom.',
    links: [
      { href: '/kompas/rodic-dieta', label: 'Kompas rodič–dieťa' },
      { href: '/produkty/rodic-dieta', label: 'Produkty rodič–dieťa' },
    ],
  },
  '3-6': {
    title: 'Veková mapa 3–6 rokov',
    description: 'Hra, emócie, prvé hranice a jazyk, ktorý upokojuje namiesto boja.',
    lead:
      'Predškolský vek potrebuje krátke vety, konkrétnosť a veľa spoluregulácie. Dieťa ešte nevyhrá diskusiou, ale vie výborne reagovať na rytmus a bezpečnú štruktúru.',
    links: [
      { href: '/skupiny/rodic-dieta', label: 'Skupina rodič–dieťa' },
      { href: '/pomocky/tema/emocie-a-regulacia', label: 'Emócie a regulácia' },
    ],
  },
  '7-11': {
    title: 'Veková mapa 7–11 rokov',
    description: 'Škola, kamarátstva, sebadôvera a domáce dohody bez hanbenia.',
    lead:
      'Deti v tomto veku už veľa rozumejú, ale stále potrebujú pomoc s pomenovaním prežívania. Dobré otázky tu fungujú lepšie než rýchle rady.',
    links: [
      { href: '/indexy/co-trapi-deti', label: 'Čo trápi deti' },
      { href: '/pomocky/tema/skola-a-ucenie', label: 'Škola a učenie' },
    ],
  },
  '12-15': {
    title: 'Veková mapa 12–15 rokov',
    description: 'Identita, vzdor, citlivosť na rešpekt a tlak skupiny.',
    lead:
      'Skorá adolescencia potrebuje menej výsluchu a viac priestoru. Rozhovor funguje lepšie, keď rodič nestratí pevnosť, ale zároveň neponíži autonómiu dieťaťa.',
    links: [
      { href: '/kompas/deti', label: 'Kompas pre deti' },
      { href: '/pomocky/tema/digitalny-zivot', label: 'Digitálny život' },
    ],
  },
  '16-18': {
    title: 'Veková mapa 16–18 rokov',
    description: 'Autonómia, dôvera, partnerstvá, budúcnosť a citlivé otvorené témy.',
    lead:
      'Tu už ide skôr o partnerstvo v rozhovore než o jednoduché vedenie. Kľúčové sú dôvera, rešpekt a schopnosť hovoriť aj o ťažkých veciach bez kontroly a paniky.',
    links: [
      { href: '/indexy/co-trapi-rodicov', label: 'Čo trápi rodičov' },
      { href: '/pomocky/tema/zdravie-a-tazke-temy', label: 'Zdravie a ťažké témy' },
    ],
  },
}

function prettifyRange(range: string) {
  return range.replace('-', '–')
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: rawLang, range } = await params
  const lang = normalizeUrlLocale(rawLang)
  const fm = getAgeMapFrontmatter(lang, range)
  const fallback = AGE_MAP_CONTENT[range]
  return {
    title: String(fm?.title ?? fallback?.title ?? `Veková mapa ${prettifyRange(range)}`),
    description: String(
      fm?.seoDescription ??
        fm?.description ??
        fallback?.description ??
        'Veková mapa s odporúčanými témami, pomôckami a ďalšími krokmi.'
    ),
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/vekove-mapy/${range}`,
      languages: buildHreflangAlternates(`/vekove-mapy/${range}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: rawLang, range } = await params
  const lang = normalizeUrlLocale(rawLang)
  const fm = getAgeMapFrontmatter(lang, range)
  const fallback = AGE_MAP_CONTENT[range]
  const title = String(fm?.title ?? fallback?.title ?? `Veková mapa ${prettifyRange(range)}`)
  const description = String(
    fm?.description ??
      fallback?.description ??
      'Táto veková mapa pomáha odhadnúť vhodný tón, mieru vysvetľovania a ďalší vhodný vstup.'
  )

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Breadcrumbs
              items={[
                { href: `/${lang}`, label: 'Domov' },
                { href: `/${lang}/vekove-mapy`, label: 'Vekové mapy' },
                { label: prettifyRange(range) },
              ]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Veková mapa
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                {String(
                  fallback?.lead ??
                    'Použi vek ako prvý filter a potom pokračuj cez tému, publikum alebo konkrétnu pomôcku.'
                )}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-border/60 bg-card/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Ako s tým pracovať
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              Vek neurčuje všetko, ale výborne pomáha nastaviť tón rozhovoru.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              V praxi sa oplatí kombinovať vekovú mapu s témou a kontextom vzťahu. Preto je táto
              stránka prepojená na Kompas, indexy a produktové vetvy, nie izolovaná sama pre seba.
            </p>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Odporúčané cesty
            </p>
            <div className="mt-6 space-y-3">
              {(fallback?.links ?? []).map((link) => (
                <Link
                  key={link.href}
                  href={`/${lang}${link.href}`}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  <span>{link.label}</span>
                  <span>→</span>
                </Link>
              ))}
              <Link
                href={`/${lang}/pomocky`}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                <span>Všetky pomôcky</span>
                <span>→</span>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
