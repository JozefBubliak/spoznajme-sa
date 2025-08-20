import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Session } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/lib/supabaseClient'

/**
 * Returns the current user session or null if unauthenticated.
 */
export async function getSession(): Promise<Session | null> {
  const supabase = createRouteHandlerClient({
    cookies,
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_PUBLISHABLE_KEY,
    options: {
      cookieOptions: {
        name: 'sb-herd-auth-token',
      },
    },
  })
  const { data } = await supabase.auth.getSession()
  return data.session
}
