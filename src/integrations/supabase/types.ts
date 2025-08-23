// PATH: src/integrations/supabase/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    // nevadí, že je tu – nie je použité pri kóde
    PostgrestVersion: '13.0.4'
  }
  public: {
    Tables: {
      // ----- používané v klientoch / admin časti -----
      questions: {
        Row: {
          id: number
          text: string
          hlavna_skupina: string | null
          podskupina: string | null
          vyznam: string | null
          admin_status: number | null
          kamarati: boolean | null
          partneri: boolean | null
          rodina: boolean | null
          rodic_dieta: boolean | null
        }
        Insert: {
          id?: number
          text: string
          hlavna_skupina?: string | null
          podskupina?: string | null
          vyznam?: string | null
          admin_status?: number | null
          kamarati?: boolean | null
          partneri?: boolean | null
          rodina?: boolean | null
          rodic_dieta?: boolean | null
        }
        Update: {
          id?: number
          text?: string
          hlavna_skupina?: string | null
          podskupina?: string | null
          vyznam?: string | null
          admin_status?: number | null
          kamarati?: boolean | null
          partneri?: boolean | null
          rodina?: boolean | null
          rodic_dieta?: boolean | null
        }
        Relationships: []
      }

      // ----- miestnosť (kód hry) -----
      rooms: {
        Row: {
          id: string
          code: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          created_at?: string
        }
        Relationships: []
      }

      // ----- session hry v room-e -----
      game_sessions: {
        Row: {
          id: string
          room_id: string
          status: Database['public']['Enums']['game_session_status']
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          status?: Database['public']['Enums']['game_session_status']
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          status?: Database['public']['Enums']['game_session_status']
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'game_sessions_room_id_fkey'
            columns: ['room_id']
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          }
        ]
      }

      // ----- účastníci hry (hráči) -----
      participants: {
        Row: {
          id: string
          session_id: string
          guest_id: string | null
          nickname: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          guest_id?: string | null
          nickname: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          guest_id?: string | null
          nickname?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'participants_session_id_fkey'
            columns: ['session_id']
            referencedRelation: 'game_sessions'
            referencedColumns: ['id']
          }
        ]
      }

      // ----- KONFIGURÁCIA KÔL pre hru „herd-vote“ (podľa tvojho upsertu) -----
      herd_rounds: {
        Row: {
          id: string
          game_code: string
          index: number
          topic: string | null
          questions: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          game_code: string
          index: number
          topic?: string | null
          questions?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          game_code?: string
          index?: number
          topic?: string | null
          questions?: Json | null
          created_at?: string
        }
        Relationships: []
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      is_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
      ensure_room: {
        Args: Record<string, never>
        Returns: { code: string }
      }
      open_lobby: {
        Args: Record<string, never>
        Returns: unknown
      }
      join_room: {
        Args: {
          p_code: string
          p_nickname: string
          p_guest_id: string
        }
        Returns: { id: string; nickname: string; guest_id: string }
      }
      start_game: {
        Args: Record<string, never>
        Returns: { status: 'lobby' | 'setup' | 'running' | 'ended' }
      }
      lock_lobby: {
        Args: Record<string, never>
        Returns: { status: 'lobby' | 'setup' | 'running' | 'ended' }
      }
    }

    Enums: {
      game_session_status: 'lobby' | 'setup' | 'running' | 'ended'
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Pomocné generiká (ak ich používaš)
type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>
type DefaultSchema = DatabaseWithoutInternals['public']

export type Tables<
  T extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
> = (DefaultSchema['Tables'] & DefaultSchema['Views'])[T] extends { Row: infer R } ? R : never

export type TablesInsert<
  T extends keyof DefaultSchema['Tables']
> = DefaultSchema['Tables'][T] extends { Insert: infer I } ? I : never

export type TablesUpdate<
  T extends keyof DefaultSchema['Tables']
> = DefaultSchema['Tables'][T] extends { Update: infer U } ? U : never

export type Enums<
  T extends keyof DefaultSchema['Enums']
> = DefaultSchema['Enums'][T]

// Pekný malý export ak ho niekde používaš
export const Constants = {
  public: {
    Enums: {
      game_session_status: ['lobby', 'setup', 'running', 'ended'],
    },
  },
} as const
