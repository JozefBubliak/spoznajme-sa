-- Add unique index for herd_rounds and cleanup duplicates
DELETE FROM herd_rounds a USING herd_rounds b
WHERE a.id < b.id AND a.game_code = b.game_code AND a.idx = b.idx;

CREATE UNIQUE INDEX IF NOT EXISTS herd_rounds_game_idx_uq ON herd_rounds (game_code, idx);
