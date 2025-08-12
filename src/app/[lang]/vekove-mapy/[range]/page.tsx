import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getAgeMapFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; range: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getAgeMapFrontmatter(lang, params.range)
  return {
    title: fm?.title || `Veková mapa – ${params.range}`,
    description: fm?.seoDescription || 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/vekove-mapy/${params.range}`,
      languages: buildHreflangAlternates(`/vekove-mapy/${params.range}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; range: string } }) {
  const { lang, range } = params
  const fm = getAgeMapFrontmatter(lang, range)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Vekové mapy' }, { label: range }]} />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || `Veková mapa ${range}`}</h1>
      <p className="text-muted-foreground mt-2">{fm?.description || 'Čoskoro.'}</p>
    </Container>
  )
}
