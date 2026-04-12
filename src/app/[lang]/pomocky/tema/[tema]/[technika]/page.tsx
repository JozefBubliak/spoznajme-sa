import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { getToolFrontmatter, getTopicFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; tema: string; technika: string }> }

function prettifySlug(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  const tool = getToolFrontmatter(lang, tema, technika)
  return {
    title: String(tool?.seoTitle ?? tool?.title ?? prettifySlug(technika)),
    description: String(
      tool?.seoDescription ??
        tool?.summary ??
        'Detail komunikačnej techniky s odkazom na tému, vekové mapy a ďalšie vstupy.'
    ),
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/tema/${tema}/${technika}`,
      languages: buildHreflangAlternates(`/pomocky/tema/${tema}/${technika}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)
  const topic = getTopicFrontmatter(lang, tema)
  const tool = getToolFrontmatter(lang, tema, technika)

  const topicTitle = String(topic?.title ?? prettifySlug(tema))
  const toolTitle = String(tool?.title ?? prettifySlug(technika))

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Breadcrumbs
              items={[
                { href: `/${lang}`, label: 'Domov' },
                { href: `/${lang}/pomocky`, label: 'Pomôcky' },
                { href: `/${lang}/pomocky/tema/${tema}`, label: topicTitle },
                { label: toolTitle },
              ]}
            />
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Technika
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {toolTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {String(
                  tool?.summary ??
                    'Táto stránka drží techniku na živej URL a prepája ju s témou, vekom aj ďalšími praktickými vstupmi.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {tool?.tool_id ? (
                <span className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
                  ID: {String(tool.tool_id)}
                </span>
              ) : null}
              <Link
                href={`/${lang}/pomocky/tema/${tema}`}
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Späť na tému
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-border/60 bg-card/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Ako ju použiť
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              {tool
                ? 'Pomôcka už má svoj vlastný identifikátor a stručný účel.'
                : 'Aj keď detail ešte nie je plný, URL už nie je mŕtva.'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {tool
                ? `${toolTitle} patrí do témy ${topicTitle.toLocaleLowerCase()} a slúži ako konkrétny vstup do rozhovoru, regulácie alebo pomenovania situácie.`
                : 'Táto technika zatiaľ nemá rozšírený textový obsah, ale držíme ju na použiteľnej stránke s jasnými ďalšími krokmi.'}
            </p>
            <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-5">
              <p className="text-sm font-medium text-foreground">Odporúčaný ďalší krok</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Otvor si najprv tému, z ktorej technika vychádza, a potom si vyber publikum alebo
                vekovú mapu podľa toho, s kým rozhovor vedieš.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Súvisiace cesty
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href={`/${lang}/pomocky/tema/${tema}`}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                <span>Téma {topicTitle}</span>
                <span>→</span>
              </Link>
              <Link
                href={`/${lang}/vekove-mapy`}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                <span>Vekové mapy</span>
                <span>→</span>
              </Link>
              <Link
                href={`/${lang}/kompas`}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                <span>Komunikačný kompas</span>
                <span>→</span>
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
