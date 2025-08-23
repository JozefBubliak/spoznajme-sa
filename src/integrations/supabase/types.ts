// PATH: src/integrations/supabase/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: { PostgrestVersion: "13.0.4" }
  public: {
    Tables: {
      // --- tvoje existujúce tabuľky ---
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

      // --- doplnené tabuľky pre hernú logiku ---
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
          status: Database["public"]["Enums"]["game_session_status"]
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          status?: Database["public"]["Enums"]["game_session_status"]
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          status?: Database["public"]["Enums"]["game_session_status"]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          }
        ]
      }

      participants: {
        Row: {
          id: string
          session_id: string
          nickname: string
          guest_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          nickname: string
          guest_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          nickname?: string
          guest_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          }
        ]
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
        Args: { p_code: string; p_nickname: string; p_guest_id: string }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends { Row: infer R }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
        ? R
        : never
      : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends { Insert: infer I }
      ? I
      : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Insert: infer I }
        ? I
        : never
      : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> =
  DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends { Update: infer U }
      ? U
      : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Update: infer U }
        ? U
        : never
      : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> =
  DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> =
  PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
  public: {
    Enums: {
      game_session_status: ['lobby', 'setup', 'running', 'ended'],
    },
  },
} as const
