import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getTopicFrontmatter } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; tema: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getTopicFrontmatter(lang, params.tema)
  const title = fm?.seoTitle || fm?.title || `Téma – ${params.tema}`
  const description = fm?.seoDescription || 'Čoskoro.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${params.tema}`,
      languages: buildHreflangAlternates(`/pomocky/${params.tema}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; tema: string } }) {
  const { lang, tema } = params
  const fm = getTopicFrontmatter(lang, tema)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/pomocky`, label: 'Pomôcky' }, { label: fm?.title || tema }]} />
      <h1 className="text-3xl font-semibold mt-4">{fm?.title || tema}</h1>
      <p className="text-muted-foreground mt-2">{fm?.description || 'Čoskoro.'}</p>
    </Container>
  )
}
