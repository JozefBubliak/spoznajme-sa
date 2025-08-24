export const TABLES = {
  categories: 'coupl_categories',
  questions: 'coupl_questions',
  answerOptions: 'coupl_answer_options',
  sessions: 'coupl_sessions',
  participants: 'coupl_participants',
  categoryPrefs: 'coupl_category_preferences',
  answers: 'coupl_answers',
  results: 'coupl_results',
} as const;

export type TableName = typeof TABLES[keyof typeof TABLES];
