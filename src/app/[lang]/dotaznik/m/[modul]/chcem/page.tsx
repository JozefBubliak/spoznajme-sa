import { notFound, redirect } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul } from '@/lib/dotaznik/strom'

type P = { params: Promise<{ lang: string; modul: string }> }

// Screening je zlúčený do stránky modulu — starý odkaz `/chcem` len presmeruje.
export default async function ModulChcemRedirect({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  redirect(`/${lang}${cesta.modul(modul.slug)}`)
}
