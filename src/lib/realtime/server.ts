// src/lib/realtime/server.ts

import type { HerdEvent } from './types'

declare global {
  interface Window {
    RealtimeClient?: { simulateEvent?: (channel: string, event: HerdEvent) => void }
  }
}

class RealtimeServerImpl {
  async publish(channel: string, event: HerdEvent): Promise<void> {
    console.log(`[REALTIME] Publishing to ${channel}:`, event)
    
    // In production with Vercel Realtime:
    // const url = process.env.REALTIME_URL
    // const key = process.env.REALTIME_SERVER_KEY
    // if (url && key) {
    //   await fetch(`${url}/publish`, {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ channel, event })
    //   })
    //   return
    // }

    // Fallback for development: simulate client event reception
    if (typeof window !== 'undefined') {
      // Browser context - send to client directly
      const client = window.RealtimeClient
      if (client?.simulateEvent) {
        setTimeout(() => client.simulateEvent(channel, event), 50)
      }
    } else {
      // Server context - for production we'd publish to external service
      console.log('[REALTIME] Server fallback - event logged only')
    }
  }
}

export const RealtimeServer = new RealtimeServerImpl()