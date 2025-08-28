'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type LangContextType = {
  lang: string
  setLang: (lang: string) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('sk')

  const t = (key: string) => translations[lang][key] || key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

const translations: Record<string, Record<string, string>> = {
  sk: {
    startGame: 'Začať hru',
    joinGame: 'Pripojiť sa',
    players: 'Hráči',
    final: 'Konečné poradie',
  },
  en: {
    startGame: 'Start game',
    joinGame: 'Join game',
    players: 'Players',
    final: 'Final results',
  },
}
