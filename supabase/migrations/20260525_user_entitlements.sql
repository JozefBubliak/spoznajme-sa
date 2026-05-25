-- User entitlements: tracks who has access to which product/tool
-- product_slug examples: 'herd-vote', 'karticky', 'couples'
-- access_level: 'free' | 'basic' | 'pro' (reserved for future tiering)

CREATE TABLE IF NOT EXISTS public.user_entitlements (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_slug          TEXT        NOT NULL,
  access_level          TEXT        NOT NULL DEFAULT 'basic',
  granted_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at            TIMESTAMPTZ,                  -- NULL = permanent
  stripe_session_id     TEXT,
  stripe_customer_id    TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_slug)
);

-- Index for fast per-user lookups
CREATE INDEX IF NOT EXISTS user_entitlements_user_idx
  ON public.user_entitlements(user_id);

-- RLS: users can only see their own entitlements
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_entitlements"
  ON public.user_entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (needed for webhook)
CREATE POLICY "service_role_all"
  ON public.user_entitlements FOR ALL
  USING (auth.role() = 'service_role');

-- Helper function: check if current user has access to a product
-- Returns true also when TESTING_MODE is set via app_settings
CREATE OR REPLACE FUNCTION public.has_product_access(p_slug TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check direct entitlement (non-expired)
  RETURN EXISTS (
    SELECT 1 FROM public.user_entitlements
    WHERE user_id = auth.uid()
      AND product_slug = p_slug
      AND (expires_at IS NULL OR expires_at > NOW())
  );
END;
$$;
