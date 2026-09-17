// src/lib/supabase/rel-server.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client scoped to the `rel` schema, using the anon key.
 * The `rel` schema grants (see supabase/migrations/20260529_*) only cover
 * `anon`/`authenticated` — `service_role` was never granted USAGE, so
 * `supabaseAdmin().schema('rel')` fails with "permission denied for schema rel".
 * Public read-only rel views/tables are safe to read with the anon key.
 */
export const relServer = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: 'rel' } }
  );
