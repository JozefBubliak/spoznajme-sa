'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { supabaseClient } from '@/integrations/supabase/client'
import type { ChatMessage } from '@/lib/spontanky/types'

interface Props {
  spontankaId: string
  initialMessages: ChatMessage[]
  pid: string
  pname: string
  onNeedName: () => void
}

export function ChatPanel({ spontankaId, initialMessages, pid, pname, onNeedName }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const channel = supabaseClient
      .channel(`chat-${spontankaId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'spontanka_chat',
        filter: `spontanka_id=eq.${spontankaId}`,
      }, (payload) => {
        setMessages(prev => {
          const msg = payload.new as ChatMessage
          if (prev.some(m => m.id === msg.id)) return prev
          return [...prev, msg]
        })
      })
      .subscribe()
    return () => { supabaseClient.removeChannel(channel) }
  }, [spontankaId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const send = async () => {
    const t = text.trim()
    if (!t) return
    if (!pid || !pname) { onNeedName(); return }

    setSending(true)
    setChatError('')
    setText('')

    // Optimistic
    const optimistic: ChatMessage = {
      id: `opt-${Date.now()}`,
      spontanka_id: spontankaId,
      participant_id: pid,
      meno: pname,
      text: t,
      pinned: false,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, optimistic])

    const res = await fetch(`/api/spontanky/${spontankaId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant_id: pid, meno: pname, text: t }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setChatError(data.error ?? 'Chyba pri odosielaní')
      // Remove optimistic message
      setMessages(prev => prev.filter(m => m.id !== optimistic.id))
      setText(t)
    }

    setSending(false)
    inputRef.current?.focus()
  }

  const pinned = messages.filter(m => m.pinned)
  const normal = messages.filter(m => !m.pinned)

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col" style={{ height: 'min(520px, 70vh)' }}>
      {/* Pinned messages */}
      {pinned.map(m => (
        <div key={m.id} className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex gap-1.5 shrink-0">
          <span>📌</span>
          <span>{m.text}</span>
        </div>
      ))}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {normal.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
            <span className="text-2xl">💬</span>
            <p className="text-sm">Zatiaľ žiadne správy. Buď prvý.</p>
          </div>
        )}

        {normal.map((msg, idx) => {
          const isMe = msg.participant_id === pid
          const isSystem = msg.participant_id === 'system' || msg.participant_id === 'organizer'
          const prevMsg = normal[idx - 1]
          const sameAuthor = prevMsg?.participant_id === msg.participant_id
          const diffTime = !prevMsg || (new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime()) > 5 * 60 * 1000

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                  {msg.text}
                </span>
              </div>
            )
          }

          return (
            <div key={msg.id} className={cn('flex gap-2', isMe && 'flex-row-reverse')}>
              {!isMe && !sameAuthor && (
                <div className="w-7 h-7 rounded-full bg-muted border flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  {msg.meno.charAt(0).toUpperCase()}
                </div>
              )}
              {!isMe && sameAuthor && <div className="w-7 shrink-0" />}
              <div className={cn('max-w-[75%]', isMe && 'items-end flex flex-col')}>
                {!isMe && (!sameAuthor || diffTime) && (
                  <span className="text-xs text-muted-foreground mb-1 px-1">{msg.meno}</span>
                )}
                <div className={cn(
                  'px-3 py-2 rounded-2xl text-sm',
                  isMe
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted rounded-tl-sm',
                  sameAuthor && !isMe && 'rounded-tl-2xl',
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-muted-foreground mt-0.5 px-1">
                  {formatTime(msg.created_at)}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {chatError && (
        <div className="px-4 py-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-t border-red-200 dark:border-red-800">
          {chatError}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t flex gap-2 shrink-0">
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={pname ? 'Napíš správu…' : 'Najprv sa prihlás na spontánku'}
          className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          maxLength={500}
        />
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 transition-opacity"
        >
          {sending ? '…' : '→'}
        </button>
      </div>
    </div>
  )
}
