import Link from 'next/link'
import { notFound } from 'next/navigation'

import Hero from '@/components/home/Hero'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/server'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

const sectionLinks = {
  apps: (lang: string) => `/${lang}/apps`,
  products: (lang: string) => `/${lang}/produkty`,
  tools: (lang: string) => `/${lang}/kompas`,
}

export default async function LangLandingPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const dict = await getDictionary(lang as Locale)
  const what = dict.what ?? {}
  const nav = dict.nav ?? {}
  const audience = dict.aud ?? {}
  const topics = dict.topics ?? {}

  const highlights = [
    { key: 'appsT', label: nav.apps ?? 'Apps', href: sectionLinks.apps(lang) },
    { key: 'productsT', label: nav.products ?? 'Products', href: sectionLinks.products(lang) },
    { key: 'compasT', label: nav.tools ?? 'Compass', href: sectionLinks.tools(lang) },
  ] as const

  const audienceItems = Object.entries(audience)
  const topicItems = Object.values(topics)

  return (
    <div className="space-y-20 pb-20">
      <Hero lang={lang} />

      <section className="bg-muted/30 py-16">
        <Container>
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {what.title ?? 'Čo tu nájdete'}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.key} className="h-full text-left">
                <CardHeader>
                  <CardTitle>{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-base leading-relaxed">
                    {what[item.key as keyof typeof what] ?? ''}
                  </CardDescription>
                  <Button asChild variant="ghost" className="self-start px-0">
                    <Link href={item.href}>Zobraziť viac</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {audienceItems.length > 0 && (
        <section>
          <Container>
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                {dict.audTitle ?? 'Pre koho'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {dict.audLead ?? dict.hero?.lead ?? ''}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {audienceItems.map(([key, label]) => (
                <span
                  key={key}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  {label as string}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {topicItems.length > 0 && (
        <section className="bg-muted/30 py-16">
          <Container>
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                {dict.topicsTitle ?? 'Témy a oblasti'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {dict.topicsLead ?? ''}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {topicItems.map((label, index) => (
                <span
                  key={index}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  {label as string}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section>
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-primary to-accent px-8 py-14 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold">{dict.hero?.ctaStart ?? 'Začať'}</h2>
            <p className="mt-4 text-lg opacity-90">{dict.hero?.lead ?? ''}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={sectionLinks.tools(lang)}>{dict.hero?.ctaStart ?? 'Otvoriť kompas'}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                <Link href={sectionLinks.apps(lang)}>{dict.hero?.ctaTry ?? 'Spustiť hru'}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
