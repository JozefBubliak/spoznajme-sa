// PATH: src/app/api/games/_session.ts
import { createClient } from '@supabase/supabase-js'

/**
 * Tieto hodnoty musia byť stringy, nie string | undefined,
 * aby prešiel TypeScript pri volaní createClient().
 */
const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// podporíme bežné názvy kľúčov: NEXT_PUBLIC_SUPABASE_ANON_KEY alebo SUPABASE_ANON_KEY
const SUPABASE_ANON_KEY: string =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  ''

/**
 * Na serveri si vieme načítať používateľa z Bearer tokenu.
 * Vráti objekt user alebo null, ak token nie je alebo je neplatný.
 */
export async function getAuthUserFromRequest(req: Request) {
  // Skúsime nájsť bearer token
  const authHeader =
    req.headers.get('authorization') || req.headers.get('Authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : undefined

  if (!token) return null
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // ak env chýbajú, nech to padne "mäkko" na null namiesto typovej chyby
    console.warn(
      '[getAuthUserFromRequest] Missing NEXT_PUBLIC_SUPABASE_URL or ANON KEY env.'
    )
    return null
  }

  // na auth stačí public (anon) kľúč
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) return null
  return data.user
}
