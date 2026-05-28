'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Languages, Settings, Users, Zap } from 'lucide-react'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

const LOCALE_LABELS: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  sk: { label: 'Slovenčina', flag: '🇸🇰' },
  cs: { label: 'Čeština', flag: '🇨🇿' },
  pl: { label: 'Polski', flag: '🇵🇱' },
  hu: { label: 'Magyar', flag: '🇭🇺' },
  fr: { label: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  uk: { label: 'Українська', flag: '🇺🇦' },
  ru: { label: 'Русский', flag: '🇷🇺' },
  es: { label: 'Español', flag: '🇪🇸' },
}

type Role = 'host' | 'player'

export default function HerdVoteEntryClient({ lang }: { lang: Locale }) {
  const router = useRouter()
  const [role, setRole] = useState<Role>('host')
  const [joinCode, setJoinCode] = useState('')
  const [showLanguages, setShowLanguages] = useState(false)
  const [err, setErr] = useState('')

  const selectedLocale = LOCALE_LABELS[lang]
  const normalizedCode = useMemo(() => joinCode.trim().toUpperCase(), [joinCode])

  const switchLanguage = (nextLang: Locale) => {
    setShowLanguages(false)
    router.push(`/${nextLang}/herd-vote`)
  }

  const joinGame = () => {
    if (!normalizedCode) {
      setErr('Zadaj kód hry.')
      return
    }
    setErr('')
    router.push(`/${lang}/herd-vote/play/${normalizedCode}`)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-purple-700 shadow-2xl shadow-purple-950/20">
          <Zap className="w-9 h-9" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Herd Vote</h1>
          <p className="text-white/65 mt-2">Pub quiz s moderátorom, otázkami a odpoveďami na mobile.</p>
        </div>
      </div>

      <div className="relative flex justify-center">
        <button
          type="button"
          onClick={() => setShowLanguages(v => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
          aria-expanded={showLanguages}
        >
          <Languages className="w-4 h-4" />
          <span>{selectedLocale.flag} {selectedLocale.label}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {showLanguages && (
          <div className="absolute top-12 z-20 grid w-64 grid-cols-2 gap-1 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {SUPPORTED_LOCALES.map(locale => (
              <button
                key={locale}
                type="button"
                onClick={() => switchLanguage(locale)}
                className={`rounded-xl px-3 py-2 text-left text-sm transition ${locale === lang ? 'bg-purple-500/25 text-purple-100' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
              >
                {LOCALE_LABELS[locale].flag} {LOCALE_LABELS[locale].label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRole('host')}
          className={`flex-1 rounded-2xl px-4 py-3 text-sm font-black transition ${role === 'host' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}`}
        >
          Moderátor
        </button>
        <button
          type="button"
          onClick={() => setRole('player')}
          className={`flex-1 rounded-2xl px-4 py-3 text-sm font-black transition ${role === 'player' ? 'bg-white text-purple-700 shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/15'}`}
        >
          Hráč
        </button>
      </div>

      <div className="hv-card-glow p-6 space-y-5">
        {role === 'host' ? (
          <>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl border border-purple-400/20 bg-purple-500/15 flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-200" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black text-white">Vytvoriť hru</h2>
                <p className="text-sm text-white/55 mt-1">Moderátor pripraví lobby, QR kód a potom ručne spúšťa otázky aj časovanie.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/${lang}/herd-vote/lobby`)}
              className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
            >
              Vstúpiť ako moderátor
            </button>
          </>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/15 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-200" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black text-white">Pripojiť sa</h2>
                <p className="text-sm text-white/55 mt-1">Zadaj kód z obrazovky moderátora. Meno doplníš hneď v čakárni hry.</p>
              </div>
            </div>
            <input
              value={joinCode}
              onChange={e => { setJoinCode(e.target.value.toUpperCase()); setErr('') }}
              onKeyDown={e => e.key === 'Enter' && joinGame()}
              maxLength={8}
              placeholder="KÓD HRY"
              className="hv-input w-full px-4 py-4 text-center text-3xl font-black font-mono tracking-[0.25em] uppercase"
            />
            {err && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                {err}
              </div>
            )}
            <button
              type="button"
              onClick={joinGame}
              className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
            >
              Pripojiť sa ku hre
            </button>
          </>
        )}
      </div>
    </div>
  )
}
