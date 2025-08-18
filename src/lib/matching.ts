import type { AnswerData, QuestionType } from '../types/domain';
import { isRejectionAnswer } from '../types/domain';

// Calculate compatibility score between two answers based on question type.
export function calculateCompatibility(
  type: QuestionType,
  a: AnswerData,
  b: AnswerData
): number {
  switch (type) {
    case 'single_choice':
      return a.value && b.value && a.value === b.value ? 100 : 60;
    case 'multiple_choice': {
      const av = new Set(a.values ?? []);
      const bv = new Set(b.values ?? []);
      const inter = [...av].filter((v) => bv.has(v));
      const union = new Set([...av, ...bv]);
      return union.size === 0 ? 0 : Math.round((inter.length / union.size) * 100);
    }
    case 'scale': {
      const diff = Math.abs((a.value ?? 0) - (b.value ?? 0));
      return Math.max(0, 100 - diff * 20);
    }
    case 'text':
      return 75;
    case 'reciprocal': {
      const giverA = (a as any).giver;
      const giverB = (b as any).giver;
      const receiverA = (a as any).receiver;
      const receiverB = (b as any).receiver;
      if (
        (giverA === 'give' && receiverB === 'receive') ||
        (giverB === 'give' && receiverA === 'receive')
      )
        return 100;
      if (
        (giverA === 'give' && giverB === 'give') ||
        (receiverA === 'receive' && receiverB === 'receive')
      )
        return 60;
      return 80; // at least one maybe
    }
    default:
      return 0;
  }
}

export interface GeneratedResult {
  shouldDisplay: boolean;
  compatibilityScore: number | null;
}

// Generates a result for a pair of answers.
export function generateSessionResult(
  type: QuestionType,
  a: AnswerData,
  b: AnswerData
): GeneratedResult {
  if (isRejectionAnswer(a) || isRejectionAnswer(b)) {
    return { shouldDisplay: false, compatibilityScore: null };
  }
  return {
    shouldDisplay: true,
    compatibilityScore: calculateCompatibility(type, a, b),
  };
}
