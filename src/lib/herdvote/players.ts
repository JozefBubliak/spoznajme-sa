import { store } from '@/lib/herdvote/store'

export function addPlayerToGame(code: string, name: string) {
  const game = store.getGame(code)
  if (!game) return null
  const trimmed = String(name || '').trim()
  if (!trimmed) return null
  // ak už existuje rovnako nazvaný tím, vrátime existujúceho
  const existing = game.players.find(p => p.name.toLowerCase() === trimmed.toLowerCase())
  if (existing) return existing
  const p = {
    id: (globalThis.crypto?.randomUUID?.() ?? ${Date.now()}-),
    name: trimmed,
    score: 0
  }
  game.players.push(p)
  return p
}

export function listPlayers(code: string) {
  const game = store.getGame(code)
  return game ? game.players : []
}