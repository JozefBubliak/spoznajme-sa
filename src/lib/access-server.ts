import 'server-only'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { type AccessResult, type ProductSlug, TESTING_MODE, isAdminEmail } from './access'

/**
 * Server-side access check — use in Server Components and Route Handlers.
 *
 * Returns:
 *  'granted'   — user is logged in and has access (or testing mode)
 *  'no-auth'   — user is not logged in
 *  'no-access' — user is logged in but has no entitlement for this product
 */
export async function checkAccess(productSlug: ProductSlug): Promise<AccessResult> {
  const session = await getSession()
  if (!session) return 'no-auth'

  const { user } = session

  // Admins always have access
  if (isAdminEmail(user.email)) return 'granted'

  // Testing mode: logged-in = access
  if (TESTING_MODE) return 'granted'

  // Production: check entitlements table via service role (bypasses RLS)
  const s = supabaseServer()
  const { data } = await s
    .from('user_entitlements')
    .select('id, expires_at')
    .eq('user_id', user.id)
    .eq('product_slug', productSlug)
    .maybeSingle()

  if (!data) return 'no-access'

  // Check expiry
  if (data.expires_at && new Date(data.expires_at as string) < new Date()) {
    return 'no-access'
  }

  return 'granted'
}

/**
 * Grant access to a product for a user (called from Stripe webhook).
 */
export async function grantAccess({
  userId,
  productSlug,
  stripeSessionId,
  stripeCustomerId,
}: {
  userId: string
  productSlug: ProductSlug
  stripeSessionId?: string
  stripeCustomerId?: string
}) {
  const s = supabaseServer()

  const { error } = await s.from('user_entitlements').upsert(
    {
      user_id: userId,
      product_slug: productSlug,
      access_level: 'basic',
      granted_at: new Date().toISOString(),
      expires_at: null,
      stripe_session_id: stripeSessionId ?? null,
      stripe_customer_id: stripeCustomerId ?? null,
    },
    { onConflict: 'user_id,product_slug' }
  )

  if (error) throw new Error(`grantAccess failed: ${error.message}`)
}
