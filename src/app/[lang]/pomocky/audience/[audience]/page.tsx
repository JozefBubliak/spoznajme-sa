import { notFound, redirect } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getKompasAudienceBySlug } from '@/lib/kompas-content'

type P = { params: Promise<{ lang: string; audience: string }> }

export default async function Page({ params }: P) {
  const { lang: raw, audience: rawAudience } = await params
  const lang = normalizeUrlLocale(raw)
  const audience = getKompasAudienceBySlug(rawAudience.toLocaleLowerCase())

  if (!audience) {
    notFound()
  }

  redirect(`/${lang}${audience.canonicalHref}`)
}
