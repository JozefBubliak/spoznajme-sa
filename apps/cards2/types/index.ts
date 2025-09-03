export interface Question {
  id: string;
  text: string;
  category_id: string;
  group: 'partners' | 'friends' | 'parent-child';
  language: string;
}

export interface Category {
  id: string;
  name: string;
  group: 'partners' | 'friends' | 'parent-child';
  language: string;
  icon?: string;
}

export interface User {
  id?: string;
  tier: 'demo' | 'free' | 'premium';
  language: string;
}

export interface DailyQuestion {
  id: string;
  question: Question;
  group: 'partners' | 'friends' | 'parent-child';
  date: string;
}

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export type QuestionGroup = 'partners' | 'friends' | 'parent-child';