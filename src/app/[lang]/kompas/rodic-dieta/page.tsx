// PATH: src/app/[lang]/kompas/rodic-dieta/page.tsx
import type { Metadata } from 'next'
import Kompas from '@/components/Kompas'


export const metadata: Metadata = {
  title: 'Komunikačný kompas – Rodič–dieťa | DeepTalks',
  description:

    'Vety a minipostupy pre komunikáciu medzi rodičom a dieťaťom. Vyber si tému.',

}

export default function Page() {
  return <Kompas />
}
