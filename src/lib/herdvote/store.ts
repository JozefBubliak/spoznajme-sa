// PATH: src/lib/herdvote/store.ts
// Kompletný, ujednotený model + jednoduchý in‑memory store

export type Player = { id: string; name: string; score: number };

export type Question = {
  id: string;
  question_text: string;
  options: [string, string, string, string]; // A–D
  correct_answer: 'A'|'B'|'C'|'D';
  time_limit: number;          // v sekundách
  points_correct: number;
  points_incorrect: number;
  theme?: string | null;
};

export type ScoringClassic = {
  mode: 'classic';
  correct: number;
  incorrect: number;
  none: number;
};

export type ScoringPodium = {
  mode: 'podium';
  tiers: number[];   // napr. [10,5,3]
  incorrect: number;
  none: number;
};

export type RoundSettings = {
  timeLimit: number; // v sekundách
  scoring: ScoringClassic | ScoringPodium;
};

export type Round = {
  id: string;
  category: string;
  questions: Question[];
  settings: RoundSettings;
  status: 'pending'|'running'|'locked'|'results'|'finished'|'ready'|'shown';
  qIndex: number;     // index aktuálnej otázky
  startedAt?: number; // ms – štart aktuálnej otázky
  deadline?: number;  // ms – koniec časovača
};

export type PlayerAnswer = {
  playerId: string;
  roundId: string;
  qIndex: number;
  answer: 'A'|'B'|'C'|'D'|null;
  ts: number; // ms – čas odoslania
};

export type GameSettings = Record<string, unknown>;

export type Game = {
  id: string;
  code: string;
  status: 'waiting'|'active'|'finished'|'setup';
  settings: GameSettings;
  players: Player[];
  rounds: Round[];
  answers: PlayerAnswer[]; // všetky odpovede
  createdAt: number;

  activeRoundId?: string;
  usedQuestionIds?: string[];
};

// ---- helpers ----
function pickCode(len = 6) {
  const alph = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  if (typeof crypto !== 'undefined') {
    const c = crypto as Crypto & { randomInt?: (max: number) => number };
    if (typeof c.randomInt === 'function') {
      return Array.from({ length: len }, () => alph[c.randomInt!(alph.length)]).join('');
    }
    if (typeof c.getRandomValues === 'function') {
      const buf = new Uint32Array(len);
      c.getRandomValues(buf);
      return Array.from(buf, n => alph[n % alph.length]).join('');
    }
  }
  return Array.from(
    { length: len },
    () => alph[Math.floor(Math.random() * alph.length)]
  ).join('');
}
function uuid() {
  // v node 18+/browser je crypto.randomUUID; fallback pre istotu
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random()}`;
}

// ---- in‑memory store ----
export const store = {
  games: new Map<string, Game>(),

  createGame(settings: GameSettings = {}) {
    const code = pickCode(6);
    const game: Game = {
      id: uuid(),
      code,
      status: 'waiting',
      settings,
      players: [],
      rounds: [],
      answers: [],
      createdAt: Date.now(),
    };
    this.games.set(code, game);
    return game;
  },

  getGame(code: string) {
    return this.games.get(code) || null;
  },

  addRound(code: string, category: string, questions: Question[], settings: RoundSettings) {
    const g = this.getGame(code);
    if (!g) return null;
    const r: Round = {
      id: uuid(),
      category,
      questions,
      settings,
      status: 'pending',
      qIndex: 0,
    };
    g.rounds.push(r);
    return r;
  },

  addBulkQuestions(code: string, questions: Question[], settings: RoundSettings) {
    return this.addRound(code, 'bulk', questions, settings);
  },

  getActiveRound(code: string): Round | null {
    const g = this.getGame(code);
    if (!g || !g.activeRoundId) return null;
    return g.rounds.find(r => r.id === g.activeRoundId) || null;
  },

  getPlayerAnswer(playerId: string, roundId: string, qIndex: number): PlayerAnswer | null {
    const game = Array.from(this.games.values()).find(g => g.rounds.some(r => r.id === roundId));
    if (!game) return null;
    const ans = game.answers.find(a => a.playerId === playerId && a.roundId === roundId && a.qIndex === qIndex);
    return ans || null;
  },
};

export default store;
