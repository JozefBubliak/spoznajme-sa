// src/lib/realtime/server.ts
// Server-side broadcast via Supabase Realtime REST API.
// channel.send() without subscribe() silently fails — must use HTTP endpoint instead.

import type { HerdEvent } from './types'

class RealtimeServerImpl {
  async publish(channel: string, event: HerdEvent): Promise<void> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      console.warn('[REALTIME] Missing Supabase config — broadcast skipped')
      return
    }

    try {
      const res = await fetch(`${supabaseUrl}/realtime/v1/api/broadcast`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              topic: `realtime:${channel}`,
              event: 'broadcast',
              payload: {
                event: 'herd-event',
                payload: event,
              },
            },
          ],
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error('[REALTIME] Broadcast failed:', res.status, text)
      }
    } catch (error) {
      console.error('[REALTIME] Failed to publish event:', error)
    }
  }
}

export const RealtimeServer = new RealtimeServerImpl()