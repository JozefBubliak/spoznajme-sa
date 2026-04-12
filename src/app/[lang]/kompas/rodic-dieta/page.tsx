// PATH: src/app/[lang]/kompas/rodic-dieta/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { KompasAudiencePage } from '@/components/KompasAudiencePage'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getKompasAudienceBySlug } from '@/lib/kompas-content'

export const metadata: Metadata = {
  title: 'Komunikačný kompas – Rodič–dieťa | DeepTalks',
  description:
    'Vety a minipostupy pre komunikáciu medzi rodičom a dieťaťom. Vyber si tému.',
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const audience = getKompasAudienceBySlug('rodic-dieta')
  if (!audience) notFound()

  return <KompasAudiencePage audience={audience} lang={lang} />
}
