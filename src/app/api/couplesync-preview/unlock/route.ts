import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import {
  COUPLESYNC_PREVIEW_COOKIE,
  COUPLESYNC_PREVIEW_MAX_AGE,
} from '@/lib/couplesync-preview'

function matchesSecret(value: string, expected: string): boolean {
  const actualBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export async function POST(request: Request) {
  const expectedCode = process.env.COUPLESYNC_PREVIEW_PASSWORD
  const previewToken = process.env.COUPLESYNC_PREVIEW_TOKEN

  if (!expectedCode || !previewToken) {
    return NextResponse.json({ error: 'Preview access is not configured.' }, { status: 503 })
  }

  const isFormSubmission = request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')
  const payload = isFormSubmission
    ? await request.formData().catch(() => null)
    : await request.json().catch(() => null)
  const code = payload instanceof FormData
    ? payload.getAll('digit').join('')
    : typeof payload?.code === 'string' ? payload.code : ''
  const requestedNext = payload instanceof FormData ? payload.get('next') : null
  const nextPath = typeof requestedNext === 'string' && requestedNext.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/sk/apps/couplesync/play'

  if (!matchesSecret(code, expectedCode)) {
    if (isFormSubmission) {
      const lang = nextPath.match(/^\/([a-z]{2})\//)?.[1] ?? 'sk'
      const unlockUrl = new URL(`/${lang}/apps/couplesync/unlock`, request.url)
      unlockUrl.searchParams.set('next', nextPath)
      unlockUrl.searchParams.set('error', '1')
      return NextResponse.redirect(unlockUrl, 303)
    }
    return NextResponse.json({ error: 'Invalid code.' }, { status: 401 })
  }

  const response = isFormSubmission
    ? NextResponse.redirect(new URL(nextPath, request.url), 303)
    : NextResponse.json({ ok: true })
  response.cookies.set(COUPLESYNC_PREVIEW_COOKIE, previewToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COUPLESYNC_PREVIEW_MAX_AGE,
  })
  return response
}
