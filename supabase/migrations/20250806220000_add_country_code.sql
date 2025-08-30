-- 1) Rozšír kategórie o štát
alter table herd_categories
  add column if not exists country_code text default 'GLOBAL'; -- ISO 3166-1 alpha-2 (DE, AT, SK...), alebo 'GLOBAL'

-- 2) Zabezpeč index (ak treba)
create index if not exists idx_herd_categories_country on herd_categories(country_code);

-- 3) View s počtami aktualizuj (drop+create idempotentne)
drop view if exists herd_categories_with_counts;
create view herd_categories_with_counts as
select
  c.id,
  c.name,
  c.is_active,
  coalesce(c.country_code, 'GLOBAL') as country_code,
  count(q.id)::int as count
from herd_categories c
left join herd_questions q on q.category_id = c.id
group by c.id, c.name, c.is_active, c.country_code;
