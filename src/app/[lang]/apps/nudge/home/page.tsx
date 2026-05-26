import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { getSession } from '@/app/api/games/_session'
import { NudgeApp } from './NudgeApp'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'Nudge Engine | DeepTalks',
}

export default async function NudgeHomePage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const session = await getSession()

  if (!session?.user) {
    const next = encodeURIComponent(`/${lang}/apps/nudge/home`)
    redirect(`/auth?next=${next}`)
  }

  return <NudgeApp lang={lang} userId={session.user.id} />
}
