"use client"

export function Providers({ children }: { children: React.ReactNode }) {
  // Globálne providery (theme, queryClient, atď.) pridáme neskôr.
  return <>{children}</>
}
