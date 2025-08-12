import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; audience: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: `Pomôcky – ${params.audience}`,
    description: 'Čoskoro: hub pre publikum.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${params.audience}`,
      languages: buildHreflangAlternates(`/pomocky/${params.audience}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; audience: string } }) {
  const { lang, audience } = params
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/pomocky`, label: 'Pomôcky' }, { label: audience }]} />
      <h1 className="text-3xl font-semibold mt-4">Pomôcky – {audience}</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
