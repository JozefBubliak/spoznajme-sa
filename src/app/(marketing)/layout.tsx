'use client'

import { I18nProvider } from '@/i18n'
import { MarketingHeader } from '@/components/MarketingHeader'
import { MarketingFooter } from '@/components/MarketingFooter'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
      </div>
    </I18nProvider>
  )
}
