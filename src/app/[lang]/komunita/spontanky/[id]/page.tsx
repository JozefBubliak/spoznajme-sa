import { notFound } from 'next/navigation'
import Link from 'next/link'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { DetailView } from '@/components/spontanky/DetailView'
import type { SpontankaDetail } from '@/lib/spontanky/types'

type P = { params: Promise<{ lang: string; id: string }> }

async function getSpontanka(id: string): Promise<SpontankaDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/spontanky/${id}`, {
      next: { revalidate: 30 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default async function SpontankaDetailPage({ params }: P) {
  const { lang: raw, id } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const data = await getSpontanka(id)
  if (!data) notFound()

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://deeptalks.eu'}/${lang}/komunita/spontanky/${id}`

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href={`/${lang}/komunita/spontanky`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Spontánky
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <DetailView initial={data} lang={lang} baseUrl={baseUrl} />
      </div>
    </div>
  )
}
