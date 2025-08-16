// PATH: src/app/[lang]/t/[id]/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; id: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: rawLang, id } = await params
  const lang = normalizeUrlLocale(rawLang)
  return {
    title: `Technika ${id}`,
    description: 'Technický fallback podľa ID.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/t/${id}`,
      languages: buildHreflangAlternates(`/t/${id}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: rawLang, id } = await params
  const lang = normalizeUrlLocale(rawLang)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Technika' }, { label: id }]} />
      <h1 className="text-3xl font-semibold mt-4">Technika {id}</h1>
      <p className="text-muted-foreground mt-2">Fallback trasa. Čoskoro.</p>
    </Container>
  )
}
