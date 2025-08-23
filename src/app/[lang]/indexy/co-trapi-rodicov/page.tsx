// PATH: src/app/[lang]/indexy/co-trapi-rodicov/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getIndexFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

interface IndexFrontmatter {
  title?: string
  seoDescription?: string
  description?: string
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getIndexFrontmatter(lang, 'co-trapi-rodicov') as IndexFrontmatter | null

  const title = typeof fm?.title === 'string' ? fm.title : undefined
  const description =
    typeof fm?.seoDescription === 'string' ? fm.seoDescription : undefined

  return {
    title: title ?? 'Čo trápi rodičov',
    description: description ?? 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-rodicov`,
      languages: buildHreflangAlternates('/indexy/co-trapi-rodicov'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const fm = getIndexFrontmatter(lang, 'co-trapi-rodicov') as IndexFrontmatter | null

  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/indexy`, label: 'Indexy' },
          { label: 'Čo trápi rodičov' },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">
        {fm?.title ?? 'Čo trápi rodičov'}
      </h1>
      <p className="text-muted-foreground mt-2">
        {fm?.description ?? 'Čoskoro.'}
      </p>
    </Container>
  )
}
