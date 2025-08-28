// PATH: src/app/[lang]/kompas/pary/page.tsx
import type { Metadata } from 'next'
import Kompas from '@/components/Kompas'


export const metadata: Metadata = {
  title: 'Komunikačný kompas – Páry | DeepTalks',
  description:

    'Vety a minipostupy pre komunikáciu v pároch. Vyberte si tému.',

}

export default function Page() {
  return <Kompas />
}
