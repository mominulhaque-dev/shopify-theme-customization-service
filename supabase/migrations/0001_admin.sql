-- =============================================================================
-- Admin panel schema — run once in Supabase → SQL Editor → New query → Run.
-- Safe to re-run: every statement is idempotent.
--
-- Security model
--   * Row Level Security is ON for every table.
--   * The public website reads only what is public (published posts and case
--     studies, active redirects, site settings) with the publishable key.
--   * Everything else (leads, subscribers, drafts, projects) is readable and
--     writable only by signed-in admins (rows in public.admins).
--   * Server routes that must write without a signed-in admin (the contact
--     form, newsletter sign-up, the follow-up cron, the client portal) use the
--     secret key on the server only. It never reaches a browser.
--   * The FIRST user created in Authentication becomes admin automatically.
--     After that, turn off public sign-ups (Authentication → Sign In / Providers
--     → "Allow new users to sign up" off).
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- helpers ---
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ----------------------------------------------------------------- admins ---
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

-- First account ever created becomes the admin.
create or replace function public.make_first_user_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.admins) then
    insert into public.admins (user_id, email) values (new.id, coalesce(new.email, ''));
  end if;
  return new;
end $$;

drop trigger if exists on_auth_user_created_make_admin on auth.users;
create trigger on_auth_user_created_make_admin
  after insert on auth.users
  for each row execute function public.make_first_user_admin();

-- If the account already existed before this script ran, promote it now.
insert into public.admins (user_id, email)
select id, coalesce(email, '') from auth.users
where not exists (select 1 from public.admins)
order by created_at
limit 1;

-- ---------------------------------------------------------- site settings ---
create table if not exists public.site_settings (
  id            int primary key default 1 check (id = 1),
  email         text not null default 'hihopifythemecustomization@gmail.com',
  phone_display text not null default '01580424024',
  phone_e164    text not null default '+8801580424024',
  whatsapp_url  text not null default 'https://wa.me/8801580424024',
  tiers         jsonb not null default '[
    {"name":"Single-section edit","price":"$50","time":"2–4 days"},
    {"name":"Page-level build","price":"$250","time":"1–2 weeks"},
    {"name":"Full theme customization","price":"$800","time":"2–3 weeks"},
    {"name":"Multi-template rebuild","price":"$1,500","time":"3–4 weeks"}
  ]'::jsonb,
  updated_at    timestamptz not null default now()
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;
alter table public.site_settings enable row level security;
drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings for select using (true);
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop trigger if exists site_settings_updated on public.site_settings;
create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------ leads ---
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  name         text not null check (char_length(name) <= 200),
  email        text not null check (char_length(email) <= 320),
  store_url    text not null check (char_length(store_url) <= 500),
  message      text not null check (char_length(message) <= 10000),
  service      text,
  budget       text,
  source_page  text,
  referrer     text,
  status       text not null default 'new'
               check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  notes        text not null default '',
  read_at      timestamptz,
  contacted_at timestamptz,
  reminded_at  timestamptz
);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
alter table public.leads enable row level security;
drop policy if exists "leads admin all" on public.leads;
create policy "leads admin all" on public.leads
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop trigger if exists leads_updated on public.leads;
create trigger leads_updated before update on public.leads
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------ subscribers ---
create table if not exists public.subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique check (char_length(email) <= 320),
  source_page  text,
  unsubscribed boolean not null default false,
  created_at   timestamptz not null default now()
);
alter table public.subscribers enable row level security;
drop policy if exists "subscribers admin all" on public.subscribers;
create policy "subscribers admin all" on public.subscribers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------ media ---
create table if not exists public.media (
  id         uuid primary key default gen_random_uuid(),
  path       text not null unique,
  url        text not null,
  alt        text not null default '',
  mime       text,
  size       int,
  width      int,
  height     int,
  created_at timestamptz not null default now()
);
alter table public.media enable row level security;
drop policy if exists "media public read" on public.media;
create policy "media public read" on public.media for select using (true);
drop policy if exists "media admin write" on public.media;
create policy "media admin write" on public.media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage bucket for uploads: public to read, admin-only to write.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media bucket admin insert" on storage.objects;
create policy "media bucket admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media bucket admin update" on storage.objects;
create policy "media bucket admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media bucket admin delete" on storage.objects;
create policy "media bucket admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- ------------------------------------------------------------------ posts ---
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title        text not null,
  meta_title   text not null default '',
  description  text not null default '',
  keyword      text not null default '',
  category     text not null default 'Guides',
  excerpt      text not null default '',
  cover_url    text,
  takeaways    text[] not null default '{}',
  body_html    text not null default '',
  faq          jsonb not null default '[]'::jsonb,
  read_minutes int not null default 5,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists posts_published_idx on public.posts (status, published_at desc);
alter table public.posts enable row level security;
drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published" on public.posts
  for select using (status = 'published' or public.is_admin());
drop policy if exists "posts admin write" on public.posts;
create policy "posts admin write" on public.posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop trigger if exists posts_updated on public.posts;
create trigger posts_updated before update on public.posts
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------- case studies ---
create table if not exists public.case_studies (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text not null,
  client            text not null default '',
  industry          text not null default '',
  theme             text not null default '',
  summary           text not null default '',
  problem_html      text not null default '',
  solution_html     text not null default '',
  results           jsonb not null default '[]'::jsonb,   -- [{label, before, after}]
  before_url        text,
  after_url         text,
  cover_url         text,
  testimonial_quote text not null default '',
  testimonial_name  text not null default '',
  meta_title        text not null default '',
  description       text not null default '',
  sort_order        int not null default 0,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
alter table public.case_studies enable row level security;
drop policy if exists "cases public read published" on public.case_studies;
create policy "cases public read published" on public.case_studies
  for select using (status = 'published' or public.is_admin());
drop policy if exists "cases admin write" on public.case_studies;
create policy "cases admin write" on public.case_studies
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop trigger if exists cases_updated on public.case_studies;
create trigger cases_updated before update on public.case_studies
  for each row execute function public.set_updated_at();

-- -------------------------------------------------------------- redirects ---
create table if not exists public.redirects (
  id          uuid primary key default gen_random_uuid(),
  source      text not null unique check (source like '/%'),
  destination text not null,
  permanent   boolean not null default true,
  active      boolean not null default true,
  hits        int not null default 0,
  created_at  timestamptz not null default now()
);
alter table public.redirects enable row level security;
drop policy if exists "redirects public read active" on public.redirects;
create policy "redirects public read active" on public.redirects
  for select using (active or public.is_admin());
drop policy if exists "redirects admin write" on public.redirects;
create policy "redirects admin write" on public.redirects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- --------------------------------------------------------- client portal ---
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  token            text not null unique default encode(gen_random_bytes(18), 'hex'),
  title            text not null,
  client_name      text not null default '',
  client_email     text not null default '',
  store_url        text not null default '',
  status           text not null default 'active' check (status in ('active', 'paused', 'delivered')),
  message          text not null default '',      -- shown to the client
  lead_id          uuid references public.leads (id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create table if not exists public.project_milestones (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title      text not null,
  sort       int not null default 0,
  status     text not null default 'todo' check (status in ('todo', 'doing', 'done')),
  due_date   date,
  done_at    timestamptz
);
alter table public.projects enable row level security;
alter table public.project_milestones enable row level security;
drop policy if exists "projects admin all" on public.projects;
create policy "projects admin all" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "milestones admin all" on public.project_milestones;
create policy "milestones admin all" on public.project_milestones
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop trigger if exists projects_updated on public.projects;
create trigger projects_updated before update on public.projects
  for each row execute function public.set_updated_at();
