// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uoochdvpvjlcuxwlyhnb.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvb2NoZHZwdmpsY3V4d2x5aG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTk0NTEsImV4cCI6MjA2OTg5NTQ1MX0.jyq4HucMx_27DLaa6wN611VVMCXg2Z42VRJ1XDxqJHs"

// Pozor: na serveri nie je localStorage – vytvorme klienta bezpečne podľa prostredia
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
  },
})
