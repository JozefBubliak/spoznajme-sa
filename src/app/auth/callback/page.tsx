
'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleRedirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // počkaj na session

      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      console.log('[CALLBACK] Session:', session)
      console.log('[CALLBACK] User:', user)

      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        navigate('/admin')
      } else {
        navigate('/app')
      }
    }

    handleRedirect()
  }, [navigate])

  return <p className="text-center p-10 text-gray-500">Prihlasovanie...</p>
}
