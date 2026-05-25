'use client'
// /sk/herd-vote/play/[code]
// Uses the same _Join.tsx orchestrator as the main play route
import { useParams } from 'next/navigation'
import GameScreen from '@/app/[lang]/play/[code]/_Join'

export default function HerdVotePlayPage() {
  const params = useParams() as { code?: string; lang?: string }
  return (
    <GameScreen
      code={String(params?.code || '')}
      lang={String(params?.lang || 'sk')}
    />
  )
}
