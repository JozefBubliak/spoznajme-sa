create or replace function random_herd_questions(cat uuid, n int, locale_prefix text default 'sk')
returns table(id uuid)
language sql stable as $$
  select q.id
  from herd_questions q
  where q.category_id = cat
    and coalesce(q.classic, false) = true
    and (
      locale_prefix is null
      or locale_prefix = ''
      or q.locale is null
      or q.locale ilike locale_prefix || '%'
    )
  order by random()
  limit greatest(1, coalesce(n, 0))
$$;
