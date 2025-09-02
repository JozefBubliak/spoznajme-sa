export interface Database {
  public: {
    Tables: {
      herd_games: {
        Row: {
          id: string;
          code: string;
          locale: string;
          mode: 'country' | 'global';
          country_code: string | null;
          status: 'lobby' | 'playing' | 'finished';
          lobby_locked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          locale: string;
          mode?: 'country' | 'global';
          country_code?: string | null;
          status?: 'lobby' | 'playing' | 'finished';
          lobby_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          locale?: string;
          mode?: 'country' | 'global';
          country_code?: string | null;
          status?: 'lobby' | 'playing' | 'finished';
          lobby_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      herd_players: {
        Row: {
          id: string;
          game_id: string;
          name: string;
          score: number;
          joined_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          name: string;
          score?: number;
          joined_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          name?: string;
          score?: number;
          joined_at?: string;
        };
      };
      herd_rounds: {
        Row: {
          id: string;
          game_id: string;
          category_id: string;
          question_count: number;
          current_question: number;
          status: 'pending' | 'active' | 'finished';
          timer_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          category_id: string;
          question_count: number;
          current_question?: number;
          status?: 'pending' | 'active' | 'finished';
          timer_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          category_id?: string;
          question_count?: number;
          current_question?: number;
          status?: 'pending' | 'active' | 'finished';
          timer_seconds?: number | null;
          created_at?: string;
        };
      };
      herd_questions: {
        Row: {
          id: string;
          category_id: string;
          text: string;
          options: string[];
          correct_answer: number;
          explanation: string | null;
          classic: boolean;
          locale: string | null;
          country_code: string | null;
          is_universal: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          text: string;
          options: string[];
          correct_answer: number;
          explanation?: string | null;
          classic?: boolean;
          locale?: string | null;
          country_code?: string | null;
          is_universal?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          text?: string;
          options?: string[];
          correct_answer?: number;
          explanation?: string | null;
          classic?: boolean;
          locale?: string | null;
          country_code?: string | null;
          is_universal?: boolean;
          created_at?: string;
        };
      };
      herd_categories: {
        Row: {
          id: string;
          name: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      herd_answers: {
        Row: {
          id: string;
          player_id: string;
          question_id: string;
          answer_index: number;
          is_correct: boolean;
          answered_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          question_id: string;
          answer_index: number;
          is_correct: boolean;
          answered_at?: string;
        };
        Update: {
          id?: string;
          player_id?: string;
          question_id?: string;
          answer_index?: number;
          is_correct?: boolean;
          answered_at?: string;
        };
      };
    };
  };
}

export type Game = Database['public']['Tables']['herd_games']['Row'];
export type Player = Database['public']['Tables']['herd_players']['Row'];
export type Round = Database['public']['Tables']['herd_rounds']['Row'];
export type Question = Database['public']['Tables']['herd_questions']['Row'];
export type Category = Database['public']['Tables']['herd_categories']['Row'];
export type Answer = Database['public']['Tables']['herd_answers']['Row'];

export interface GameWithPlayers extends Game {
  players: Player[];
}

export interface RoundWithQuestions extends Round {
  questions: Question[];
}

export interface CategoryWithCount extends Category {
  question_count: number;
}

export interface LeaderboardEntry {
  player_id: string;
  name: string;
  score: number;
  rank: number;
}

export interface RealtimeEvent {
  type: 'player_joined' | 'lobby_locked' | 'timer_start' | 'round_locked' | 'results' | 'next_question' | 'round_finished';
  payload: any;
}