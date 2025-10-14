import { Metadata } from 'next'
import ClientLayout from './ClientLayout'
import { MarketingHeader } from '@/components/MarketingHeader'
import { MarketingFooter } from '@/components/MarketingFooter'

export const metadata: Metadata = {
  title: 'DeepTalks – Questions that connect deeply',
  description: 'DeepTalks helps partners, friends and families connect through meaningful, guided questions.',
  alternates: {
    canonical: 'https://deeptalks.eu/',
  },
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
      </div>
    </ClientLayout>
  )
}
