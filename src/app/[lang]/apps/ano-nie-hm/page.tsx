import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import AnoNieHmClient from './AnoNieHmClient'

type P = { params: Promise<{ lang: string }> }

export default async function AnoNieHmPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return <AnoNieHmClient lang={lang} />
}
