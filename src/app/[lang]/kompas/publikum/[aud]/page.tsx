// PATH: src/app/[lang]/kompas/publikum/[aud]/page.tsx
import { notFound } from 'next/navigation'
import { KompasAudiencePage } from '@/components/KompasAudiencePage'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getKompasAudienceBySlug } from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string; aud: string }> }

export default async function Page({ params }: P) {
  const { lang: raw, aud } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const audience = getKompasAudienceBySlug(aud)
  if (!audience) notFound()

  return <KompasAudiencePage audience={audience} lang={lang} />
}
