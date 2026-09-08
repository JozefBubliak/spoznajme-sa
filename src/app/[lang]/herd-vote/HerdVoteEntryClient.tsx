'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Languages, Settings, Users } from 'lucide-react'
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
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Role toggle */}
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-white/10 p-1.5 backdrop-blur-md border border-white/10">
        <button
          type="button"
          onClick={() => setRole('host')}
          className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${role === 'host' ? 'bg-white text-purple-700 shadow-lg' : 'text-white/70 hover:text-white'}`}
        >
          Moderujem
        </button>
        <button
          type="button"
          onClick={() => setRole('player')}
          className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${role === 'player' ? 'bg-white text-purple-700 shadow-lg' : 'text-white/70 hover:text-white'}`}
        >
          Hrám
        </button>
      </div>

      <div className="hv-card-glow p-6 space-y-5">
        {role === 'host' ? (
          <>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl border border-purple-400/20 bg-purple-500/15 flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-200" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-black text-white">Vytvoriť hru</h2>
                <p className="text-sm text-white/55 mt-0.5">Pripravíš lobby, QR kód a ručne riadiš otázky aj časomieru.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/${lang}/herd-vote/lobby`)}
              className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
            >
              Vstúpiť ako moderátor →
            </button>
          </>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-200" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-black text-white">Pripojiť sa</h2>
                <p className="text-sm text-white/55 mt-0.5">Zadaj kód z obrazovky moderátora. Meno doplníš hneď v čakárni.</p>
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
              Pripojiť sa ku hre →
            </button>
          </>
        )}
      </div>

      {/* Language */}
      <div className="relative flex justify-center">
        <button
          type="button"
          onClick={() => setShowLanguages(v => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold text-white/70 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
          aria-expanded={showLanguages}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{selectedLocale.flag} {selectedLocale.label}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        {showLanguages && (
          <div className="absolute top-10 z-20 grid w-64 grid-cols-2 gap-1 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
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
    </div>
  )
}
