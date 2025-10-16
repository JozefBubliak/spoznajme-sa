'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { QuizMessage } from './types'

function makeStorageKey(code: string) {
  return `quiz-channel:${code}`
}

export function useQuizChannel(
  code: string | null,
  onMessage: (message: QuizMessage) => void,
) {
  const callbackRef = useRef(onMessage)
  callbackRef.current = onMessage

  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    if (!code) return

    const supportsBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
    if (!supportsBroadcast) {
      const handleStorage = (event: StorageEvent) => {
        if (event.key !== makeStorageKey(code) || !event.newValue) return
        try {
          const payload = JSON.parse(event.newValue) as QuizMessage
          callbackRef.current(payload)
        } catch (error) {
          console.warn('Failed to parse quiz message from storage', error)
        }
      }

      window.addEventListener('storage', handleStorage)
      return () => window.removeEventListener('storage', handleStorage)
    }

    const channel = new BroadcastChannel(`quiz-${code}`)
    channelRef.current = channel
    const listener = (event: MessageEvent<QuizMessage>) => {
      callbackRef.current(event.data)
    }
    channel.addEventListener('message', listener)

    return () => {
      channel.removeEventListener('message', listener)
      channel.close()
      channelRef.current = null
    }
  }, [code])

  const sendMessage = useCallback(
    (message: QuizMessage) => {
      if (!code) return
      const supportsBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
      if (supportsBroadcast) {
        if (!channelRef.current) {
          channelRef.current = new BroadcastChannel(`quiz-${code}`)
        }
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
