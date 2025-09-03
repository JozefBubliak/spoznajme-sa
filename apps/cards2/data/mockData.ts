import { Question, Category, DailyQuestion } from '@/types';

export const mockCategories: Category[] = [
  // Partners - English
  { id: 'p1', name: 'Deep Connection', group: 'partners', language: 'en', icon: '💕' },
  { id: 'p2', name: 'Future Dreams', group: 'partners', language: 'en', icon: '🌟' },
  { id: 'p3', name: 'Intimacy', group: 'partners', language: 'en', icon: '🔥' },
  { id: 'p4', name: 'Past & Present', group: 'partners', language: 'en', icon: '⏰' },
  
  // Friends - English
  { id: 'f1', name: 'Childhood Memories', group: 'friends', language: 'en', icon: '🎈' },
  { id: 'f2', name: 'Adventures', group: 'friends', language: 'en', icon: '🗺️' },
  { id: 'f3', name: 'Personal Growth', group: 'friends', language: 'en', icon: '🌱' },
  { id: 'f4', name: 'Fun & Games', group: 'friends', language: 'en', icon: '🎮' },
  
  // Parent-Child - English
  { id: 'pc1', name: 'Family Values', group: 'parent-child', language: 'en', icon: '🏠' },
  { id: 'pc2', name: 'Growing Up', group: 'parent-child', language: 'en', icon: '📚' },
  { id: 'pc3', name: 'Life Lessons', group: 'parent-child', language: 'en', icon: '💡' },
  { id: 'pc4', name: 'Fun Together', group: 'parent-child', language: 'en', icon: '🎨' },

  // Spanish versions
  { id: 'p1_es', name: 'Conexión Profunda', group: 'partners', language: 'es', icon: '💕' },
  { id: 'f1_es', name: 'Recuerdos de la Infancia', group: 'friends', language: 'es', icon: '🎈' },
  { id: 'pc1_es', name: 'Valores Familiares', group: 'parent-child', language: 'es', icon: '🏠' },

  // Slovak versions
  { id: 'p1_sk', name: 'Hlboké Spojenie', group: 'partners', language: 'sk', icon: '💕' },
  { id: 'f1_sk', name: 'Detské Spomienky', group: 'friends', language: 'sk', icon: '🎈' },
  { id: 'pc1_sk', name: 'Rodinné Hodnoty', group: 'parent-child', language: 'sk', icon: '🏠' },
];

