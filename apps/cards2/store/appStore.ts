import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, Category, User, DailyQuestion, QuestionGroup } from '@/types';
import { DEFAULT_LANGUAGE } from '@/constants/languages';

interface AppState {
  // User & Language
  user: User;
  language: string;
  
  // Data
  questions: Question[];
  categories: Category[];
  dailyQuestions: DailyQuestion[];
  
  // UI State
  currentGroup: QuestionGroup | null;
  selectedCategories: string[];
  currentQuestionIndex: number;
  filteredQuestions: Question[];
  
  // Actions
  setLanguage: (language: string) => void;
  setUser: (user: User) => void;
  setCurrentGroup: (group: QuestionGroup | null) => void;
  setSelectedCategories: (categories: string[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  shuffleQuestions: () => void;
  
  // Data actions
  setQuestions: (questions: Question[]) => void;
  setCategories: (categories: Category[]) => void;
  setDailyQuestions: (dailyQuestions: DailyQuestion[]) => void;
  
  // Computed
  getCurrentQuestions: () => Question[];
  getDailyQuestionsForGroup: (group: QuestionGroup) => DailyQuestion[];
  getCategoriesForGroup: (group: QuestionGroup) => Category[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: { tier: 'demo', language: DEFAULT_LANGUAGE },
      language: DEFAULT_LANGUAGE,
      questions: [],
      categories: [],
      dailyQuestions: [],
      currentGroup: null,
      selectedCategories: [],
      currentQuestionIndex: 0,
      filteredQuestions: [],

      // Actions
      setLanguage: (language) => {
        set({ language });
        const user = get().user;
        set({ user: { ...user, language } });
      },

      setUser: (user) => set({ user }),

      setCurrentGroup: (group) => {
        set({ 
          currentGroup: group, 
          currentQuestionIndex: 0,
          selectedCategories: []
        });
      },

      setSelectedCategories: (categories) => {
        set({ selectedCategories: categories, currentQuestionIndex: 0 });
      },

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      nextQuestion: () => {
        const { currentQuestionIndex, filteredQuestions } = get();
        if (currentQuestionIndex < filteredQuestions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      shuffleQuestions: () => {
        const questions = get().getCurrentQuestions();
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        set({ filteredQuestions: shuffled, currentQuestionIndex: 0 });
      },

      setQuestions: (questions) => set({ questions }),
      setCategories: (categories) => set({ categories }),
      setDailyQuestions: (dailyQuestions) => set({ dailyQuestions }),

      // Computed
      getCurrentQuestions: () => {
        const { questions, currentGroup, selectedCategories, language, user } = get();
        
        let filtered = questions.filter(q => 
          q.group === currentGroup && 
          q.language === language
        );

        if (selectedCategories.length > 0) {
          filtered = filtered.filter(q => selectedCategories.includes(q.category_id));
        }

        // Apply user tier limits
        if (user.tier === 'demo') {
          filtered = filtered.slice(0, 10);
        }

        return filtered;
      },

      getDailyQuestionsForGroup: (group) => {
        const { dailyQuestions, language } = get();
        const today = new Date().toISOString().split('T')[0];
        
        return dailyQuestions.filter(dq => 
          dq.group === group && 
          dq.question.language === language &&
          dq.date === today
        );
      },

      getCategoriesForGroup: (group) => {
        const { categories, language } = get();
        return categories.filter(c => c.group === group && c.language === language);
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        language: state.language,
      }),
    }
  )
);