// PATH: src/app/[lang]/kompas/deti/page.tsx
import type { Metadata } from 'next'
import Kompas from '@/components/Kompas'

export const metadata: Metadata = {
  title: 'Komunikačný kompas – Deti | DeepTalks',
  description:
    'Vety a minipostupy pre deti. Vyber si tému.',
}

export default function Page() {
  return <Kompas />
}
