-- Add categorization columns to tasks table
-- Columns are added empty — user fills them in manually or via admin UI.

-- 1. Broad activity category
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS category text;

-- 2. Body zone focus
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS body_zone text;

-- 3. Explicit intensity rating (1 = very gentle, 5 = very explicit)
--    Independent of the game "level" column.
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS intensity smallint
    CHECK (intensity IS NULL OR intensity BETWEEN 1 AND 5);

-- 4. Free-form tags array for flexible filtering
ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- 5. Normalize action_type capitalization
--    Before: "žena pre muža", "muž pre ženu" (lowercase variants)
--    After:  "Žena pre muža", "Muž pre ženu"
UPDATE tasks SET action_type = 'Žena pre muža' WHERE action_type = 'žena pre muža';
UPDATE tasks SET action_type = 'Muž pre ženu'  WHERE action_type = 'muž pre ženu';

-- Helpful indexes for future filtering
CREATE INDEX IF NOT EXISTS tasks_category_idx   ON tasks (category);
CREATE INDEX IF NOT EXISTS tasks_body_zone_idx  ON tasks (body_zone);
CREATE INDEX IF NOT EXISTS tasks_intensity_idx  ON tasks (intensity);
CREATE INDEX IF NOT EXISTS tasks_level_idx      ON tasks (level);
