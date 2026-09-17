import 'server-only'
import { getSession } from '@/app/api/games/_session'

export async function adventureAccess(): Promise<'owner' | 'anonymous' | 'denied'> {
  const session = await getSession()
  if (!session) return 'anonymous'
  const user = session.user
  return user.email_confirmed_at && user.email?.trim().toLowerCase() === 'jozef.bubliak@gmail.com'
    ? 'owner' : 'denied'
}
