import { redirect } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; audience: string; tema: string; technika: string }> }

export default async function Page({ params }: P) {
  const { lang: raw, tema, technika } = await params
  const lang = normalizeUrlLocale(raw)

  redirect(`/${lang}/pomocky/tema/${tema}/${technika}`)
}
