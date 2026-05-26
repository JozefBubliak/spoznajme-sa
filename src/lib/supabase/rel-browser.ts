'use client'

import { createClient } from '@supabase/supabase-js'

/**
 * Browser-side Supabase client scoped to the `rel` schema.
 * Used by Nudge Engine and other Relationship Companion features.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const relBrowser = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: 'rel' },
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  )
