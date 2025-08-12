import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getIndexFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getIndexFrontmatter(lang, 'co-trapi-deti')
  return {
    title: fm?.title || 'Čo trápi deti',
    description: fm?.seoDescription || 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-deti`,
      languages: buildHreflangAlternates('/indexy/co-trapi-deti'),
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const { lang } = params
  const fm = getIndexFrontmatter(lang, 'co-trapi-deti')
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/indexy`, label: 'Indexy' }, { label: 'Čo trápi deti' }]} />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || 'Čo trápi deti'}</h1>
      <p className="text-muted-foreground mt-2">{fm?.description || 'Čoskoro.'}</p>
    </Container>
  )
}
