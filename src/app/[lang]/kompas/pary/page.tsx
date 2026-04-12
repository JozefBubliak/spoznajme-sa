// PATH: src/app/[lang]/kompas/pary/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { KompasAudiencePage } from '@/components/KompasAudiencePage'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getKompasAudienceBySlug } from '@/lib/kompas-content'

export const metadata: Metadata = {
  title: 'Komunikačný kompas – Páry | DeepTalks',
  description:
    'Vety a minipostupy pre komunikáciu v pároch. Vyberte si tému.',
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const audience = getKompasAudienceBySlug('pary')
  if (!audience) notFound()

  return <KompasAudiencePage audience={audience} lang={lang} />
}
