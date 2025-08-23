// src/lib/realtime/client.ts

import type { HerdEvent, RealtimeCallback } from './types'
import { log } from '../logger'

class RealtimeClientImpl {
  private subscribers = new Map<string, Set<RealtimeCallback>>()
  private isConnected = false

  subscribe(channel: string, callback: RealtimeCallback): () => void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set())
    }
    
    this.subscribers.get(channel)!.add(callback)
    
    // Auto-connect on first subscription
    if (!this.isConnected) {
      this.connect()
    }

    // Return unsubscribe function
    return () => {
      const channelSubs = this.subscribers.get(channel)
      if (channelSubs) {
        channelSubs.delete(callback)
        if (channelSubs.size === 0) {
          this.subscribers.delete(channel)
        }
      }
    }
  }

  private connect() {
    if (this.isConnected) return
    
    log('[REALTIME] Client connecting...')
    this.isConnected = true
    
    // Listen for events from the server via polling/EventSource/WebSocket
    // For now, use a simple polling mechanism as fallback
    this.startPolling()
  }

  private startPolling() {
    // In a real implementation, this would connect to a WebSocket
    // For now, we'll use a simple polling mechanism
    setInterval(() => {
      // This would normally receive events from server
      // For dev, we'll rely on server.ts to simulate events
    }, 1000)
  }

  // Method for server to send events (dev only)
  simulateEvent(channel: string, event: HerdEvent) {
    const channelSubs = this.subscribers.get(channel)
    if (channelSubs) {
      channelSubs.forEach(callback => {
        try {
          callback(event)
        } catch (error) {
          console.error('[REALTIME] Error in callback:', error)
        }
      })
    }
  }
}

export const RealtimeClient = new RealtimeClientImpl()

// Expose for server simulation in dev
if (typeof window !== 'undefined') {
  (window as any).RealtimeClient = RealtimeClient
}
