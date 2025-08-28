// PATH: src/app/[lang]/kompas/pary/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Komunikačný kompas – Páry | DeepTalks',
  description:
    'Vety a minipostupy pre komunikáciu v pároch. Obsah pripravujeme.',
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  await params
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Komunikačný kompas – Páry</h1>
      <p className="text-muted-foreground mt-3">
        Obsah pre toto publikum pripravujeme.
      </p>
    </div>
  )
}
