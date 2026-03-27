// src/lib/realtime/server.ts

import type { HerdEvent } from './types'
import { supabaseServer } from '@/integrations/supabase/server'

class RealtimeServerImpl {
  async publish(channel: string, event: HerdEvent): Promise<void> {
    console.log(`[REALTIME] Publishing to ${channel}:`, event)

    try {
      // Use Supabase realtime for broadcasting
      const supabase = supabaseServer()
      await supabase.channel(channel).send({
        type: 'broadcast',
        event: 'herd-event',
        payload: event
      })
    } catch (error) {
      console.error('[REALTIME] Failed to publish event:', error)
      // Fallback: could implement polling or other mechanism
    }
  }
}

export const RealtimeServer = new RealtimeServerImpl()