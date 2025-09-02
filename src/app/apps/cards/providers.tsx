"use client"

import ErrorBoundary from '@/components/ErrorBoundary'
import { LangProvider } from '@/components/LangProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  // Globálne providery (theme, queryClient, atď.) pridáme neskôr.
  return (
    <LangProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </LangProvider>
  )
}
