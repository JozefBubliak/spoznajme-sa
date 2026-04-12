import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import HerdVoteClient from '../Client'

export const dynamic = 'force-dynamic'

type P = { params: Promise<{ lang: string }> }

export default async function HerdVoteAdminPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return <HerdVoteClient lang={lang} />
}
