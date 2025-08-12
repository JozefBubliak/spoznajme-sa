import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string; audience: string; tema: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: `Téma – ${params.tema}`,
    description: 'Čoskoro: alias témy s publikom.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky/${params.tema}`,
      languages: buildHreflangAlternates(`/pomocky/${params.tema}`),
    },
  }
}

export default function Page({ params }: { params: { lang: string; audience: string; tema: string } }) {
  const { lang, audience, tema } = params
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { href: `/${lang}/pomocky`, label: 'Pomôcky' }, { href: `/${lang}/pomocky/${audience}`, label: audience }, { label: tema }]} />
      <h1 className="text-3xl font-semibold mt-4">Téma – {tema}</h1>
      <p className="text-muted-foreground mt-2">Alias s kanonickou URL bez publika. Čoskoro.</p>
    </Container>
  )
}
