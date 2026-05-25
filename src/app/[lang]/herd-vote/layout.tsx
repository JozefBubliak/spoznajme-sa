'use client'
// Standalone Herd Vote hub — own nav, no global SiteHeader
import { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

function HerdVoteNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const isPlay = pathname?.includes('/play/')

  // During an active game, show minimal nav
  if (isPlay) {
    return (
      <header className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href={`/${lang}/herd-vote`}
            className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">
            <span>🐂</span>
            <span className="font-mono tracking-widest text-xs">HERD VOTE</span>
          </Link>
          <Link href={`/${lang}/herd-vote`}
            className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Odísť z hry
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-[hsl(250_30%_8%/0.92)] backdrop-blur-sm border-b border-white/8">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href={`/${lang}/herd-vote`}
          className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-base">
            🐂
          </div>
          <span className="font-black tracking-widest text-xs text-white uppercase">Herd Vote</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-semibold uppercase tracking-widest">
          <Link href={`/${lang}/herd-vote`}
            className="text-white/50 hover:text-white transition-colors">
            Hra
          </Link>
          <Link href={`/${lang}/herd-vote/kategorie`}
            className="text-white/50 hover:text-white transition-colors">
            Kategórie
          </Link>
          <Link href={`/${lang}/b2b`}
            className="text-white/50 hover:text-white transition-colors">
            Firmy & školy
          </Link>
        </nav>

        {/* Auth + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <span className="hidden md:block text-xs text-white/30 truncate max-w-[140px]">
                {user.email}
              </span>
              <button onClick={signOut}
                className="text-xs text-white/40 hover:text-white/70 transition-colors">
                Odhlásiť
              </button>
            </>
          ) : (
            <Link href={`/auth?next=/${lang}/herd-vote/lobby`}
              className="text-xs text-white/50 hover:text-white transition-colors">
              Prihlásiť sa
            </Link>
          )}
          <Link href={`/${lang}/herd-vote/lobby`}
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors">
            Vytvoriť hru
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function HerdVoteHubLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = use(params)

  return (
    <div className="min-h-screen" style={{ background: 'hsl(250 25% 6%)' }}>
      <HerdVoteNav lang={lang} />
      {/* Offset for fixed nav */}
      <div className="pt-14">
        {children}
      </div>
    </div>
  )
}
