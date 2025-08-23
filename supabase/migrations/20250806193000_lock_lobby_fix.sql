-- Allow 'setup' status and redefine lock_lobby without creating new session

-- Ensure check constraint permits 'setup'
ALTER TABLE public.game_sessions
  DROP CONSTRAINT IF EXISTS game_sessions_status_check;
ALTER TABLE public.game_sessions
  ADD CONSTRAINT game_sessions_status_check
  CHECK (status IN ('lobby','setup','running','ended'));

-- Idempotent lock_lobby function
CREATE OR REPLACE FUNCTION public.lock_lobby()
RETURNS public.game_sessions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.rooms;
  s public.game_sessions;
BEGIN
  -- Find moderator's room
  SELECT * INTO r FROM public.rooms WHERE owner_id = auth.uid();
  IF NOT FOUND THEN
    RAISE EXCEPTION 'ROOM_NOT_FOUND';
  END IF;

  -- Latest session in this room
  SELECT * INTO s
  FROM public.game_sessions
  WHERE room_id = r.id
  ORDER BY created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'NO_SESSION_OPEN';
  END IF;

  -- Transition lobby -> setup once; return existing setup
  IF s.status = 'lobby' THEN
    UPDATE public.game_sessions SET status = 'setup' WHERE id = s.id;
    UPDATE public.rooms SET is_open = false WHERE id = r.id;
    SELECT * INTO s FROM public.game_sessions WHERE id = s.id;
    RETURN s;
  ELSIF s.status = 'setup' THEN
    UPDATE public.rooms SET is_open = false WHERE id = r.id;
    RETURN s;
  ELSE
    RAISE EXCEPTION 'CANNOT_LOCK_IN_STATUS_%', s.status;
  END IF;
END
$$;
