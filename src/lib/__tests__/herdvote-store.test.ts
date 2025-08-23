import { describe, it, expect, beforeEach } from 'vitest';
import store from '../herdvote/store';

const sampleQuestion = {
  id: 'q1',
  question_text: 'What is 2+2?',
  options: ['1','2','3','4'] as [string,string,string,string],
  correct_answer: 'D',
  time_limit: 30,
  points_correct: 1,
  points_incorrect: 0,
  theme: null,
};

const sampleSettings = {
  timeLimit: 30,
  scoring: { mode: 'classic', correct: 1, incorrect: 0, none: 0 },
};

describe('herdvote store', () => {
  beforeEach(() => {
    store.games.clear();
  });

  it('creates a game with default values', () => {
    const game = store.createGame();
    expect(game.code).toHaveLength(6);
    expect(game.status).toBe('waiting');
    expect(game.players).toHaveLength(0);
    expect(store.getGame(game.code)).toEqual(game);
  });

  it('adds a round to a game', () => {
    const game = store.createGame();
    const round = store.addRound(game.code, 'math', [sampleQuestion], sampleSettings);
    expect(round).not.toBeNull();
    expect(game.rounds).toHaveLength(1);
    expect(game.rounds[0].category).toBe('math');
  });

  it('retrieves a player answer', () => {
    const game = store.createGame();
    const round = store.addRound(game.code, 'math', [sampleQuestion], sampleSettings);
    if (!round) throw new Error('round not created');
    const answer = { playerId: 'p1', roundId: round.id, qIndex: 0, answer: 'A' as const, ts: Date.now() };
    game.answers.push(answer);
    expect(store.getPlayerAnswer('p1', round.id, 0)).toEqual(answer);
    expect(store.getPlayerAnswer('p2', round.id, 0)).toBeNull();
  });
});
