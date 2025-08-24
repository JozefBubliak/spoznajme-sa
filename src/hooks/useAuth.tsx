import { createUseAuth } from './createUseAuth'
import { supabase } from '@/lib/supabaseClient'

export const useAuth = createUseAuth(supabase)
