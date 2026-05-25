import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DEV_COOKIE = 'cs_dev'
const DEV_TOKEN = 'allowed'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ochrana: iba /[lang]/apps/couplesync/play (a všetky sub-paths)
  const isPlayRoute = /^\/[a-z]{2}\/apps\/couplesync\/play/.test(pathname)

  if (isPlayRoute) {
    const cookie = request.cookies.get(DEV_COOKIE)
    if (cookie?.value !== DEV_TOKEN) {
      // Extrahuj jazyk z URL pre správny redirect
      const lang = pathname.split('/')[1] ?? 'sk'
      const unlockUrl = new URL(`/${lang}/apps/couplesync/unlock`, request.url)
      unlockUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(unlockUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Spusti middleware iba na couplesync/play routes
    '/:lang/apps/couplesync/play/:path*',
  ],
}
