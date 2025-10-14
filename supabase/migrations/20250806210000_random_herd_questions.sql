create or replace function random_herd_questions(cat uuid, n int)
returns table(id text)
language sql stable as $$
  select q.id::text
  from herd_questions q
  where q.category_id = cat
    and coalesce(q.classic, true)
    and (q.locale is null or q.locale = 'sk')
  order by random()
  limit n
$$;
