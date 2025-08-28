// PATH: src/app/[lang]/kompas/pary/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { KOMPAS_SECTIONS_PARY } from '@/config/kompas-sections'

export const metadata: Metadata = {
  title: 'Komunikačný kompas – Páry | DeepTalks',
  description:
    'Vety a minipostupy pre komunikáciu v pároch. Vyberte si tému.',
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang } = await params
  const go = (p: string) => `/${lang}${p}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Komunikačný kompas – Páry</h1>
        <p className="text-muted-foreground max-w-2xl">
          Krátke, použiteľné vety a kroky pre páry. Otvor tému.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Témy</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {KOMPAS_SECTIONS_PARY.map((t) => (
            <Link
              key={t.slug}
              href={go(`/kompas/tema/${t.slug}`)}
              className="rounded-lg border p-4 hover:bg-muted transition block"
            >
              <div className="font-medium">{t.label}</div>
              <div className="text-sm text-muted-foreground">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
