'use client'
import { useEffect } from 'react'
import { supabaseClient } from '@/integrations/supabase/client'

type Handlers = {
  onQuestionShow?: (q: any) => void
  onTimerStart?: () => void
  onRoundLock?: () => void
  onResults?: (data: any) => void
  onRoundFinish?: (payload: any) => void
  onFinish?: () => void
  onPlayerJoined?: (player: any) => void
  onLobbyLocked?: () => void
  onGameStarted?: () => void
}

export default function useRealtimeGame(code: string, handlers: Handlers) {
  useEffect(() => {
    if (!code) return

    const channel = supabaseClient.channel(`herd-game-${code.toLowerCase()}`)

    channel
      .on('broadcast', { event: 'herd-event' }, (payload) => {
        const event = payload.payload
        switch (event.type) {
          case 'question:show':
            handlers.onQuestionShow?.(event.payload)
            break
          case 'timer:start':
            handlers.onTimerStart?.()
            break
          case 'round:lock':
            handlers.onRoundLock?.()
            break
          case 'round:results':
            handlers.onResults?.(event.payload)
            break
          case 'round:finish':
            if (handlers.onRoundFinish) handlers.onRoundFinish(event.payload)
            else handlers.onFinish?.()
            break
          case 'game:finish':
            handlers.onFinish?.()
            break
          case 'player:joined':
            handlers.onPlayerJoined?.(event.payload)
            break
          case 'lobby:locked':
            handlers.onLobbyLocked?.()
            break
          case 'game:started':
            handlers.onGameStarted?.()
            break
          default:
            break
        }
      })
      .subscribe()

    return () => {
      supabaseClient.removeChannel(channel)
    }
  }, [code, handlers])
}
