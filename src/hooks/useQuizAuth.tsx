import { createUseAuth } from './createUseAuth'
import { supabaseQuiz } from '@/lib/supabaseQuizClient'

export const useQuizAuth = createUseAuth(supabaseQuiz, 'sb-quiz-auth-token')
