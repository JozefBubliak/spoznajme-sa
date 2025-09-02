import { Game, Player, Round, Question, Answer, CategoryWithCount, LeaderboardEntry } from '@/types/database';

// Mock API for development - replace with actual Supabase calls when backend is ready
export class GameAPI {
  private static games = new Map<string, Game>();
  private static players = new Map<string, Player[]>();
  private static rounds = new Map<string, Round[]>();
  private static questions = new Map<string, Question[]>();
  private static answers = new Map<string, Answer[]>();

  static async createGame(
    code: string,
    locale: string,
    mode: 'country' | 'global' = 'country',
    countryCode?: string
  ): Promise<Game> {
    const game: Game = {
      id: `game_${Date.now()}`,
      code,
      locale,
      mode,
      country_code: countryCode ?? null,
      status: 'lobby',
      lobby_locked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    this.games.set(game.id, game);
    this.players.set(game.id, []);
    console.log('Game created:', game);
    return game;
  }

  static async getGame(code: string): Promise<Game | null> {
    for (const game of this.games.values()) {
      if (game.code === code) {
        return game;
      }
    }
    return null;
  }

  static async lockLobby(gameId: string): Promise<void> {
    const game = this.games.get(gameId);
    if (game) {
      game.lobby_locked = true;
      game.updated_at = new Date().toISOString();
      this.games.set(gameId, game);
      console.log('Lobby locked:', gameId);
    }
  }

  static async updateGameStatus(gameId: string, status: 'lobby' | 'playing' | 'finished'): Promise<void> {
    const game = this.games.get(gameId);
    if (game) {
      game.status = status;
      game.updated_at = new Date().toISOString();
      this.games.set(gameId, game);
      console.log('Game status updated:', gameId, status);
    }
  }

  static async addPlayer(gameId: string, name: string): Promise<Player> {
    const player: Player = {
      id: `player_${Date.now()}_${Math.random()}`,
      game_id: gameId,
      name,
      score: 0,
      joined_at: new Date().toISOString(),
    };
    
    const players = this.players.get(gameId) || [];
    players.push(player);
    this.players.set(gameId, players);
    console.log('Player added:', player);
    return player;
  }

  static async getPlayers(gameId: string): Promise<Player[]> {
    return this.players.get(gameId) || [];
  }

  static async getCategories(locale: string): Promise<CategoryWithCount[]> {
    // Mock categories with question counts
    const categories: CategoryWithCount[] = [
      { id: 'general', name: 'General Knowledge', is_active: true, created_at: new Date().toISOString(), question_count: 50 },
      { id: 'science', name: 'Science', is_active: true, created_at: new Date().toISOString(), question_count: 30 },
      { id: 'history', name: 'History', is_active: true, created_at: new Date().toISOString(), question_count: 25 },
      { id: 'sports', name: 'Sports', is_active: true, created_at: new Date().toISOString(), question_count: 20 },
      { id: 'culture', name: 'Culture', is_active: true, created_at: new Date().toISOString(), question_count: 35 },
    ];
    
    console.log('Categories fetched for locale:', locale);
    return categories;
  }

  static async createRound(gameId: string, categoryId: string, questionCount: number, timerSeconds?: number): Promise<Round> {
    const round: Round = {
      id: `round_${Date.now()}`,
      game_id: gameId,
      category_id: categoryId,
      question_count: questionCount,
      current_question: 0,
      status: 'pending',
      timer_seconds: timerSeconds || null,
      created_at: new Date().toISOString(),
    };
    
    const rounds = this.rounds.get(gameId) || [];
    rounds.push(round);
    this.rounds.set(gameId, rounds);
    console.log('Round created:', round);
    return round;
  }

  static async getRounds(gameId: string): Promise<Round[]> {
    return this.rounds.get(gameId) || [];
  }

  static async getRandomQuestions(
    categoryId: string,
    locale: string,
    count: number,
    countryCode?: string
  ): Promise<Question[]> {
    // Mock questions - in real implementation, this would query the database
    const mockQuestions: Question[] = [];

    for (let i = 0; i < count; i++) {
      mockQuestions.push({
        id: `question_${categoryId}_${i}`,
        category_id: categoryId,
        text: `Sample question ${i + 1} for ${categoryId}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: Math.floor(Math.random() * 4),
        explanation: `This is the explanation for question ${i + 1}`,
        classic: true,
        locale: locale,
        country_code: countryCode ?? null,
        is_universal: !countryCode,
        created_at: new Date().toISOString(),
      });
    }

    console.log('Random questions generated:', mockQuestions.length);
    return mockQuestions;
  }

  static async startRound(roundId: string): Promise<void> {
    // Find and update round status
    for (const rounds of this.rounds.values()) {
      const round = rounds.find(r => r.id === roundId);
      if (round) {
        round.status = 'active';
        console.log('Round started:', roundId);
        break;
      }
    }
  }

  static async nextQuestion(roundId: string): Promise<void> {
    // Find and increment current question
    for (const rounds of this.rounds.values()) {
      const round = rounds.find(r => r.id === roundId);
      if (round) {
        round.current_question += 1;
        console.log('Next question:', roundId, round.current_question);
        break;
      }
    }
  }

  static async lockRound(roundId: string): Promise<void> {
    // Find and update round status
    for (const rounds of this.rounds.values()) {
      const round = rounds.find(r => r.id === roundId);
      if (round) {
        round.status = 'finished';
        console.log('Round locked:', roundId);
        break;
      }
    }
  }

  static async submitAnswer(playerId: string, questionId: string, answerIndex: number, isCorrect: boolean): Promise<Answer> {
    const answer: Answer = {
      id: `answer_${Date.now()}`,
      player_id: playerId,
      question_id: questionId,
      answer_index: answerIndex,
      is_correct: isCorrect,
      answered_at: new Date().toISOString(),
    };
    
    const answers = this.answers.get(playerId) || [];
    answers.push(answer);
    this.answers.set(playerId, answers);
    
    // Update player score
    if (isCorrect) {
      for (const players of this.players.values()) {
        const player = players.find(p => p.id === playerId);
        if (player) {
          player.score += 10;
          break;
        }
      }
    }
    
    console.log('Answer submitted:', answer);
    return answer;
  }

  static async getLeaderboard(gameId: string): Promise<LeaderboardEntry[]> {
    const players = this.players.get(gameId) || [];
    const sorted = [...players].sort((a, b) => b.score - a.score);
    
    return sorted.map((player, index) => ({
      player_id: player.id,
      name: player.name,
      score: player.score,
      rank: index + 1,
    }));
  }

  static subscribeToGame(gameId: string, callback: (payload: any) => void) {
    // Mock subscription - in real implementation, this would use Supabase realtime
    console.log('Subscribed to game:', gameId);
    return {
      unsubscribe: () => {
        console.log('Unsubscribed from game:', gameId);
      }
    };
  }

  static unsubscribeFromGame(gameId: string) {
    console.log('Unsubscribed from game:', gameId);
  }
}