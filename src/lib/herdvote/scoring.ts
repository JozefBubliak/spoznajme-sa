// src/lib/herdvote/scoring.ts

import type { ScoringClassic, ScoringPodium, PlayerAnswer, Question } from './store'

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
  scoring: ScoringClassic | ScoringPodium
): Record<string, number> {
  const roundAnswers = answers.filter(a => a.roundId === roundId && a.qIndex === qIndex)
  const scores: Record<string, number> = {}

  // Get all unique player IDs who attempted this question
  const playerIds = [...new Set(roundAnswers.map(a => a.playerId))]

  for (const playerId of playerIds) {
    if (scoring.mode === 'classic') {
      const playerAnswer = roundAnswers.find(a => a.playerId === playerId)
      scores[playerId] = calculateClassicScore(
        scoring,
        playerAnswer?.answer || null,
        question.correct_answer
      )
    } else {
      scores[playerId] = calculatePodiumScore(
        scoring,
        roundAnswers,
        question,
        playerId
      )
    }
  }

  return scores
}