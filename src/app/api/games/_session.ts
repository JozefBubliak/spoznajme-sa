import { cookies, headers } from 'next/headers'
import { createClient, type Session } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/lib/supabaseClient'

/**
 * Returns the current user session or null if unauthenticated.
 * Reads the Supabase auth cookie and verifies it against Supabase.
 */
export async function getSession(): Promise<Session | null> {
  const headerStore = headers()
  let token = headerStore.get('authorization')?.replace('Bearer ', '') || undefined

  if (!token) {
    const cookieStore = cookies()
    token = cookieStore
      .getAll()
      .find((c) => c.name.includes('-auth-token'))?.value
  }
  if (!token) return null

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return null

  return {
    access_token: token,
    token_type: 'bearer',
    expires_in: 0,
    refresh_token: '',
    user: data.user,
  } as Session
}
