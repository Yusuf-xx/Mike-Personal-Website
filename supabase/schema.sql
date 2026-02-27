-- ============================================================
-- Cybersecurity Portfolio – Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ---------------------------------------------------------------------------
-- 1. POSTS (blog)
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  description text,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now(),
  constraint posts_slug_unique unique (slug)
);

-- Index for listing by date and looking up by slug
create index if not exists posts_created_at_desc on public.posts (created_at desc);
create unique index if not exists posts_slug_key on public.posts (slug);

comment on table public.posts is 'Blog posts for the portfolio site';

-- ---------------------------------------------------------------------------
-- 2. MESSAGES (contact form)
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_desc on public.messages (created_at desc);

comment on table public.messages is 'Contact form submissions';

-- ---------------------------------------------------------------------------
-- 3. Row Level Security (RLS)
-- ---------------------------------------------------------------------------
alter table public.posts enable row level security;
alter table public.messages enable row level security;

-- Posts: anyone can read; only authenticated users (admin) can write
create policy "Posts are viewable by everyone"
  on public.posts for select
  using (true);

create policy "Authenticated users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update posts"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);

-- Messages: anyone can submit (contact form); only authenticated can read/delete
create policy "Anyone can submit a message"
  on public.messages for insert
  with check (true);

create policy "Authenticated users can view messages"
  on public.messages for select
  to authenticated
  using (true);

create policy "Authenticated users can delete messages"
  on public.messages for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 4. Optional: trigger to keep updated_at in sync on posts
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();
