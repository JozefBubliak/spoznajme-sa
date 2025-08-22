import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Session } from '@supabase/supabase-js'
/**
 * Returns the current user session or null if unauthenticated.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
    options: {
      cookieOptions: {
        name: 'sb-herd-auth-token',
      },
    },
  })
  const { data } = await supabase.auth.getSession()
  return data.session
}
