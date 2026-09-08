import { normalizeUrlLocale } from '@/lib/i18n-routing'
import ParClient from './_client'

type P = { params: Promise<{ lang: string }> }

export default async function ParKrok({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return <ParClient lang={lang} />
}
