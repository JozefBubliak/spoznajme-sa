// PATH: src/app/[lang]/apps/herd-vote/page.tsx
'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminWizard from './AdminWizard'
import { useAuth } from '@/hooks/useAuth'

export default function HerdVoteAdminPage() {
  const { lang } = useParams<{ lang: string }>()
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=/${lang}/apps/herd-vote`)
    }
  }, [loading, user, router, lang])

  if (!user) return null

  return <AdminWizard />
}

