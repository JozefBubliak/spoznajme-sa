-- Add timer_deadline column to herd_games if missing
ALTER TABLE herd_games ADD COLUMN IF NOT EXISTS timer_deadline timestamptz;
