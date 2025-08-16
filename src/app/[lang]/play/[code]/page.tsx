// PATH: src/app/[lang]/play/[code]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import PlayJoin from './_Join'

export default function PlayJoinRoot() {
  const params = useParams() as { code?: string }
  return <PlayJoin code={String(params?.code || '')} />
}
