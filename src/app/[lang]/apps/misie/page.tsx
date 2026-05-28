import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import OfflineToolClient from '../_offline-tools/OfflineToolClient'
import { OFFLINE_TOOLS } from '../_offline-tools/tools'

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  return <OfflineToolClient tool={OFFLINE_TOOLS.misie} lang={lang as Locale} />
}