export const mockQuestions: Question[] = [
  // Partners - English
  { id: 'q1', text: 'What is your favorite memory of us together?', category_id: 'p1', group: 'partners', language: 'en' },
  { id: 'q2', text: 'If we could travel anywhere together, where would you want to go?', category_id: 'p2', group: 'partners', language: 'en' },
  { id: 'q3', text: 'What makes you feel most loved by me?', category_id: 'p3', group: 'partners', language: 'en' },
  { id: 'q4', text: 'What was your first impression of me?', category_id: 'p4', group: 'partners', language: 'en' },
  { id: 'q5', text: 'What do you think our life will look like in 10 years?', category_id: 'p2', group: 'partners', language: 'en' },
  { id: 'q6', text: 'What is something you\'ve always wanted to tell me but haven\'t?', category_id: 'p1', group: 'partners', language: 'en' },
  { id: 'q7', text: 'How do you like to be comforted when you\'re upset?', category_id: 'p3', group: 'partners', language: 'en' },
  { id: 'q8', text: 'What was the moment you knew you loved me?', category_id: 'p4', group: 'partners', language: 'en' },
  { id: 'q9', text: 'What are three things you\'re grateful for about our relationship?', category_id: 'p1', group: 'partners', language: 'en' },
  { id: 'q10', text: 'What adventure would you like us to go on together?', category_id: 'p2', group: 'partners', language: 'en' },
  { id: 'q11', text: 'How can I better support your dreams and goals?', category_id: 'p2', group: 'partners', language: 'en' },
  { id: 'q12', text: 'What is your love language and how can I speak it better?', category_id: 'p3', group: 'partners', language: 'en' },

  // Friends - English
  { id: 'f1', text: 'What is your earliest childhood memory?', category_id: 'f1', group: 'friends', language: 'en' },
  { id: 'f2', text: 'If you could have any superpower, what would it be and why?', category_id: 'f4', group: 'friends', language: 'en' },
  { id: 'f3', text: 'What is the best advice you\'ve ever received?', category_id: 'f3', group: 'friends', language: 'en' },
  { id: 'f4', text: 'What adventure is on your bucket list?', category_id: 'f2', group: 'friends', language: 'en' },
  { id: 'f5', text: 'What was your favorite game to play as a child?', category_id: 'f1', group: 'friends', language: 'en' },
  { id: 'f6', text: 'If you could live anywhere in the world, where would it be?', category_id: 'f2', group: 'friends', language: 'en' },
  { id: 'f7', text: 'What is something you\'ve learned about yourself recently?', category_id: 'f3', group: 'friends', language: 'en' },
  { id: 'f8', text: 'What would be your perfect day?', category_id: 'f4', group: 'friends', language: 'en' },
  { id: 'f9', text: 'Who was your childhood hero?', category_id: 'f1', group: 'friends', language: 'en' },
  { id: 'f10', text: 'What is the most spontaneous thing you\'ve ever done?', category_id: 'f2', group: 'friends', language: 'en' },
  { id: 'f11', text: 'What is a skill you\'d love to learn?', category_id: 'f3', group: 'friends', language: 'en' },
  { id: 'f12', text: 'If you could have dinner with anyone, who would it be?', category_id: 'f4', group: 'friends', language: 'en' },

  // Parent-Child - English
  { id: 'pc1', text: 'What is your favorite family tradition?', category_id: 'pc1', group: 'parent-child', language: 'en' },
  { id: 'pc2', text: 'What do you want to be when you grow up?', category_id: 'pc2', group: 'parent-child', language: 'en' },
  { id: 'pc3', text: 'What is the most important thing I\'ve taught you?', category_id: 'pc3', group: 'parent-child', language: 'en' },
  { id: 'pc4', text: 'What is your favorite thing we do together?', category_id: 'pc4', group: 'parent-child', language: 'en' },
  { id: 'pc5', text: 'What makes our family special?', category_id: 'pc1', group: 'parent-child', language: 'en' },
  { id: 'pc6', text: 'What are you most proud of?', category_id: 'pc2', group: 'parent-child', language: 'en' },
  { id: 'pc7', text: 'What is something you want to learn together?', category_id: 'pc3', group: 'parent-child', language: 'en' },
  { id: 'pc8', text: 'What makes you laugh the most?', category_id: 'pc4', group: 'parent-child', language: 'en' },
  { id: 'pc9', text: 'What is your favorite memory with me?', category_id: 'pc1', group: 'parent-child', language: 'en' },
  { id: 'pc10', text: 'What do you hope for in the future?', category_id: 'pc2', group: 'parent-child', language: 'en' },
  { id: 'pc11', text: 'What is the best part of being in our family?', category_id: 'pc3', group: 'parent-child', language: 'en' },
  { id: 'pc12', text: 'What new activity would you like to try together?', category_id: 'pc4', group: 'parent-child', language: 'en' },

  // Spanish samples
  { id: 'q1_es', text: '¿Cuál es tu recuerdo favorito de nosotros juntos?', category_id: 'p1_es', group: 'partners', language: 'es' },
  { id: 'f1_es', text: '¿Cuál es tu primer recuerdo de la infancia?', category_id: 'f1_es', group: 'friends', language: 'es' },
  { id: 'pc1_es', text: '¿Cuál es tu tradición familiar favorita?', category_id: 'pc1_es', group: 'parent-child', language: 'es' },

  // Slovak samples
  { id: 'q1_sk', text: 'Aká je tvoja najobľúbenejšia spomienka na nás?', category_id: 'p1_sk', group: 'partners', language: 'sk' },
  { id: 'f1_sk', text: 'Aká je tvoja najstaršia spomienka z detstva?', category_id: 'f1_sk', group: 'friends', language: 'sk' },
  { id: 'pc1_sk', text: 'Aká je tvoja najobľúbenejšia rodinná tradícia?', category_id: 'pc1_sk', group: 'parent-child', language: 'sk' },
];

export const mockDailyQuestions: DailyQuestion[] = [
  {
    id: 'dq1',
    question: mockQuestions[0],
    group: 'partners',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'dq2',
    question: mockQuestions[1],
    group: 'partners',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'dq3',
    question: mockQuestions[12],
    group: 'friends',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'dq4',
    question: mockQuestions[13],
    group: 'friends',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'dq5',
    question: mockQuestions[24],
    group: 'parent-child',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'dq6',
    question: mockQuestions[25],
    group: 'parent-child',
    date: new Date().toISOString().split('T')[0],
  },
];