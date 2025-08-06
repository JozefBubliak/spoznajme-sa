// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oxbmplsrpqlsmjrmwytn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Ym1wbHNycHFsc21qcm13eXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTQ0NzYsImV4cCI6MjA2ODY5MDQ3Nn0.zdKumxMlSuSGumN59ZRlixifRU0n1ObIt1Cnis-3l6g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
