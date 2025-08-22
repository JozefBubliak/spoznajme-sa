'use client'

import { Suspense } from 'react'
import LegacyApp from '@/components/LegacyApp'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LegacyApp />
    </Suspense>
  )
}
