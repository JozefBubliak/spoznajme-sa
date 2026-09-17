import 'server-only'
import { getSession } from '@/app/api/games/_session'

export async function adventureAccess(): Promise<'owner' | 'anonymous' | 'denied'> {
  const session = await getSession()
  if (!session) return 'anonymous'
  const email = session.user.email?.trim().toLowerCase()
  return email === 'jozef.bubliak@gmail.com' ? 'owner' : 'denied'
}
