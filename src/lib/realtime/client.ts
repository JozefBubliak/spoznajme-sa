// src/lib/realtime/client.ts
// Supabase realtime client – subscribes to postgres_changes for instant state updates.
// Falls back silently if realtime is unavailable (e.g. missing env vars).

import type { RealtimeChannel } from '@supabase/supabase-js'

type ChangeCallback = () => void

class RealtimeClientImpl {
  private channels = new Map<string, RealtimeChannel>()
  private callbacks = new Map<string, Set<ChangeCallback>>()

  /**
   * Subscribe to DB changes for a game. Returns unsubscribe fn.
   * The callback is called whenever herd_games, herd_rounds, or herd_players change
   * for the given game code.
   */
  subscribeToGame(gameCode: string, onChange: ChangeCallback): () => void {
    const key = gameCode.toLowerCase()

    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, new Set())
    }
    this.callbacks.get(key)!.add(onChange)

    // Create channel if not already subscribed
    if (!this.channels.has(key)) {
      this._connect(key, gameCode)
    }

    return () => {
      const cbs = this.callbacks.get(key)
      if (cbs) {
        cbs.delete(onChange)
        if (cbs.size === 0) {
          this._disconnect(key)
        }
      }
    }
  }

  private _notify(key: string) {
    const cbs = this.callbacks.get(key)
    if (cbs) cbs.forEach(cb => { try { cb() } catch { /* ignore */ } })
  }

  private _connect(key: string, gameCode: string) {
    try {
      // Lazy import to avoid SSR issues
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!supabaseUrl || !supabaseAnonKey) return

      const { createClient } = require('@supabase/supabase-js')
      const client = createClient(supabaseUrl, supabaseAnonKey)

      const notify = () => this._notify(key)
      const filter = `game_code=eq.${gameCode.toUpperCase()}`

      // Channel name MUST match what server publishes to (herd-game-${key})
      // so that Supabase broadcast events are delivered.
      // postgres_changes provide DB-level redundancy; broadcast provides instant delivery.
      const channel = client
        .channel(`herd-game-${key}`)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'herd_games',
          filter: `code=eq.${gameCode.toUpperCase()}`
        }, notify)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'herd_rounds', filter
        }, notify)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'herd_players', filter
        }, notify)
        .on('postgres_changes', {
          event: '*', schema: 'public', table: 'herd_answers', filter
        }, notify)
        // Broadcast events from server (instant delivery, complements polling)
        .on('broadcast', { event: 'herd-event' }, notify)
        .subscribe()

      this.channels.set(key, channel)
    } catch {
      // Realtime not available – polling in the component will handle updates
    }
  }

  private _disconnect(key: string) {
    const ch = this.channels.get(key)
    if (ch) {
      try { ch.unsubscribe() } catch { /* ignore */ }
      this.channels.delete(key)
    }
    this.callbacks.delete(key)
  }
}

export const RealtimeClient = new RealtimeClientImpl()
