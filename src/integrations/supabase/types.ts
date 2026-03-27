export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      _aj_card_variants: {
        Row: {
          card_id: number | null
          id: number
          lang: string | null
          text: string | null
        }
        Insert: {
          card_id?: number | null
          id?: number
          lang?: string | null
          text?: string | null
        }
        Update: {
          card_id?: number | null
          id?: number
          lang?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_aj_card_variants_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "_aj_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      _aj_cards: {
        Row: {
          active: boolean | null
          audio_en: string | null
          audio_sk: string | null
          cefr: string | null
          cloze_en: string | null
          cloze_sk: string | null
          created_at: string | null
          en: string
          err_en: string | null
          err_expl_sk: string | null
          explain_a: string | null
          explain_b: string | null
          group_id: number | null
          hint_en: string | null
          hint_sk: string | null
          id: number
          reorder_en: string | null
          reorder_sk: string | null
          rule_id: number | null
          sk: string
          srs_init_difficulty: number | null
          subgroup: string | null
          tags: string | null
        }
        Insert: {
          active?: boolean | null
          audio_en?: string | null
          audio_sk?: string | null
          cefr?: string | null
          cloze_en?: string | null
          cloze_sk?: string | null
          created_at?: string | null
          en: string
          err_en?: string | null
          err_expl_sk?: string | null
          explain_a?: string | null
          explain_b?: string | null
          group_id?: number | null
          hint_en?: string | null
          hint_sk?: string | null
          id: number
          reorder_en?: string | null
          reorder_sk?: string | null
          rule_id?: number | null
          sk: string
          srs_init_difficulty?: number | null
          subgroup?: string | null
          tags?: string | null
        }
        Update: {
          active?: boolean | null
          audio_en?: string | null
          audio_sk?: string | null
          cefr?: string | null
          cloze_en?: string | null
          cloze_sk?: string | null
          created_at?: string | null
          en?: string
          err_en?: string | null
          err_expl_sk?: string | null
          explain_a?: string | null
          explain_b?: string | null
          group_id?: number | null
          hint_en?: string | null
          hint_sk?: string | null
          id?: number
          reorder_en?: string | null
          reorder_sk?: string | null
          rule_id?: number | null
          sk?: string
          srs_init_difficulty?: number | null
          subgroup?: string | null
          tags?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_aj_cards_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "_aj_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_aj_cards_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "_aj_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      _aj_cards_staging: {
        Row: {
          active: string | null
          audio_en: string | null
          audio_sk: string | null
          cefr: string | null
          created_at: string | null
          en: string | null
          error_explanation_sk: string | null
          error_sentence_en: string | null
          explain_a: string | null
          explain_b: string | null
          explain_c_url: string | null
          group: string | null
          hint_en: string | null
          hint_sk: string | null
          id: number | null
          mode_cloze_en: string | null
          mode_cloze_sk: string | null
          mode_reorder_tokens_en: string | null
          mode_reorder_tokens_sk: string | null
          sk: string | null
          srs_init_difficulty: string | null
          subgroup: string | null
          tags: string | null
          variants_en: string | null
          variants_sk: string | null
        }
        Insert: {
          active?: string | null
          audio_en?: string | null
          audio_sk?: string | null
          cefr?: string | null
          created_at?: string | null
          en?: string | null
          error_explanation_sk?: string | null
          error_sentence_en?: string | null
          explain_a?: string | null
          explain_b?: string | null
          explain_c_url?: string | null
          group?: string | null
          hint_en?: string | null
          hint_sk?: string | null
          id?: number | null
          mode_cloze_en?: string | null
          mode_cloze_sk?: string | null
          mode_reorder_tokens_en?: string | null
          mode_reorder_tokens_sk?: string | null
          sk?: string | null
          srs_init_difficulty?: string | null
          subgroup?: string | null
          tags?: string | null
          variants_en?: string | null
          variants_sk?: string | null
        }
        Update: {
          active?: string | null
          audio_en?: string | null
          audio_sk?: string | null
          cefr?: string | null
          created_at?: string | null
          en?: string | null
          error_explanation_sk?: string | null
          error_sentence_en?: string | null
          explain_a?: string | null
          explain_b?: string | null
          explain_c_url?: string | null
          group?: string | null
          hint_en?: string | null
          hint_sk?: string | null
          id?: number | null
          mode_cloze_en?: string | null
          mode_cloze_sk?: string | null
          mode_reorder_tokens_en?: string | null
          mode_reorder_tokens_sk?: string | null
          sk?: string | null
          srs_init_difficulty?: string | null
          subgroup?: string | null
          tags?: string | null
          variants_en?: string | null
          variants_sk?: string | null
        }
        Relationships: []
      }
      _aj_groups: {
        Row: {
          id: number
          name: string
          parent_id: number | null
        }
        Insert: {
          id?: number
          name: string
          parent_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "_aj_groups_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "_aj_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      _aj_progress: {
        Row: {
          card_id: number
          direction: string
          due_at: string | null
          easiness: number | null
          interval_d: number | null
          last_rating: number | null
          user_id: string
        }
        Insert: {
          card_id: number
          direction: string
          due_at?: string | null
          easiness?: number | null
          interval_d?: number | null
          last_rating?: number | null
          user_id: string
        }
        Update: {
          card_id?: number
          direction?: string
          due_at?: string | null
          easiness?: number | null
          interval_d?: number | null
          last_rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "_aj_progress_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "_aj_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      _aj_rules: {
        Row: {
          code: string | null
          id: number
          title: string | null
          url: string | null
        }
        Insert: {
          code?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Update: {
          code?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      attributions: {
        Row: {
          entityid: number
          entitytype: string
          id: number
          source: string
          url: string | null
        }
        Insert: {
          entityid: number
          entitytype: string
          id?: number
          source: string
          url?: string | null
        }
        Update: {
          entityid?: number
          entitytype?: string
          id?: number
          source?: string
          url?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          code: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          code: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          code?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          author_id: string
          created_at: string
          group_id: number
          id: number
          text: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          author_id: string
          created_at?: string
          group_id: number
          id?: number
          text: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          author_id?: string
          created_at?: string
          group_id?: number
          id?: number
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          created_at: string
          flags: Json | null
          id: number
          parent_id: number | null
          rating: number | null
          status: string
          target_id: number
          target_type: string
          text: string
          updated_at: string
          visibility: string
        }
        Insert: {
          author_id: string
          created_at?: string
          flags?: Json | null
          id?: number
          parent_id?: number | null
          rating?: number | null
          status?: string
          target_id: number
          target_type: string
          text: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          flags?: Json | null
          id?: number
          parent_id?: number | null
          rating?: number | null
          status?: string
          target_id?: number
          target_type?: string
          text?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_answer_options: {
        Row: {
          icon: string | null
          id: string
          is_rejection: boolean | null
          order_index: number | null
          question_id: string | null
          text: Json
          value: string
        }
        Insert: {
          icon?: string | null
          id?: string
          is_rejection?: boolean | null
          order_index?: number | null
          question_id?: string | null
          text: Json
          value: string
        }
        Update: {
          icon?: string | null
          id?: string
          is_rejection?: boolean | null
          order_index?: number | null
          question_id?: string | null
          text?: Json
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupl_answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "coupl_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_answers: {
        Row: {
          answer_data: Json
          answered_at: string | null
          id: string
          participant_id: string | null
          question_id: string | null
        }
        Insert: {
          answer_data: Json
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer_data?: Json
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupl_answers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "coupl_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupl_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "coupl_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_categories: {
        Row: {
          description: Json | null
          id: string
          name: Json
          order_index: number | null
          parent_id: string | null
        }
        Insert: {
          description?: Json | null
          id?: string
          name: Json
          order_index?: number | null
          parent_id?: string | null
        }
        Update: {
          description?: Json | null
          id?: string
          name?: Json
          order_index?: number | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupl_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "coupl_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_category_preferences: {
        Row: {
          category_id: string | null
          id: string
          is_interested: boolean
          participant_id: string | null
          selected_at: string | null
        }
        Insert: {
          category_id?: string | null
          id?: string
          is_interested: boolean
          participant_id?: string | null
          selected_at?: string | null
        }
        Update: {
          category_id?: string | null
          id?: string
          is_interested?: boolean
          participant_id?: string | null
          selected_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupl_category_preferences_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "coupl_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupl_category_preferences_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "coupl_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_participants: {
        Row: {
          gender: string
          id: string
          joined_at: string | null
          language_code: string | null
          nickname: string
          session_id: string | null
        }
        Insert: {
          gender: string
          id?: string
          joined_at?: string | null
          language_code?: string | null
          nickname: string
          session_id?: string | null
        }
        Update: {
          gender?: string
          id?: string
          joined_at?: string | null
          language_code?: string | null
          nickname?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupl_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "coupl_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_questions: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: Json | null
          id: string
          is_reciprocal: boolean | null
          order_index: number | null
          question_type: string
          text_female: Json
          text_male: Json
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: Json | null
          id?: string
          is_reciprocal?: boolean | null
          order_index?: number | null
          question_type: string
          text_female: Json
          text_male: Json
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: Json | null
          id?: string
          is_reciprocal?: boolean | null
          order_index?: number | null
          question_type?: string
          text_female?: Json
          text_male?: Json
        }
        Relationships: [
          {
            foreignKeyName: "coupl_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "coupl_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_results: {
        Row: {
          compatibility_score: number | null
          generated_at: string | null
          id: string
          question_id: string | null
          result_summary: Json | null
          session_id: string | null
          should_display: boolean
        }
        Insert: {
          compatibility_score?: number | null
          generated_at?: string | null
          id?: string
          question_id?: string | null
          result_summary?: Json | null
          session_id?: string | null
          should_display: boolean
        }
        Update: {
          compatibility_score?: number | null
          generated_at?: string | null
          id?: string
          question_id?: string | null
          result_summary?: Json | null
          session_id?: string | null
          should_display?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "coupl_results_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "coupl_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupl_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "coupl_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      coupl_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          language_code: string | null
          qr_code_url: string | null
          room_code: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          language_code?: string | null
          qr_code_url?: string | null
          room_code: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          language_code?: string | null
          qr_code_url?: string | null
          room_code?: string
          status?: string | null
        }
        Relationships: []
      }
      difficulties: {
        Row: {
          id: string
          level: number
          name: string
        }
        Insert: {
          id?: string
          level: number
          name: string
        }
        Update: {
          id?: string
          level?: number
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          accessibility: Json | null
          audience: string[]
          end: string | null
          geom: unknown
          id: number
          kind: string[]
          moderation_status: string | null
          muni_id: number | null
          organizer: string | null
          place: string | null
          price: number | null
          rsvp_limit: number | null
          schema_kind: string | null
          start: string | null
          title: string
          visibility: string | null
        }
        Insert: {
          accessibility?: Json | null
          audience: string[]
          end?: string | null
          geom?: unknown
          id?: number
          kind: string[]
          moderation_status?: string | null
          muni_id?: number | null
          organizer?: string | null
          place?: string | null
          price?: number | null
          rsvp_limit?: number | null
          schema_kind?: string | null
          start?: string | null
          title: string
          visibility?: string | null
        }
        Update: {
          accessibility?: Json | null
          audience?: string[]
          end?: string | null
          geom?: unknown
          id?: number
          kind?: string[]
          moderation_status?: string | null
          muni_id?: number | null
          organizer?: string | null
          place?: string | null
          price?: number | null
          rsvp_limit?: number | null
          schema_kind?: string | null
          start?: string | null
          title?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_muni_id_fkey"
            columns: ["muni_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          room_id: string
          status: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          room_id: string
          status: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          room_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          bring_list: Json | null
          compliance_status: string | null
          created_at: string
          created_by: string | null
          disclaimer_ack: boolean
          expected: number | null
          id: number
          location: Json | null
          muni_id: number | null
          risk: Json | null
          starts_at: string | null
          title: string
          type: string
          visibility: string
        }
        Insert: {
          bring_list?: Json | null
          compliance_status?: string | null
          created_at?: string
          created_by?: string | null
          disclaimer_ack?: boolean
          expected?: number | null
          id?: number
          location?: Json | null
          muni_id?: number | null
          risk?: Json | null
          starts_at?: string | null
          title: string
          type: string
          visibility?: string
        }
        Update: {
          bring_list?: Json | null
          compliance_status?: string | null
          created_at?: string
          created_by?: string | null
          disclaimer_ack?: boolean
          expected?: number | null
          id?: number
          location?: Json | null
          muni_id?: number | null
          risk?: Json | null
          starts_at?: string | null
          title?: string
          type?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_muni_id_fkey"
            columns: ["muni_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      herd_answers: {
        Row: {
          answer: string | null
          answered_at: string | null
          game_code: string | null
          id: string
          player_id: string | null
          q_index: number | null
          round_id: string | null
          ts: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          game_code?: string | null
          id?: string
          player_id?: string | null
          q_index?: number | null
          round_id?: string | null
          ts?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          game_code?: string | null
          id?: string
          player_id?: string | null
          q_index?: number | null
          round_id?: string | null
          ts?: string | null
        }
        Relationships: []
      }
      herd_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          lang: string
          locale: string | null
          name: string
          slug: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          lang?: string
          locale?: string | null
          name: string
          slug?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          lang?: string
          locale?: string | null
          name?: string
          slug?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      herd_events: {
        Row: {
          created_at: string
          game_code: string
          id: number
          kind: string
          payload: Json
        }
        Insert: {
          created_at?: string
          game_code: string
          id?: number
          kind: string
          payload?: Json
        }
        Update: {
          created_at?: string
          game_code?: string
          id?: number
          kind?: string
          payload?: Json
        }
        Relationships: []
      }
      herd_games: {
        Row: {
          active_round_index: number | null
          code: string
          created_at: string
          id: string
          lobby_locked: boolean | null
          owner_id: string | null
          phase: string | null
          prep_seconds: number | null
          question_seconds: number | null
          scoring_mode: string | null
          settings: Json
          status: string
          timer_deadline: string | null
          total_rounds: number | null
        }
        Insert: {
          active_round_index?: number | null
          code: string
          created_at?: string
          id?: string
          lobby_locked?: boolean | null
          owner_id?: string | null
          phase?: string | null
          prep_seconds?: number | null
          question_seconds?: number | null
          scoring_mode?: string | null
          settings?: Json
          status?: string
          timer_deadline?: string | null
          total_rounds?: number | null
        }
        Update: {
          active_round_index?: number | null
          code?: string
          created_at?: string
          id?: string
          lobby_locked?: boolean | null
          owner_id?: string | null
          phase?: string | null
          prep_seconds?: number | null
          question_seconds?: number | null
          scoring_mode?: string | null
          settings?: Json
          status?: string
          timer_deadline?: string | null
          total_rounds?: number | null
        }
        Relationships: []
      }
      herd_players: {
        Row: {
          game_code: string
          id: string
          joined_at: string
          name: string
          score: number
        }
        Insert: {
          game_code: string
          id?: string
          joined_at?: string
          name: string
          score?: number
        }
        Update: {
          game_code?: string
          id?: string
          joined_at?: string
          name?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "herd_players_game_code_fkey"
            columns: ["game_code"]
            isOneToOne: false
            referencedRelation: "herd_games"
            referencedColumns: ["code"]
          },
        ]
      }
      herd_questions: {
        Row: {
          answer_a: string
          answer_b: string
          answer_c: string
          answer_d: string
          category: string
          category_id: string | null
          classic: boolean
          correct_answer: string
          created_at: string
          fun_fact: string | null
          id: string
          junior: boolean
          locale: string | null
          question_text: string
          teenager: boolean
        }
        Insert: {
          answer_a: string
          answer_b: string
          answer_c: string
          answer_d: string
          category: string
          category_id?: string | null
          classic?: boolean
          correct_answer: string
          created_at?: string
          fun_fact?: string | null
          id?: string
          junior?: boolean
          locale?: string | null
          question_text: string
          teenager?: boolean
        }
        Update: {
          answer_a?: string
          answer_b?: string
          answer_c?: string
          answer_d?: string
          category?: string
          category_id?: string | null
          classic?: boolean
          correct_answer?: string
          created_at?: string
          fun_fact?: string | null
          id?: string
          junior?: boolean
          locale?: string | null
          question_text?: string
          teenager?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "herd_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "herd_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "herd_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "herd_categories_with_counts"
            referencedColumns: ["id"]
          },
        ]
      }
      herd_questions_stage: {
        Row: {
          answer_a: string | null
          answer_b: string | null
          answer_c: string | null
          answer_d: string | null
          category: string | null
          category_id: string | null
          classic: string | null
          correct_answer: string | null
          created_at: string | null
          fun_fact: string | null
          id: string | null
          junior: string | null
          question_text: string | null
          teenager: string | null
        }
        Insert: {
          answer_a?: string | null
          answer_b?: string | null
          answer_c?: string | null
          answer_d?: string | null
          category?: string | null
          category_id?: string | null
          classic?: string | null
          correct_answer?: string | null
          created_at?: string | null
          fun_fact?: string | null
          id?: string | null
          junior?: string | null
          question_text?: string | null
          teenager?: string | null
        }
        Update: {
          answer_a?: string | null
          answer_b?: string | null
          answer_c?: string | null
          answer_d?: string | null
          category?: string | null
          category_id?: string | null
          classic?: string | null
          correct_answer?: string | null
          created_at?: string | null
          fun_fact?: string | null
          id?: string | null
          junior?: string | null
          question_text?: string | null
          teenager?: string | null
        }
        Relationships: []
      }
      herd_rounds: {
        Row: {
          category: string
          count: number
          created_at: string
          game_code: string
          id: string
          idx: number | null
          prep_seconds: number | null
          q_index: number | null
          question_seconds: number | null
          scoring_mode: string | null
          settings: Json
          status: string | null
          timer_deadline: string | null
        }
        Insert: {
          category: string
          count?: number
          created_at?: string
          game_code: string
          id?: string
          idx?: number | null
          prep_seconds?: number | null
          q_index?: number | null
          question_seconds?: number | null
          scoring_mode?: string | null
          settings?: Json
          status?: string | null
          timer_deadline?: string | null
        }
        Update: {
          category?: string
          count?: number
          created_at?: string
          game_code?: string
          id?: string
          idx?: number | null
          prep_seconds?: number | null
          q_index?: number | null
          question_seconds?: number | null
          scoring_mode?: string | null
          settings?: Json
          status?: string | null
          timer_deadline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "herd_rounds_game_code_fkey"
            columns: ["game_code"]
            isOneToOne: false
            referencedRelation: "herd_games"
            referencedColumns: ["code"]
          },
        ]
      }
      intimap_answers: {
        Row: {
          answer_data: Json | null
          answered_at: string | null
          id: string
          participant_id: string | null
          question_id: string | null
        }
        Insert: {
          answer_data?: Json | null
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer_data?: Json | null
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intimap_answers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "intimap_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intimap_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "intimap_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      intimap_categories: {
        Row: {
          description: string | null
          id: string
          name: string
          order_index: number | null
          parent_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          order_index?: number | null
          parent_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          order_index?: number | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intimap_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "intimap_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      intimap_participants: {
        Row: {
          gender: string | null
          id: string
          joined_at: string | null
          language_code: string | null
          nickname: string | null
          session_id: string | null
        }
        Insert: {
          gender?: string | null
          id?: string
          joined_at?: string | null
          language_code?: string | null
          nickname?: string | null
          session_id?: string | null
        }
        Update: {
          gender?: string | null
          id?: string
          joined_at?: string | null
          language_code?: string | null
          nickname?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intimap_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "intimap_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      intimap_questions: {
        Row: {
          category_id: string | null
          description: Json | null
          id: string
          is_reciprocal: boolean | null
          order_index: number | null
          question_type: string | null
          text_female: Json | null
          text_male: Json | null
        }
        Insert: {
          category_id?: string | null
          description?: Json | null
          id?: string
          is_reciprocal?: boolean | null
          order_index?: number | null
          question_type?: string | null
          text_female?: Json | null
          text_male?: Json | null
        }
        Update: {
          category_id?: string | null
          description?: Json | null
          id?: string
          is_reciprocal?: boolean | null
          order_index?: number | null
          question_type?: string | null
          text_female?: Json | null
          text_male?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "intimap_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "intimap_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      intimap_results: {
        Row: {
          compatibility_score: number | null
          generated_at: string | null
          id: string
          question_id: string | null
          result_summary: Json | null
          session_id: string | null
          should_display: boolean
        }
        Insert: {
          compatibility_score?: number | null
          generated_at?: string | null
          id?: string
          question_id?: string | null
          result_summary?: Json | null
          session_id?: string | null
          should_display: boolean
        }
        Update: {
          compatibility_score?: number | null
          generated_at?: string | null
          id?: string
          question_id?: string | null
          result_summary?: Json | null
          session_id?: string | null
          should_display?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "intimap_results_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "intimap_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intimap_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "intimap_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      intimap_sessions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          language_code: string | null
          room_code: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          language_code?: string | null
          room_code: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          language_code?: string | null
          room_code?: string
          status?: string | null
        }
        Relationships: []
      }
      modes: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      municipalities: {
        Row: {
          attributions: Json | null
          bbox: unknown
          centroid: unknown
          district: string | null
          id: number
          lau_code: string | null
          name: string
          region: string | null
          score: number | null
          tags: string[] | null
        }
        Insert: {
          attributions?: Json | null
          bbox?: unknown
          centroid?: unknown
          district?: string | null
          id?: number
          lau_code?: string | null
          name: string
          region?: string | null
          score?: number | null
          tags?: string[] | null
        }
        Update: {
          attributions?: Json | null
          bbox?: unknown
          centroid?: unknown
          district?: string | null
          id?: number
          lau_code?: string | null
          name?: string
          region?: string | null
          score?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
      pack_words: {
        Row: {
          pack_id: string
          word_id: string
        }
        Insert: {
          pack_id: string
          word_id: string
        }
        Update: {
          pack_id?: string
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pack_words_pack"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_pack_words_word"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pack_words_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "packs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pack_words_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      packs: {
        Row: {
          code: string
          created_at: string
          id: string
          is_premium: boolean
          name: string
          version: number
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_premium?: boolean
          name: string
          version?: number
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_premium?: boolean
          name?: string
          version?: number
        }
        Relationships: []
      }
      participants: {
        Row: {
          guest_id: string
          id: string
          joined_at: string
          left_at: string | null
          nickname: string
          room_id: string
          session_id: string
        }
        Insert: {
          guest_id?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          nickname: string
          room_id: string
          session_id: string
        }
        Update: {
          guest_id?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          nickname?: string
          room_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      poi: {
        Row: {
          accessibility: Json | null
          features: Json | null
          geom: unknown
          hours: Json | null
          id: number
          legal_access: boolean | null
          muni_id: number
          name: string
          price_range: string | null
          quality_score: number | null
          source: Json | null
          tags: string[] | null
          type: string
          verified: boolean | null
        }
        Insert: {
          accessibility?: Json | null
          features?: Json | null
          geom: unknown
          hours?: Json | null
          id?: number
          legal_access?: boolean | null
          muni_id: number
          name: string
          price_range?: string | null
          quality_score?: number | null
          source?: Json | null
          tags?: string[] | null
          type: string
          verified?: boolean | null
        }
        Update: {
          accessibility?: Json | null
          features?: Json | null
          geom?: unknown
          hours?: Json | null
          id?: number
          legal_access?: boolean | null
          muni_id?: number
          name?: string
          price_range?: string | null
          quality_score?: number | null
          source?: Json | null
          tags?: string[] | null
          type?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "poi_muni_id_fkey"
            columns: ["muni_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["id"]
          },
        ]
      }
      qa: {
        Row: {
          answer: Json | null
          created_at: string
          event_id: number
          id: number
          question: Json
          status: string
          updated_at: string
        }
        Insert: {
          answer?: Json | null
          created_at?: string
          event_id: number
          id?: number
          question: Json
          status?: string
          updated_at?: string
        }
        Update: {
          answer?: Json | null
          created_at?: string
          event_id?: number
          id?: number
          question?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qa_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
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
          code: string
          created_at: string
          id: string
          is_open: boolean
          owner_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_open?: boolean
          owner_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_open?: boolean
          owner_id?: string
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      taboo_terms: {
        Row: {
          id: string
          locale: string
          term: string
          word_id: string
        }
        Insert: {
          id?: string
          locale?: string
          term: string
          word_id: string
        }
        Update: {
          id?: string
          locale?: string
          term?: string
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "taboo_terms_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          action_type: string
          created_at: string | null
          custom_id: string | null
          description: string
          group: string | null
          id: string
          level: number
          prep_time: number | null
          status: number | null
          task_time: number | null
          viewed: boolean | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          custom_id?: string | null
          description: string
          group?: string | null
          id?: string
          level: number
          prep_time?: number | null
          status?: number | null
          task_time?: number | null
          viewed?: boolean | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          custom_id?: string | null
          description?: string
          group?: string | null
          id?: string
          level?: number
          prep_time?: number | null
          status?: number | null
          task_time?: number | null
          viewed?: boolean | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      word_localizations: {
        Row: {
          id: string
          locale: string
          translated_word: string
          word_id: string
        }
        Insert: {
          id?: string
          locale: string
          translated_word: string
          word_id: string
        }
        Update: {
          id?: string
          locale?: string
          translated_word?: string
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_localizations_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      words: {
        Row: {
          category_id: string
          created_at: string
          default_difficulty_id: string | null
          default_mode_id: string | null
          id: string
          is_active: boolean
          locale: string
          word: string
        }
        Insert: {
          category_id: string
          created_at?: string
          default_difficulty_id?: string | null
          default_mode_id?: string | null
          id?: string
          is_active?: boolean
          locale?: string
          word: string
        }
        Update: {
          category_id?: string
          created_at?: string
          default_difficulty_id?: string | null
          default_mode_id?: string | null
          id?: string
          is_active?: boolean
          locale?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_words_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_words_difficulty"
            columns: ["default_difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_words_mode"
            columns: ["default_mode_id"]
            isOneToOne: false
            referencedRelation: "modes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      herd_categories_with_counts: {
        Row: {
          count: number | null
          display_order: number | null
          id: string | null
          is_active: boolean | null
          name: string | null
          slug: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      coupl_generate_results_informative: {
        Args: { p_category_name_sk: string; p_session_id: string }
        Returns: undefined
      }
      coupl_upsert_answer: {
        Args: {
          p_custom_text?: string
          p_participant_id: string
          p_question_id: string
          p_value: string
        }
        Returns: {
          answer_data: Json
          answered_at: string | null
          id: string
          participant_id: string | null
          question_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "coupl_answers"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      ensure_room: {
        Args: never
        Returns: {
          code: string
          created_at: string
          id: string
          is_open: boolean
          owner_id: string
        }
        SetofOptions: {
          from: "*"
          to: "rooms"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      generate_unique_code: { Args: { len?: number }; Returns: string }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_random_task: {
        Args: { only_favorites?: boolean; task_level: number }
        Returns: {
          action_type: string
          created_at: string
          custom_id: string
          description: string
          group: string
          id: string
          level: number
          prep_time: number
          status: string
          task_time: number
          viewed: boolean
        }[]
      }
      gettransactionid: { Args: never; Returns: unknown }
      immutable_unaccent: { Args: { input: string }; Returns: string }
      is_admin: { Args: { user_email: string }; Returns: boolean }
      join_room: {
        Args: { p_code: string; p_guest_id?: string; p_nickname: string }
        Returns: {
          guest_id: string
          id: string
          joined_at: string
          left_at: string | null
          nickname: string
          room_id: string
          session_id: string
        }
        SetofOptions: {
          from: "*"
          to: "participants"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      lock_lobby: {
        Args: never
        Returns: {
          created_at: string
          ended_at: string | null
          id: string
          room_id: string
          status: string
        }
        SetofOptions: {
          from: "*"
          to: "game_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      longtransactionsenabled: { Args: never; Returns: boolean }
      muni_poi_counts: {
        Args: { _muni_id: number }
        Returns: {
          count: number
          km: number
        }[]
      }
      open_lobby: {
        Args: never
        Returns: {
          created_at: string
          ended_at: string | null
          id: string
          room_id: string
          status: string
        }
        SetofOptions: {
          from: "*"
          to: "game_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      poi_nearby_by_category: {
        Args: {
          _km?: number
          _limit?: number
          _muni_id: number
          _offset?: number
          _tags?: string[]
        }
        Returns: {
          distance_km: number
          id: number
          name: string
          tags: string[]
          type: string
          verified: boolean
        }[]
      }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      random_code: { Args: { len?: number }; Returns: string }
      rejoin: {
        Args: { p_code: string; p_guest_id: string; p_nickname?: string }
        Returns: {
          guest_id: string
          id: string
          joined_at: string
          left_at: string | null
          nickname: string
          room_id: string
          session_id: string
        }
        SetofOptions: {
          from: "*"
          to: "participants"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      start_game: {
        Args: never
        Returns: {
          created_at: string
          ended_at: string | null
          id: string
          room_id: string
          status: string
        }
        SetofOptions: {
          from: "*"
          to: "game_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      unaccent: { Args: { "": string }; Returns: string }
      unlockrows: { Args: { "": string }; Returns: number }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
