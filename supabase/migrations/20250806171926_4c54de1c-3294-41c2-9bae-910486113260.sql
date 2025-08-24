
-- Enable Row Level Security on the questions table
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Create a function to check if a user is an admin (using security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT user_email IN ('rezvalia@gmail.com', 'jozef.bubliak@gmail.com');
$$;

-- Policy: Allow public read access to approved questions (admin_status = 3)
CREATE POLICY "Public can view approved questions"
ON public.questions
FOR SELECT
USING (admin_status = 3);

-- Policy: Allow admins to view all questions
CREATE POLICY "Admins can view all questions"
ON public.questions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));

-- Policy: Allow admins to update questions
CREATE POLICY "Admins can update questions"
ON public.questions
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Policy: Allow admins to insert questions
CREATE POLICY "Admins can insert questions"
ON public.questions
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Policy: Allow admins to delete questions
CREATE POLICY "Admins can delete questions"
ON public.questions
FOR DELETE
TO authenticated
USING (public.is_admin(auth.jwt() ->> 'email'));
