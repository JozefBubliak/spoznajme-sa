CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS coupl_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES coupl_categories(id),
  name JSONB NOT NULL,
  description JSONB,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupl_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES coupl_categories(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('single_choice','multiple_choice','reciprocal','scale','text')),
  text_male JSONB NOT NULL,
  text_female JSONB NOT NULL,
  description JSONB,
  is_reciprocal BOOLEAN DEFAULT FALSE,
  rejection_stops_display BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupl_answer_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES coupl_questions(id) ON DELETE CASCADE,
  text JSONB NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  is_rejection BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupl_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT UNIQUE NOT NULL,
  language_code TEXT DEFAULT 'sk',
  qr_code_url TEXT,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','active','completed','expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS coupl_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES coupl_sessions(id) ON DELETE CASCADE,
  gender TEXT NOT NULL CHECK (gender IN ('male','female')),
  nickname TEXT,
  language_code TEXT DEFAULT 'sk',
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupl_category_preferences (
  participant_id UUID REFERENCES coupl_participants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES coupl_categories(id) ON DELETE CASCADE,
  is_interested BOOLEAN NOT NULL,
  selected_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (participant_id, category_id)
);

CREATE TABLE IF NOT EXISTS coupl_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES coupl_participants(id) ON DELETE CASCADE,
  question_id UUID REFERENCES coupl_questions(id) ON DELETE CASCADE,
  answer_data JSONB NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (participant_id, question_id)
);

CREATE TABLE IF NOT EXISTS coupl_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES coupl_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES coupl_questions(id) ON DELETE CASCADE,
  should_display BOOLEAN NOT NULL,
  compatibility_score INT,
  result_summary JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (session_id, question_id)
);

ALTER TABLE coupl_sessions     ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'sk';
ALTER TABLE coupl_questions    ADD COLUMN IF NOT EXISTS description JSONB;
ALTER TABLE coupl_questions    ADD COLUMN IF NOT EXISTS rejection_stops_display BOOLEAN DEFAULT TRUE;
ALTER TABLE coupl_participants ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'sk';

CREATE INDEX IF NOT EXISTS idx_coupl_ans_part_q  ON coupl_answers(participant_id, question_id);
CREATE INDEX IF NOT EXISTS idx_coupl_q_cat_order ON coupl_questions(category_id, order_index);
CREATE INDEX IF NOT EXISTS idx_coupl_prefs       ON coupl_category_preferences(participant_id, category_id);
