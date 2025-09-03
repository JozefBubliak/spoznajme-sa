import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

// Temporary wrapper to expose the new quiz (beta) build
export const dynamic = 'force-dynamic'

type P = { params: Promise<{ lang: string }> }

export default async function QuizMasterPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  return (
    <iframe
      src="/apps/quiz"
      title="Quiz Master"
      className="w-full h-screen border-0"
    />
  )
}
