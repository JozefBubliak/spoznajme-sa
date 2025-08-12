import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; id: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: `Technika ${params.id}`,
    description: 'Technický fallback podľa ID.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/t/${params.id}`,
      languages: buildHreflangAlternates(`/t/${params.id}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; id: string } }) {
  const { lang, id } = params
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Technika' }, { label: id }]} />
      <h1 className="text-3xl font-semibold mt-4">Technika {id}</h1>
      <p className="text-muted-foreground mt-2">Fallback trasa. Čoskoro.</p>
    </Container>
  )
}
