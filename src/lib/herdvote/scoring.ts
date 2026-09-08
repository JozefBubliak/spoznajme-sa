// src/lib/herdvote/scoring.ts

import type { ScoringClassic, ScoringPodium, PlayerAnswer, Question } from './store'

export interface ScoreContext {
  /** Everyone in the game, so non-answerers still get the "none" points. */
  allPlayerIds?: string[]
  /** Question timer deadline (ms epoch) — enables the classic speed bonus. */
  deadlineMs?: number | null
  /** Question timer duration (ms) — enables the classic speed bonus. */
  durationMs?: number | null
  /** Consecutive-correct count each player carried INTO this question. */
  streakByPlayer?: Record<string, number>
}

/** Escalating bonus for keeping a correct-answer streak alive (Kahoot-style, scaled). */
export function streakBonusPoints(priorConsecutiveCorrect: number): number {
  if (priorConsecutiveCorrect < 1) return 0
  return Math.min(priorConsecutiveCorrect, 5)
}

/** Fraction of the timer still left when the answer landed, clamped to [0,1]. */
function remainingFraction(answerTs: number, deadlineMs?: number | null, durationMs?: number | null): number {
  if (!deadlineMs || !durationMs || durationMs <= 0) return 0
  const left = deadlineMs - answerTs
  return Math.max(0, Math.min(1, left / durationMs))
}

export function calculateClassicScore(
  scoring: ScoringClassic,
  answer: 'A' | 'B' | 'C' | 'D' | null,
  correctAnswer: 'A' | 'B' | 'C' | 'D'
): number {
  if (answer === null) return scoring.none
  if (answer === correctAnswer) return scoring.correct
  return scoring.incorrect
}

export function calculatePodiumScore(
  scoring: ScoringPodium,
  playerAnswers: PlayerAnswer[],
  question: Question,
  playerId: string
): number {
  const playerAnswer = playerAnswers.find(a => a.playerId === playerId)

  if (!playerAnswer || playerAnswer.answer === null) {
    return scoring.none
  }

  if (playerAnswer.answer !== question.correct_answer) {
    return scoring.incorrect
  }

  // Correct answer - calculate podium position based on response time
  const correctAnswers = playerAnswers
    .filter(a => a.answer === question.correct_answer)
    .sort((a, b) => a.ts - b.ts) // earliest first

  const position = correctAnswers.findIndex(a => a.playerId === playerId)

  if (position < scoring.tiers.length) {
    return scoring.tiers[position]!
  }

  // Beyond podium tiers, give base correct points (last tier)
  return scoring.tiers[scoring.tiers.length - 1] || 0
}

export function calculateRoundScores(
  answers: PlayerAnswer[],
  question: Question,
  roundId: string,
  qIndex: number,
  scoring: ScoringClassic | ScoringPodium,
  ctx: ScoreContext = {}
): Record<string, number> {
  const roundAnswers = answers.filter(a => a.roundId === roundId && a.qIndex === qIndex)
  const scores: Record<string, number> = {}

  // Score every player in the game — those who never answered get the
  // configured "no answer" points instead of being silently skipped.
  const answeredIds = roundAnswers.map(a => a.playerId)
  const playerIds = [...new Set([...(ctx.allPlayerIds ?? []), ...answeredIds])]

  for (const playerId of playerIds) {
    if (scoring.mode === 'classic') {
      const pa = roundAnswers.find(a => a.playerId === playerId)
      let pts = calculateClassicScore(scoring, pa?.answer ?? null, question.correct_answer)
      const isCorrect = !!pa && pa.answer === question.correct_answer
      if (isCorrect) {
        if (scoring.speedBonus && scoring.speedBonus > 0) {
          pts += Math.round(scoring.speedBonus * remainingFraction(pa!.ts, ctx.deadlineMs, ctx.durationMs))
        }
        pts += streakBonusPoints(ctx.streakByPlayer?.[playerId] ?? 0)
      }
      scores[playerId] = pts
    } else {
      scores[playerId] = calculatePodiumScore(scoring, roundAnswers, question, playerId)
    }
  }

  return scores
}

export function mapFromGameScoringMode(mode: string): ScoringClassic | ScoringPodium {
  if (mode === 'weighted') {
    return { mode: 'podium', tiers: [5, 3, 1], incorrect: 0, none: 0 }
  }
  return { mode: 'classic', correct: 1, incorrect: 0, none: 0, speedBonus: 0 }
}
