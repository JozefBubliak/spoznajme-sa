'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PlayOldPage() {
  const params = useParams() as { code?: string; lang?: string }
  const router = useRouter()
  const code = String(params?.code || '')
  const lang = String(params?.lang || 'sk')

  useEffect(() => {
    router.replace(`/${lang}/herd-vote/play/${code}`)
  }, [code, lang, router])

  return (
    <div className="hv-bg flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
