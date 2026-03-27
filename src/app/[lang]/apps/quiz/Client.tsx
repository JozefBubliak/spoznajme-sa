'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HostView from './HostView'
import PlayerView from './PlayerView'
import { LANGUAGE_OPTIONS } from './data/languages'
import { getQuestions } from './data/questions'

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
  const searchParams = useSearchParams()
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
  const codeFromUrl = (searchParams.get('code') || '').toUpperCase()
  const roleFromUrl = searchParams.get('role')

  useEffect(() => {
    if (!codeFromUrl) return
    setRole(roleFromUrl === 'host' ? 'host' : 'player')
    setPlayerCode(codeFromUrl)
  }, [codeFromUrl, roleFromUrl])

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
          <div className="grid gap-4 sm:grid-cols-1">
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
        </div>
      )}
    </div>
  )
}
