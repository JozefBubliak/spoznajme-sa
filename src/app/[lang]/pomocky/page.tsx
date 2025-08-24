// PATH: src/app/[lang]/pomocky/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FilterBar } from '@/components/FilterBar'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return {
    title: 'Pomôcky – Hub',
    description: 'Čoskoro: prehľad komunikačných pomôcok.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/pomocky`,
      languages: buildHreflangAlternates('/pomocky'),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return (
    <Container>
      <Breadcrumbs items={[{ href: `/${lang}`, label: 'Domov' }, { label: 'Pomôcky' }]} />
      <h1 className="text-3xl font-semibold mt-4">Pomôcky</h1>
      <p className="text-muted-foreground mt-2">
        Čoskoro. Prehľad, Témy, Publiká, Vekové mapy.
      </p>
      <div className="mt-6">
        <FilterBar />
      </div>
    </Container>
  )
}
