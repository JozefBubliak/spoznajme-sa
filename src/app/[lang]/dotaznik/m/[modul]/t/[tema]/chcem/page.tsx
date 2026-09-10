import { notFound, redirect } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema } from '@/lib/dotaznik/strom'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

// Screening je zlúčený do stránky témy — starý odkaz `/chcem` len presmeruje.
export default async function TemaChcemRedirect({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  redirect(`/${lang}${cesta.tema(found.modul.slug, found.tema.slug)}`)
}
