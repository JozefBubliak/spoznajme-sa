'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Player, Round } from '@/lib/herdvote/store'
import { useAuth } from '@/hooks/useAuth'
import { Trophy, UserCircle } from 'lucide-react'

interface ClientProps {
  lang: string
}

type Role = 'host' | 'player'

function generateCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let value = ''
  for (let i = 0; i < 6; i += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return value
}

export default function QuizClient({ lang }: ClientProps) {
  const [role, setRole] = useState<Role | null>(null)
  const [hostLanguage, setHostLanguage] = useState(() => {
    const normalized = lang.toLowerCase()
    const match = LANGUAGE_OPTIONS.find(option => option.code === normalized)
    return match ? match.code : 'en'
  })
  const [hostCode, setHostCode] = useState('')

  const [playerCode, setPlayerCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [joining, setJoining] = useState(false)

  const availableLanguages = useMemo(() => LANGUAGE_OPTIONS, [])

  const startHostLobby = () => {
    if (!hostLanguage) return
    setHostCode(generateCode())
  }

  const resetHost = () => {
    setHostCode('')
    setRole(null)
  }

  const handlePlayerJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!playerCode || !playerName) return
    setJoining(true)
  }

  const resetPlayer = () => {
    setJoining(false)
    setRole(null)
    setPlayerCode('')
    setPlayerName('')
  }

  const selectedQuestions = useMemo(() => getQuestions(hostLanguage), [hostLanguage])

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-wide text-slate-500">Herd Vote</p>
        <h1 className="text-3xl font-bold text-slate-900">Tímový kvíz pripravený na rýchlu zábavu</h1>
        <p className="text-base text-slate-600">
          Vyberte si úlohu moderátora alebo hráča a pripojte sa do spoločnej hry pomocou zdieľaného kódu.
        </p>
      </header>

      {role === null && (
        <section className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">Moderátor</h2>
              <p className="text-sm text-slate-600">
                Vytvorte lobby, pozvite hráčov a riadte tempo hry. Prepínajte otázky a sledujte skóre v reálnom čase.
              </p>
            </div>
            <button
              className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              onClick={() => setRole('host')}
            >
              Chcem moderovať
            </button>
          </article>

          <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">Hráč</h2>
              <p className="text-sm text-slate-600">
                Zadajte kód od moderátora a súťažte s ostatnými. Každá správna odpoveď posúva váš tím bližšie k víťazstvu.
              </p>
            </div>
            <button
              className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              onClick={() => setRole('player')}
            >
              Chcem hrať
            </button>
          </article>
        </section>
      )}

      {role === 'host' && !hostCode && (
        <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Nastavenie kvízu</h2>
            <p className="text-sm text-slate-600">Vyberte jazyk otázok a spustite lobby pre svoj tím.</p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-700">
              <span>Jazyk otázok</span>
              <select
                value={hostLanguage}
                onChange={event => setHostLanguage(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                {availableLanguages.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.flag} {option.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-col gap-2 text-sm text-slate-700">
              <span>Počet otázok</span>
              <p className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">
                {selectedQuestions.length} otázok pripravených v balíku.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              onClick={startHostLobby}
            >
              Vytvoriť lobby
            </button>
            <button
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setRole(null)}
            >
              Späť
            </button>
          </div>
        </section>
      )}

      {role === 'host' && hostCode && (
        <HostView
          code={hostCode}
          language={hostLanguage}
          questions={selectedQuestions}
          onResetLobby={resetHost}
        />
      )}

      {role === 'player' && !joining && (
        <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Pripojiť sa do hry</h2>
            <p className="text-sm text-slate-600">Vyplňte kód od moderátora a svoje meno.</p>
          </header>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handlePlayerJoin}>
            <label className="flex flex-col gap-2 text-sm text-slate-700">
              <span>Kód hry</span>
              <input
                value={playerCode}
                onChange={event => setPlayerCode(event.target.value.toUpperCase())}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm uppercase tracking-widest"
                required
                maxLength={6}
                minLength={4}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700">
              <span>Meno hráča</span>
              <input
                value={playerName}
                onChange={event => setPlayerName(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                required
              />
            </label>
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Pridať sa do hry
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setRole(null)}
              >
                Späť
              </button>
            </div>
          </form>
        </section>
      )}

      {role === 'player' && joining && (
        <div className="space-y-4">
          <PlayerView code={playerCode} name={playerName} />
          <div className="flex justify-end">
            <button
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={resetPlayer}
            >
              Odpojiť sa
            </button>
          </div>

          {showRoundControls && (
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">Ovládanie kola</h2>
                <div className="flex flex-col text-xs text-muted-foreground text-right">
                  {runningRound && <span>Prebieha kolo #{runningRound.index + 1}</span>}
                  {!runningRound && lockedRound && (
                    <span>Čaká sa na vyhodnotenie kola #{lockedRound.index + 1}</span>
                  )}
                  {!runningRound && !lockedRound && resultsRound && (
                    <span>Zobrazené výsledky kola #{resultsRound.index + 1}</span>
                  )}
                  {canStartNextRound && startableRound && (
                    <span>Pripravené kolo: #{startableRound.index + 1}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    void startRound()
                  }}
                  disabled={!canStartNextRound}
                  className="px-3 py-2 rounded bg-green-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {startRoundLoading ? 'Spúšťam…' : 'Začať pripravené kolo'}
                </button>
                <button
                  onClick={() => {
                    void lockRound(runningRound?.roundId)
                  }}
                  disabled={!runningRound}
                  className="px-3 py-2 rounded bg-orange-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Uzamknúť odpovede
                </button>
                <button
                  onClick={() => {
                    void showResults(lockedRound?.roundId)
                  }}
                  disabled={!lockedRound}
                  className="px-3 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Zobraziť výsledky
                </button>
                <button
                  onClick={() => {
                    void nextQuestion(resultsRound?.roundId)
                  }}
                  disabled={!resultsRound}
                  className="px-3 py-2 rounded bg-purple-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Ďalšia otázka v kole
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Odpovede sa po uplynutí času uzamknú automaticky. Manuálne zásahy použite len pri výnimočných situáciách
                (napríklad keď chcete kolo ukončiť skôr alebo ak časovač zlyhá).
              </p>
              {startableRound && !canStartNextRound && (
                <p className="text-xs text-muted-foreground">
                  Ďalšie kolo #{startableRound.index + 1} sa pripraví po dokončení aktuálneho kola a zobrazení výsledkov.
                </p>
              )}
              {!startableRound && diagnostics.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Všetky kolá sú spracované. Po ukončení výsledkov sa hra automaticky presunie do ďalšieho kroku.
                </p>
              )}

            </div>
          )}

          {leaderboard.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Trophy className="h-5 w-5 text-amber-500" /> Priebežný rebríček
                </h2>
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Aktualizované po poslednej otázke
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Body sa sčítavajú naprieč otázkami v aktuálnom kole. Vedenie sa môže meniť po každej odpovedi,
                preto sledujte poradie priebežne.
              </p>
              <ul className="mt-4 space-y-2">
                {leaderboard.map((pl, idx) => {
                  const styles = [
                    {
                      card: 'border-amber-200 bg-amber-50 text-amber-800',
                      badge: 'border-amber-300 bg-amber-100 text-amber-700',
                      caption: 'Vedúci tím',
                    },
                    {
                      card: 'border-sky-200 bg-sky-50 text-sky-800',
                      badge: 'border-sky-300 bg-sky-100 text-sky-700',
                      caption: 'Na dostrel víťazstva',
                    },
                    {
                      card: 'border-violet-200 bg-violet-50 text-violet-800',
                      badge: 'border-violet-300 bg-violet-100 text-violet-700',
                      caption: 'Ešte v medailovej hre',
                    },
                  ][idx] ?? {
                    card: 'border-slate-200 bg-white text-slate-700',
                    badge: 'border-slate-300 bg-slate-100 text-slate-600',
                    caption: 'Pripravení zabrať v ďalšej otázke',
                  }

                  const cardClasses = [
                    'flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition',
                    styles.card,
                  ].join(' ')
                  const badgeClasses = [
                    'flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold',
                    styles.badge,
                  ].join(' ')

                  return (
                    <li key={pl.id} className={cardClasses}>
                      <div className="flex items-center gap-3">
                        <span className={badgeClasses}>{idx + 1}</span>
                        <div>
                          <p className="text-sm font-semibold text-current">{pl.name || '—'}</p>
                          <p className="text-xs text-slate-500">{styles.caption}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-current">{pl.score} bodov</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
