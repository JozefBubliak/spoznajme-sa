create or replace function random_herd_questions(cat uuid, n int)
returns table(id bigint)
language sql stable as $$
  select q.id
  from questions q
  where q.category_id = cat
    and q.admin_status = 3
  order by random()
  limit n
$$;
