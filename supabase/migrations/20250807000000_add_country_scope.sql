-- Add support for country-specific and global games/questions
ALTER TABLE public.herd_questions
  ADD COLUMN country_code text,
  ADD COLUMN is_universal boolean DEFAULT false;

ALTER TABLE public.herd_games
  ADD COLUMN mode text DEFAULT 'country',
  ADD COLUMN country_code text;

-- Existing questions without a country are treated as universal
UPDATE public.herd_questions
  SET is_universal = true
  WHERE country_code IS NULL;
