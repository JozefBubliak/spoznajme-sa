'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { QuizMessage } from './types'
import { supabaseClient } from '@/integrations/supabase/client'

function makeStorageKey(code: string) {
  return `quiz-channel:${code}`
}

export function useQuizChannel(
  code: string | null,
  onMessage: (message: QuizMessage) => void,
) {
  const callbackRef = useRef(onMessage)
  callbackRef.current = onMessage

  const realtimeRef = useRef<ReturnType<typeof supabaseClient.channel> | null>(null)
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (!code) return

    const realtimeChannel = supabaseClient
      .channel(`quiz-${code}`, { config: { broadcast: { self: true } } })
      .on('broadcast', { event: 'quiz-message' }, ({ payload }) => {
        callbackRef.current(payload as QuizMessage)
      })
      .subscribe()

    realtimeRef.current = realtimeChannel

    const supportsBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
    let fallbackBroadcast: BroadcastChannel | null = null
    let storageListener: ((event: StorageEvent) => void) | null = null

    if (supportsBroadcast) {
      fallbackBroadcast = new BroadcastChannel(`quiz-${code}`)
      const listener = (event: MessageEvent<QuizMessage>) => callbackRef.current(event.data)
      fallbackBroadcast.addEventListener('message', listener)
      channelRef.current = fallbackBroadcast
    } else {
      storageListener = (event: StorageEvent) => {
        if (event.key !== makeStorageKey(code) || !event.newValue) return
        try {
          const payload = JSON.parse(event.newValue) as QuizMessage
          callbackRef.current(payload)
        } catch (error) {
          console.warn('Failed to parse quiz message from storage', error)
        }
      }
      window.addEventListener('storage', storageListener)
    }

    return () => {
      supabaseClient.removeChannel(realtimeChannel)
      realtimeRef.current = null
      if (fallbackBroadcast) {
        fallbackBroadcast.close()
      }
      channelRef.current = null
      if (storageListener) {
        window.removeEventListener('storage', storageListener)
      }
    }
  }, [code])

  const sendMessage = useCallback(
    (message: QuizMessage) => {
      if (!code) return

      if (realtimeRef.current) {
        void realtimeRef.current.send({
          type: 'broadcast',
          event: 'quiz-message',
          payload: message,
        })
        return
      }

      const supportsBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
      if (supportsBroadcast) {
        if (!channelRef.current) channelRef.current = new BroadcastChannel(`quiz-${code}`)
        channelRef.current.postMessage(message)
        return
      }
      try {
        window.localStorage.setItem(makeStorageKey(code), JSON.stringify(message))
        window.localStorage.removeItem(makeStorageKey(code))
      } catch (error) {
        console.warn('Failed to send quiz message via localStorage', error)
      }
    },
    [code],
  )

  return sendMessage
}
