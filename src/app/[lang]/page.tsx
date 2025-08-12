import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: 'DeepTalks – Domov',
    description: 'Čoskoro. Prehľad pre jazykové verzie.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}`,
      languages: buildHreflangAlternates('/'),
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return (
    <Container>
      <h1 className="text-3xl font-semibold">DeepTalks – {params.lang.toUpperCase()}</h1>
      <p className="text-muted-foreground mt-2">Čoskoro.</p>
    </Container>
  )
}
