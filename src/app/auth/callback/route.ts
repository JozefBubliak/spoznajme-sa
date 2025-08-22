import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error_description') ?? searchParams.get('error')
  const next = searchParams.get('next') ?? undefined

  const supabase = createRouteHandlerClient({ cookies })

  if (error) {
    return NextResponse.redirect(new URL(`/auth/error?m=${encodeURIComponent(error)}`, origin))
  }

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      return NextResponse.redirect(
        new URL(`/auth/error?m=${encodeURIComponent(exchangeError.message)}`, origin)
      )
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userEmail = session?.user?.email

  if (next) {
    return NextResponse.redirect(new URL(next, origin))
  }

  if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
    return NextResponse.redirect(new URL('/admin', origin))
  }

  return NextResponse.redirect(new URL('/app', origin))
}

