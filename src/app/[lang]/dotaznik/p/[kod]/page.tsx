import { normalizeUrlLocale } from '@/lib/i18n-routing'
import ParDashboard from './_dashboard'

type P = { params: Promise<{ lang: string; kod: string }> }

export default async function ParPage({ params }: P) {
  const { lang: raw, kod } = await params
  const lang = normalizeUrlLocale(raw)
  return <ParDashboard lang={lang} kod={kod.toUpperCase()} />
}
