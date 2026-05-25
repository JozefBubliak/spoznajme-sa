/**
 * Access control — single source of truth
 *
 * Testing mode (NEXT_PUBLIC_TESTING_MODE=true):
 *   • Any logged-in user has access to every product
 *   • Auth is still required (login wall stays)
 *
 * Production mode:
 *   • Access granted via Stripe payment → user_entitlements row
 *   • Admins (ADMIN_EMAILS) always have full access
 */

export const TESTING_MODE =
  process.env.NEXT_PUBLIC_TESTING_MODE === 'true'

// ─── Product registry ────────────────────────────────────────────────────────

export type ProductSlug = 'herd-vote' | 'karticky' | 'couples' | 'quiz'

export interface ProductConfig {
  slug: ProductSlug
  name: string
  /** Relative hub base path, e.g. "/herd-vote" */
  hubPath: string
  /** Upgrade page within the hub */
  upgradePath: string
  /** Stripe Price ID — set per environment in .env */
  stripePriceId?: string
}

export const PRODUCTS: Record<ProductSlug, ProductConfig> = {
  'herd-vote': {
    slug: 'herd-vote',
    name: 'Herd Vote',
    hubPath: '/herd-vote',
    upgradePath: '/herd-vote/upgrade',
    stripePriceId: process.env.STRIPE_PRICE_HERD_VOTE,
  },
  'karticky': {
    slug: 'karticky',
    name: 'Kartičky',
    hubPath: '/karticky',
    upgradePath: '/karticky/upgrade',
    stripePriceId: process.env.STRIPE_PRICE_KARTICKY,
  },
  'couples': {
    slug: 'couples',
    name: 'Couples',
    hubPath: '/couples',
    upgradePath: '/couples/upgrade',
    stripePriceId: process.env.STRIPE_PRICE_COUPLES,
  },
  'quiz': {
    slug: 'quiz',
    name: 'Quiz',
    hubPath: '/apps/quiz',
    upgradePath: '/apps/quiz/upgrade',
    stripePriceId: process.env.STRIPE_PRICE_QUIZ,
  },
}

// ─── Admin bypass ────────────────────────────────────────────────────────────

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean)

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

// ─── Access result ───────────────────────────────────────────────────────────

export type AccessResult = 'granted' | 'no-auth' | 'no-access'
