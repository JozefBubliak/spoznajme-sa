import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import QuizAdminClient from './Client'

export const dynamic = 'force-dynamic'

type P = { params: Promise<{ lang: string }> }

export default async function QuizPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  return <QuizAdminClient lang={lang} />
}
