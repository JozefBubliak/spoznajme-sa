import 'server-only'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  ''

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  ''

export type SessionInfo = {
  token: string
  userId: string
  email?: string | null
} | null

export async function getSession(req: NextRequest): Promise<SessionInfo> {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization')
  const tokenFromHeader = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined

  const cookieToken =
    req.cookies.get('sb-access-token')?.value ??
    req.cookies.get('supabase-auth-token')?.value

  const token = tokenFromHeader || cookieToken
  if (!token || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) return null

  return { token, userId: data.user.id, email: data.user.email }
}

export function getBearerToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization')
  return auth?.startsWith('Bearer ') ? auth.slice(7) : null
}
