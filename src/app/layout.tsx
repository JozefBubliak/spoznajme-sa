import type { Metadata } from 'next'
import MarketingLayout, { metadata as marketingMetadata } from './(marketing)/layout'

export const metadata: Metadata = marketingMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MarketingLayout>{children}</MarketingLayout>
      </body>
    </html>
  )
}
