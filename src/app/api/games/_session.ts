import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  ''

export type SessionUser = { id: string; email?: string | null }
export type Session = { user: SessionUser } | null

/**
 * Vyberie bearer token z Authorization hlavičky alebo cookie 'sb-access-token'
 * a cez Supabase zistí aktuálneho používateľa.
 */
export async function getSession(req: NextRequest): Promise<Session> {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined
  const cookieToken = req.cookies.get('sb-access-token')?.value
  const token = bearer || cookieToken
  if (!token || !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return null

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) return null

  return { user: { id: data.user.id, email: data.user.email } }
}
