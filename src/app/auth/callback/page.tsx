'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      // krátka pauza, kým sa stihne vytvoriť session po návrate z OAuth
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const {
        data: { session },
      } = await supabase.auth.getSession()
      const user = session?.user

      console.log('[CALLBACK] Session:', session)
      console.log('[CALLBACK] User:', user)

      if (user?.email && ADMIN_EMAILS.includes(user.email)) {
        router.push('/admin')
      } else {
        router.push('/app')
      }
    }

    handleRedirect()
  }, [router])

  return <p className="text-center p-10 text-gray-500">Prihlasovanie...</p>
}
