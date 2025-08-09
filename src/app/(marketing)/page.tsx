import type { Metadata } from 'next'
import MarketingHomePage from '@/components/MarketingHomePage'

export const metadata: Metadata = {
  title: 'Spoznajme sa — otázky, ktoré prehlbujú vzťahy',
  description: 'Zmysluplné otázky pre partnerov, priateľov a rodinu. Začni zdarma a rozprávajte sa lepšie.',
  alternates: { canonical: 'https://deeptalks.eu/' },
  openGraph: {
    title: 'Spoznajme sa',
    description: 'Otázky, ktoré prehlbujú vzťahy.',
    url: 'https://deeptalks.eu/',
    siteName: 'Spoznajme sa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spoznajme sa',
    description: 'Otázky, ktoré prehlbujú vzťahy.',
  },
}

export default function Page() {
  return <MarketingHomePage />
}
