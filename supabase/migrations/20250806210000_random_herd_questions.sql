create or replace function random_herd_questions(
  cat uuid,
  n int,
  locale_prefix text default null
)
returns table(id uuid)
language sql stable as $$
  select q.id
  from herd_questions q
  where q.category_id = cat
    and (
      locale_prefix is null
      or q.locale is null
      or lower(q.locale) like lower(locale_prefix) || '%'
    )
  order by random()
  limit greatest(n, 0)
$$;
