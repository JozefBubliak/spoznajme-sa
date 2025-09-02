import { Game, Player, Round, Question, Answer, CategoryWithCount, LeaderboardEntry } from '@/types/database';
import supabase from './upabase';

// API wrapper using Supabase backend
export class GameAPI {
  static async createGame(
    code: string,
    locale: string,
    mode: 'country' | 'global' = 'country',
    countryCode?: string
  ): Promise<Game> {
    const { data, error } = await supabase
      .from('herd_games')
      .insert({
        code,
        locale,
        mode,
        country_code: countryCode ?? null,
        status: 'lobby',
        lobby_locked: false,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Game;
  }

  static async getGame(code: string): Promise<Game | null> {
    const { data, error } = await supabase
      .from('herd_games')
      .select('*')
      .eq('code', code)
      .maybeSingle();
    if (error) throw error;
    return data as Game | null;
  }

  static async lockLobby(gameId: string): Promise<void> {
    const { error } = await supabase
      .from('herd_games')
      .update({ lobby_locked: true })
      .eq('id', gameId);
    if (error) throw error;
  }

  static async updateGameStatus(
    gameId: string,
    status: 'lobby' | 'playing' | 'finished'
  ): Promise<void> {
    const { error } = await supabase
      .from('herd_games')
      .update({ status })
      .eq('id', gameId);
    if (error) throw error;
  }

  static async addPlayer(gameId: string, name: string): Promise<Player> {
    const { data, error } = await supabase
      .from('herd_players')
      .insert({ game_id: gameId, name, score: 0 })
      .select()
      .single();
    if (error) throw error;
    return data as Player;
  }

  static async getPlayers(gameId: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from('herd_players')
      .select('*')
      .eq('game_id', gameId)
      .order('joined_at', { ascending: true });
    if (error) throw error;
    return (data as Player[]) || [];
  }

  static async getCategories(locale: string): Promise<CategoryWithCount[]> {
    const { data, error } = await supabase
      .from('herd_categories_with_counts')
      .select('id,name,is_active,created_at,question_count')
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return (data as CategoryWithCount[]) || [];
  }

  static async createRound(
    gameId: string,
    categoryId: string,
    questionCount: number,
    timerSeconds?: number
  ): Promise<Round> {
    const { data, error } = await supabase
      .from('herd_rounds')
      .insert({
        game_id: gameId,
        category_id: categoryId,
        question_count: questionCount,
        current_question: 0,
        status: 'pending',
        timer_seconds: timerSeconds ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Round;
  }

  static async getRandomQuestions(
    categoryId: string,
    locale: string,
    count: number,
    countryCode?: string
  ): Promise<Question[]> {
    const { data: ids, error: idErr } = await supabase.rpc(
      'random_herd_questions',
      { cat: categoryId, n: count }
    );
    if (idErr) throw idErr;
    const idList = (ids as any[] || []).map((r: any) => r.id);
    if (idList.length === 0) return [];
    const { data, error } = await supabase
      .from('herd_questions')
      .select('*')
      .in('id', idList);
    if (error) throw error;
    return (data as Question[]) || [];
  }

  static async startRound(roundId: string): Promise<void> {
    const { error } = await supabase
      .from('herd_rounds')
      .update({ status: 'active', current_question: 0 })
      .eq('id', roundId);
    if (error) throw error;
  }

  static async nextQuestion(roundId: string): Promise<void> {
    const { data } = await supabase
      .from('herd_rounds')
      .select('current_question')
      .eq('id', roundId)
      .single();
    const next = ((data as any)?.current_question ?? 0) + 1;
    const { error } = await supabase
      .from('herd_rounds')
      .update({ current_question: next })
      .eq('id', roundId);
    if (error) throw error;
  }

  static async lockRound(roundId: string): Promise<void> {
    const { error } = await supabase
      .from('herd_rounds')
      .update({ status: 'finished' })
      .eq('id', roundId);
    if (error) throw error;
  }

  static async submitAnswer(
    playerId: string,
    questionId: string,
    answerIndex: number,
    isCorrect: boolean
  ): Promise<Answer> {
    const { data, error } = await supabase
      .from('herd_answers')
      .insert({
        player_id: playerId,
        question_id: questionId,
        answer_index: answerIndex,
        is_correct: isCorrect,
      })
      .select()
      .single();
    if (error) throw error;

    if (isCorrect) {
      const { data: player } = await supabase
        .from('herd_players')
        .select('score')
        .eq('id', playerId)
        .single();
      const score = ((player as any)?.score ?? 0) + 10;
      await supabase.from('herd_players').update({ score }).eq('id', playerId);
    }
    return data as Answer;
  }

  static async getLeaderboard(gameId: string): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase
      .from('herd_players')
      .select('id, name, score')
      .eq('game_id', gameId)
      .order('score', { ascending: false });
    if (error) throw error;
    const list = (data as Player[]) || [];
    return list.map((p, idx) => ({
      player_id: p.id,
      name: p.name,
      score: p.score,
      rank: idx + 1,
    }));
  }

  static subscribeToGame(_gameId: string, _callback: (payload: any) => void) {
    // Realtime events can be wired here later
    return { unsubscribe: () => {} };
  }

  static unsubscribeFromGame(_gameId: string) {
    /* no-op */
  }
}

export default GameAPI;
