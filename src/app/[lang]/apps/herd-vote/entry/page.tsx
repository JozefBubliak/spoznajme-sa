// PATH: src/app/[lang]/apps/herd-vote/entry/page.tsx
'use client'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default function HerdVoteEntry() {
  const params = useParams<{ lang: string }>()
  const lang = params?.lang || 'sk'
  const router = useRouter()

  return (
    <div className="mx-auto max-w-md p-6 space-y-4">
      <Card className="cursor-pointer" onClick={() => router.push(`/${lang}/play`)}>
        <CardHeader className="text-center">
          <CardTitle>Hráč</CardTitle>
        </CardHeader>
      </Card>
      <Card className="cursor-pointer" onClick={() => router.push(`/${lang}/apps/herd-vote`)}>
        <CardHeader className="text-center">
          <CardTitle>Moderátor</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
