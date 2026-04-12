import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { findToolById } from '@/lib/content'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string; id: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: rawLang, id } = await params
  const lang = normalizeUrlLocale(rawLang)
  return {
    title: `Technika ${id}`,
    description:
      'Fallback vstup podľa identifikátora techniky s presmerovaním na kanonickú URL, keď je známa.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/t/${id}`,
      languages: buildHreflangAlternates(`/t/${id}`),
    },
  }
}

export default async function Page({ params }: P) {
  const { lang: rawLang, id } = await params
  const lang = normalizeUrlLocale(rawLang)
  const tool = findToolById(lang, id)

  if (tool?.topicSlug && tool.slug) {
    redirect(`/${lang}/pomocky/tema/${tool.topicSlug}/${tool.slug}`)
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: 'Domov' },
          { href: `/${lang}/pomocky`, label: 'Pomôcky' },
          { label: `Technika ${id}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-semibold">Technika {id}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Tento identifikátor zatiaľ nemá priame presmerovanie na detail. Route však ostáva živá a
        vie ťa poslať do hlavného rozcestníka pomôcok.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${lang}/pomocky`}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Otvoriť pomôcky
        </Link>
        <Link
          href={`/${lang}/kompas`}
          className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
        >
          Prejsť na Kompas
        </Link>
      </div>
    </Container>
  )
}
