'use client'

import { useParams } from 'next/navigation'
import GameScreen from './_Join'

export default function PlayPage() {
  const params = useParams() as { code?: string; lang?: string }
  return <GameScreen code={String(params?.code || '')} lang={String(params?.lang || 'sk')} />
}
