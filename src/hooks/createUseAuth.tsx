import { useState, useEffect } from 'react'
import type { SupabaseClient, User, Session } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  paid_access: boolean
  daily_questions_date: string | null
  daily_questions_used: number
}

export function createUseAuth(client: SupabaseClient, cookieName?: string) {
  return function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const {
        data: { subscription },
      } = client.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          const { id, email } = session.user
          setTimeout(async () => {
            try {
              const { data: profileData } = await client
                .from('user_profiles')
                .select('*')
                .eq('id', id)
                .single()

              if (!profileData) {
                const { data: inserted } = await client
                  .from('user_profiles')
                  .insert({
                    id,
                    email: email ?? '',
                    paid_access: false,
                    daily_questions_date: null,
                    daily_questions_used: 0,
                  })
                  .select('*')
                  .single()
                setProfile(inserted)
              } else {
                setProfile(profileData)
              }
            } catch {
              setProfile(null)
            }
          }, 0)
        } else {
          setProfile(null)
        }
      })

      client.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    }, [client])

    const signOut = async () => {
      await client.auth.signOut()
      if (cookieName) {
        document.cookie = `${cookieName}=; path=/; max-age=0`
      }
    }

    return {
      user,
      session,
      profile,
      loading,
      signOut,
      isPaid: profile?.paid_access || false,
    }
  }
}
