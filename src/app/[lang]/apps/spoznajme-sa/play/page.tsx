'use client'

import { Suspense } from 'react'
import PlayApp from '@/components/PlayApp'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PlayApp />
    </Suspense>
  )
}
