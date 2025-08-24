// PATH: src/app/[lang]/pomocky/rodic-dieta/indexy/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Indexy – rodič–dieťa | DeepTalks',
  description:
    'Prehľady tém: čo trápi rodičov v komunikácii a čo trápi deti – ako články na čítanie.',
}

export default function Page() {
  const items = [
    { href: 'co-trapi-rodicov', title: 'Čo trápi rodičov v komunikácii s deťmi' },
    { href: 'co-trapi-deti', title: 'Čo trápi deti v komunikácii s rodičmi' },
  ]

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6">Indexy – rodič–dieťa</h1>
      <p className="text-muted-foreground mb-8">
        Prehľady tém ako čitateľné články.
      </p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              className="text-primary underline underline-offset-4"
              href={i.href}
            >
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
