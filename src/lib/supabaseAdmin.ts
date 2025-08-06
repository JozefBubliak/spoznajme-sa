
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uoochdvpvjlcuxwlyhnb.supabase.co"
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvb2NoZHZwdmpsY3V4d2x5aG5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMxOTQ1MSwiZXhwIjoyMDY5ODk1NDUxfQ.ounpGBTdnpzrcmY9BGaS9MVcpwzz4ksJh4ChXgT_fTk"

export const supabase = createClient(supabaseUrl, supabaseServiceKey)
