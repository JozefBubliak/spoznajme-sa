// src/app/(marketing)/page.tsx
import MarketingHomePage from '@/components/MarketingHomePage'

export const metadata = {
  title: 'Spoznajme sa',
  description: 'Zmysluplné otázky na prehĺbenie rozhovorov.',
}

export default function Page() {
  return <MarketingHomePage />
}
