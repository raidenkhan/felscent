-- FELSCENT — products table, RLS and helpers.
-- Run this whole file in: Supabase Dashboard → SQL Editor → New query.

-- ------------------------------------------------------------------
-- Table
-- ------------------------------------------------------------------
create table if not exists public.products (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  fragrance_type      text not null default 'Eau de parfum',
  size_ml             integer not null check (size_ml > 0),
  price_cents         integer not null check (price_cents >= 0),
  currency            text not null default 'GHS' check (char_length(currency) = 3),
  short_description   text,
  stock_quantity      integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  published           boolean not null default true,
  images              text[] not null default '{}',
  top_notes           text[],
  heart_notes         text[],
  base_notes          text[],
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.products is
  'Fragrances for sale. price_cents is integer pence; stock_quantity is the on-hand count.';

-- updated_at maintenance
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------
-- Row level security
-- ------------------------------------------------------------------
alter table public.products enable row level security;

-- The shop reads only published rows, with no sign-in.
drop policy if exists "Published products are publicly readable" on public.products;
create policy "Published products are publicly readable"
  on public.products
  for select
  to anon
  using (published = true);

-- Signed-in users (your admin) read everything — including hidden rows.
drop policy if exists "Admins can read all products" on public.products;
create policy "Admins can read all products"
  on public.products
  for select
  to authenticated
  using (true);

-- Signed-in users may add, change and remove products.
drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------------
-- Indexes for the storefront queries
-- ------------------------------------------------------------------
create index if not exists products_published_idx on public.products (published, created_at);
create index if not exists products_slug_idx on public.products (slug);
