'use client'
import { useEffect } from 'react'

type Handlers = {
  onQuestionShow?: (q: any) => void
  onTimerStart?: () => void
  onRoundLock?: () => void
  onResults?: (data: any) => void
  onFinish?: () => void
}

export default function useRealtimeGame(code: string, handlers: Handlers) {
  useEffect(() => {
    if (!code) return

    const socket = new WebSocket(`/herd-vote:${code}`)

    socket.addEventListener('message', (event) => {
      try {
        const { type, payload } = JSON.parse(event.data)
        switch (type) {
          case 'question:show':
            handlers.onQuestionShow?.(payload)
            break
          case 'timer:start':
            handlers.onTimerStart?.()
            break
          case 'round:lock':
            handlers.onRoundLock?.()
            break
          case 'round:results':
            handlers.onResults?.(payload)
            break
          case 'round:finish':
            handlers.onFinish?.()
            break
          default:
            break
        }
      } catch (e) {
        console.error('Invalid message', e)
      }
    })

    return () => socket.close()
  }, [code, handlers])
}
