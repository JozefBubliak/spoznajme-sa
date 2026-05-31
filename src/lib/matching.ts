
import { isRejectionAnswer } from './rejection';

import type {
  AnswerData,
  AnswerDataSingle,
  AnswerDataMultiple,
  AnswerDataScale,
  AnswerDataReciprocal,
  AnswerOption,
  QuestionType,
} from '../types/domain';


// Calculate compatibility score between two answers based on question type.
export function calculateCompatibility(
  type: QuestionType,
  a: AnswerData,
  b: AnswerData
): number {
  switch (type) {

    case 'single_choice': {
      const A = a as AnswerDataSingle;
      const B = b as AnswerDataSingle;
      return A.value && B.value && A.value === B.value ? 100 : 60;
    }
    case 'multiple_choice': {
      const A = a as AnswerDataMultiple;
      const B = b as AnswerDataMultiple;
      const av = new Set(A.values ?? []);
      const bv = new Set(B.values ?? []);
      const inter = [...av].filter((v) => bv.has(v)).length;
      const largestSelection = Math.max(av.size, bv.size);
      return largestSelection === 0 ? 0 : Math.round((inter / largestSelection) * 100);
    }
    case 'scale': {
      const A = a as AnswerDataScale;
      const B = b as AnswerDataScale;
      const diff = Math.abs((A.score ?? 0) - (B.score ?? 0));

      return Math.max(0, 100 - diff * 20);
    }
    case 'text':
      return 75;
    case 'reciprocal': {

      const A = a as AnswerDataReciprocal;
      const B = b as AnswerDataReciprocal;
      const aGives = A.roles?.giver?.value === 'give';
      const aReceives = A.roles?.receiver?.value === 'receive';
      const bGives = B.roles?.giver?.value === 'give';
      const bReceives = B.roles?.receiver?.value === 'receive';
      if ((aGives && bReceives) || (bGives && aReceives)) return 100;
      if ((aGives && bGives) || (aReceives && bReceives)) return 60;
      return 80;

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

  b: AnswerData,
  options: AnswerOption[] = []
): GeneratedResult {
  if (isRejectionAnswer(a, options) || isRejectionAnswer(b, options)) {

    return { shouldDisplay: false, compatibilityScore: null };
  }
  return {
    shouldDisplay: true,
    compatibilityScore: calculateCompatibility(type, a, b),
  };
}
