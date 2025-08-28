// PATH: src/app/[lang]/kompas/rodic-dieta/page.tsx
import type { Metadata } from 'next'

import Link from 'next/link'
import { KOMPAS_SECTIONS_RODIC_DIETA } from '@/config/kompas-sections'


export const metadata: Metadata = {
  title: 'Komunikačný kompas – Rodič–dieťa | DeepTalks',
  description:

    'Vety a minipostupy pre komunikáciu medzi rodičom a dieťaťom. Vyber si tému.',

}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang } = await params
  const go = (p: string) => `/${lang}${p}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Komunikačný kompas – Rodič–dieťa</h1>
        <p className="text-muted-foreground max-w-2xl">
          Krátke, použiteľné vety a kroky do bežných situácií medzi rodičom a dieťaťom. Otvor tému.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Témy</h2>
        <div className="grid md:grid-cols-2 gap-3">

          {KOMPAS_SECTIONS_RODIC_DIETA.map((t) => (

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
