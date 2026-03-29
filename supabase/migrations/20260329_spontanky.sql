-- Spontánky: neformálne lokálne stretnutia

CREATE TABLE IF NOT EXISTS public.spontanky (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id      TEXT        UNIQUE NOT NULL DEFAULT lower(substring(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  creator_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_meno  TEXT        NOT NULL DEFAULT 'Organizátor',
  nazov         TEXT        NOT NULL,
  datum         DATE        NOT NULL,
  cas           TEXT        NOT NULL DEFAULT '10:00',
  popis         TEXT        NOT NULL DEFAULT '',
  typ_aktivity  TEXT[]      NOT NULL DEFAULT '{}',
  pre_koho      TEXT        NOT NULL DEFAULT '',
  ocakavany_pocet TEXT      NOT NULL DEFAULT '',
  miesto_hlavne_nazov TEXT  NOT NULL DEFAULT '',
  miesto_zraz_nazov   TEXT  NOT NULL DEFAULT '',
  miesto_zraz_cas     TEXT  NOT NULL DEFAULT '',
  viditelnost   TEXT        NOT NULL DEFAULT 'okolie'  CHECK (viditelnost IN ('sukromne','okolie','verejne')),
  stav          TEXT        NOT NULL DEFAULT 'aktivna' CHECK (stav IN ('aktivna','pozastavena','zrusena','ukoncena')),
  dovod_zrusenia TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.spontanka_ucastnici (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  spontanka_id  UUID  NOT NULL REFERENCES public.spontanky(id) ON DELETE CASCADE,
  participant_id TEXT NOT NULL,
  meno          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pridem' CHECK (status IN ('pridem','mozno','nepridem')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(spontanka_id, participant_id)
);

CREATE TABLE IF NOT EXISTS public.spontanka_prinesiem (
  id                        UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  spontanka_id              UUID  NOT NULL REFERENCES public.spontanky(id) ON DELETE CASCADE,
  nazov                     TEXT  NOT NULL,
  mnozstvo                  TEXT  NOT NULL DEFAULT '',
  claimed_by_participant_id TEXT,
  claimed_by_meno           TEXT,
  claimed_at                TIMESTAMPTZ,
  order_index               INTEGER NOT NULL DEFAULT 0,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.spontanka_chat (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  spontanka_id UUID  NOT NULL REFERENCES public.spontanky(id) ON DELETE CASCADE,
  participant_id TEXT NOT NULL,
  meno         TEXT  NOT NULL,
  text         TEXT  NOT NULL,
  pinned       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_spontanky_stav_datum    ON public.spontanky(stav, datum DESC);
CREATE INDEX IF NOT EXISTS idx_spontanky_viditelnost   ON public.spontanky(viditelnost);
CREATE INDEX IF NOT EXISTS idx_spontanky_creator       ON public.spontanky(creator_id);
CREATE INDEX IF NOT EXISTS idx_ucastnici_spontanka     ON public.spontanka_ucastnici(spontanka_id);
CREATE INDEX IF NOT EXISTS idx_prinesiem_spontanka     ON public.spontanka_prinesiem(spontanka_id, order_index);
CREATE INDEX IF NOT EXISTS idx_chat_spontanka_created  ON public.spontanka_chat(spontanka_id, created_at);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.spontanka_chat;
ALTER PUBLICATION supabase_realtime ADD TABLE public.spontanka_prinesiem;
ALTER PUBLICATION supabase_realtime ADD TABLE public.spontanka_ucastnici;

-- RLS
ALTER TABLE public.spontanky           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spontanka_ucastnici ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spontanka_prinesiem ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spontanka_chat      ENABLE ROW LEVEL SECURITY;

-- All writes go through service-role API routes (bypass RLS).
-- These policies allow read access for browser clients.
CREATE POLICY "spontanky_read" ON public.spontanky
  FOR SELECT USING (
    viditelnost IN ('okolie','verejne')
    OR (auth.uid() IS NOT NULL AND auth.uid() = creator_id)
  );
CREATE POLICY "spontanka_read_by_id" ON public.spontanky
  FOR SELECT USING (true); -- detail view allows reading by id regardless

CREATE POLICY "ucastnici_read"  ON public.spontanka_ucastnici FOR SELECT USING (true);
CREATE POLICY "prinesiem_read"  ON public.spontanka_prinesiem FOR SELECT USING (true);
CREATE POLICY "chat_read"       ON public.spontanka_chat      FOR SELECT USING (true);
