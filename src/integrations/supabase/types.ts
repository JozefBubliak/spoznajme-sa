export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      // už existujúca questions tabuľka – nechávam pre pôvodný kód
      questions: {
        Row: {
          admin_status: number | null
          hlavna_skupina: string | null
          id: number
          kamarati: boolean | null
          partneri: boolean | null
          podskupina: string | null
          rodic_dieta: boolean | null
          rodina: boolean | null
          text: string
          vyznam: string | null
        }
        Insert: {
          admin_status?: number | null
          hlavna_skupina?: string | null
          id?: number
          kamarati?: boolean | null
          partneri?: boolean | null
          podskupina?: string | null
          rodic_dieta?: boolean | null
          rodina?: boolean | null
          text: string
          vyznam?: string | null
        }
        Update: {
          admin_status?: number | null
          hlavna_skupina?: string | null
          id?: number
          kamarati?: boolean | null
          partneri?: boolean | null
          podskupina?: string | null
          rodic_dieta?: boolean | null
          rodina?: boolean | null
          text?: string
          vyznam?: string | null
        }
        Relationships: []
      }

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

      game_sessions: {
        Row: {
          id: string
          room_id: string
          status: 'lobby' | 'setup' | 'running' | 'ended'
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          status?: 'lobby' | 'setup' | 'running' | 'ended'
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          status?: 'lobby' | 'setup' | 'running' | 'ended'
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

      participants: {
        Row: {
          id: string
          session_id: string
          nickname: string
          guest_id: string | null
        }
        Insert: {
          id?: string
          session_id: string
          nickname: string
          guest_id?: string | null
        }
        Update: {
          id?: string
          session_id?: string
          nickname?: string
          guest_id?: string | null
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

    Views: {}

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

    CompositeTypes: {}
  }
}
