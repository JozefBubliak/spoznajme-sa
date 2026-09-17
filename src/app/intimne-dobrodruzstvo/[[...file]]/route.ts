import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { adventureAccess } from '@/lib/adventure-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Vary': 'Cookie, Authorization',
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ file?: string[] }> }) {
  const { file = [] } = await params
  const isDocument = file.length === 0 || file.join('/') === 'index.html'
  const access = await adventureAccess()
  if (access !== 'owner') {
    if (access === 'anonymous' && isDocument) {
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('next', '/sk/apps/intimne-dobrodruzstvo')
      return NextResponse.redirect(url, { status: 307, headers: privateHeaders })
    }
    return new NextResponse('Not found', { status: 404, headers: privateHeaders })
  }
  if (file.some(part => !/^[a-zA-Z0-9_.-]+$/.test(part) || part === '.' || part === '..')) {
    return new NextResponse('Not found', { status: 404, headers: privateHeaders })
  }
  const relative = file.length ? file.join('/') : 'index.html'
  if (relative !== 'index.html' && !/^assets\/[a-zA-Z0-9_.-]+\.(js|css|woff2|svg|png|webp)$/.test(relative)) {
    return new NextResponse('Not found', { status: 404, headers: privateHeaders })
  }
  const root = path.join(process.cwd(), 'modules', 'intimne-dobrodruzstvo', 'dist')
  const types: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' }
  try {
    const content = await readFile(path.join(root, relative))
    return new NextResponse(new Uint8Array(content), { headers: { ...privateHeaders, 'Content-Type': types[path.extname(relative)] || 'application/octet-stream', 'Content-Security-Policy': "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" } })
  } catch {
    return new NextResponse('Not found', { status: 404, headers: privateHeaders })
  }
}
