create or replace function random_herd_questions(cat uuid, n int)
returns table(id uuid)
language sql stable as $$
  select q.id
  from herd_questions q
  where q.category_id = cat
  order by random()
  limit n
$$;
