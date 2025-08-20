import { createUseAuth } from './createUseAuth'
import { supabaseHerd } from '@/lib/supabaseHerdClient'

export const useHerdVoteAuth = createUseAuth(supabaseHerd, 'sb-herd-auth-token')
