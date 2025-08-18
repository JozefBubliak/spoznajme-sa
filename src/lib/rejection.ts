import { type AnswerData, type AnswerOption } from '../types/domain';

// Values treated as rejection even without explicit flag
const REJECTION_VALUES = new Set([
  'nie',
  'nie_nekomfortne',
  'tabu',
  'nope',
  'nie_samostatne',
]);

/**
 * Determines if an answer represents a rejection.
 * Checks explicit rejection flag, option-level markers,
 * and known negative values across answer kinds.
 */
export function isRejectionAnswer(
  answer: AnswerData,
  options: AnswerOption[] = []
): boolean {
  if (answer.rejection) return true;

  const optionMap = new Map(options.map((o) => [o.value, o.is_rejection]));
  const check = (v?: string) =>
    v ? optionMap.get(v) === true || REJECTION_VALUES.has(v) : false;

  switch (answer.kind) {
    case 'single_choice':
      return check(answer.value);
    case 'multiple_choice':
      return answer.values?.some((v) => check(v)) ?? false;
    case 'scale':
      return check(answer.score?.toString());
    case 'text':
      return check(answer.text);
    case 'reciprocal':
      return (
        check(answer.roles?.giver?.value) || check(answer.roles?.receiver?.value)
      );
    default:
      return false;
  }
}
