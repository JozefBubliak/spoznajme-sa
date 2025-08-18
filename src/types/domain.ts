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


// Shared base for all answer types.
const BaseAnswer = z.object({
  kind: QuestionType,

  customText: z.string().optional(),
  rejection: z.boolean().optional(),
});

export const AnswerDataSingle = BaseAnswer.extend({

  kind: z.literal('single_choice'),
  value: z.string().optional(),
});
export type AnswerDataSingle = z.infer<typeof AnswerDataSingle>;

export const AnswerDataMultiple = BaseAnswer.extend({
  kind: z.literal('multiple_choice'),
  values: z.array(z.string()).optional(),
});
export type AnswerDataMultiple = z.infer<typeof AnswerDataMultiple>;

export const AnswerDataScale = BaseAnswer.extend({
  kind: z.literal('scale'),
  score: z.number().optional(),
});
export type AnswerDataScale = z.infer<typeof AnswerDataScale>;

export const AnswerDataText = BaseAnswer.extend({
  kind: z.literal('text'),
  text: z.string().optional(),
});
export type AnswerDataText = z.infer<typeof AnswerDataText>;

export const AnswerDataReciprocal = BaseAnswer.extend({
  kind: z.literal('reciprocal'),
  roles: z
    .object({
      giver: z
        .object({
          value: z.string().optional(),
          rejection: z.boolean().optional(),
          customText: z.string().optional(),
        })
        .optional(),
      receiver: z
        .object({
          value: z.string().optional(),
          rejection: z.boolean().optional(),
          customText: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});
export type AnswerDataReciprocal = z.infer<typeof AnswerDataReciprocal>;

export const AnswerData = z.discriminatedUnion('kind', [

  AnswerDataSingle,
  AnswerDataMultiple,
  AnswerDataScale,
  AnswerDataText,
  AnswerDataReciprocal,
]);
export type AnswerData = z.infer<typeof AnswerData>;

export const AnswerOption = z.object({
  value: z.string(),
  is_rejection: z.boolean().optional(),
});
export type AnswerOption = z.infer<typeof AnswerOption>;

