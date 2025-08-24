'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setEmail(data.user?.email ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null)
    })
    return () => {
      sub.subscription.unsubscribe()
      mounted = false
    }
  }, [])

  if (loading) return null

  if (!email) {
    return <span className="text-sm text-muted-foreground">Neprihlásený</span>
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Prihlásený ako <b>{email}</b></span>
      <Button
        size="sm"
        variant="outline"
        onClick={async () => { await supabase.auth.signOut() }}
      >
        Odhlásiť
      </Button>
    </div>
  )
}

