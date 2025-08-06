
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Use the auth helpers client for proper session management
export const supabase = createClientComponentClient()
