'use client'
import { useRouter } from 'next/navigation'

'use client'

import { useEffect } from 'react'

import { supabase } from '@/lib/supabaseClient'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // počkaj na session

      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      console.log('[CALLBACK] Session:', session)
      console.log('[CALLBACK] User:', user)

      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        router.push('/admin')
      } else {
        router.push('/app')
      }
    }

    handleRedirect()
  }, [])

  return <p className="text-center p-10 text-gray-500">Prihlasovanie...</p>
}
