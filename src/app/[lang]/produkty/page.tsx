import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: 'Produkty',
    description: 'Čoskoro.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/produkty`,
      languages: buildHreflangAlternates('/produkty'),
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const { lang } = params
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Produkty' }]} />
      <h1 className="text-3xl font-semibold mt-4">Produkty</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
