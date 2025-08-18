import { z } from 'zod';

export const QuestionType = z.enum([
  'single_choice',
  'multiple_choice',
  'reciprocal',
  'scale',
  'text',
]);
export type QuestionType = z.infer<typeof QuestionType>;

export const LocalizedText = z.record(z.string());
export type LocalizedText = z.infer<typeof LocalizedText>;

const BaseAnswer = z.object({
  customText: z.string().optional(),
  rejection: z.boolean().optional(),
});

export const AnswerDataSingle = BaseAnswer.extend({
  value: z.string().optional(),
});
export const AnswerDataMultiple = BaseAnswer.extend({
  values: z.array(z.string()).optional(),
});
export const AnswerDataScale = BaseAnswer.extend({
  value: z.number().optional(),
});
export const AnswerDataText = BaseAnswer.extend({
  text: z.string().optional(),
});
export const AnswerDataReciprocal = BaseAnswer.extend({
  giver: z.string().optional(),
  receiver: z.string().optional(),
});

export const AnswerData = z.union([
  AnswerDataSingle,
  AnswerDataMultiple,
  AnswerDataScale,
  AnswerDataText,
  AnswerDataReciprocal,
]);
export type AnswerData = z.infer<typeof AnswerData>;

const REJECTION_VALUES = new Set([
  'nie',
  'nie_nekomfortne',
  'tabu',
  'nope',
  'nie_samostatne',
]);

// Determines if an answer represents a rejection.
export function isRejectionAnswer(answer: AnswerData): boolean {
  if (answer.rejection) return true;
  const check = (v?: string) => (v ? REJECTION_VALUES.has(v) : false);
  if ('value' in answer && check(answer.value)) return true;
  if ('values' in answer && answer.values?.some((v) => check(v))) return true;
  if ('giver' in answer && (check(answer.giver) || check(answer.receiver)))
    return true;
  return false;
}
