-- Move the security-definer helpers out of the API-exposed `public` schema.
-- RLS policies still call private.is_admin(), but nobody can reach it (or the
-- first-admin trigger function) through /rest/v1/rpc.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create or replace function private.make_first_user_admin()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if not exists (select 1 from public.admins) then
    insert into public.admins (user_id, email) values (new.id, coalesce(new.email, ''));
  end if;
  return new;
end $$;
revoke all on function private.make_first_user_admin() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_make_admin on auth.users;
create trigger on_auth_user_created_make_admin
  after insert on auth.users
  for each row execute function private.make_first_user_admin();

-- Re-point every policy at the private helper.
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()) or (select private.is_admin()));

drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "leads admin all" on public.leads;
create policy "leads admin all" on public.leads
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "subscribers admin all" on public.subscribers;
create policy "subscribers admin all" on public.subscribers
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "media admin write" on public.media;
create policy "media admin write" on public.media
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "media bucket admin insert" on storage.objects;
create policy "media bucket admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and (select private.is_admin()));
drop policy if exists "media bucket admin update" on storage.objects;
create policy "media bucket admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and (select private.is_admin()));
drop policy if exists "media bucket admin delete" on storage.objects;
create policy "media bucket admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and (select private.is_admin()));

drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published" on public.posts
  for select using (status = 'published' or (select private.is_admin()));
drop policy if exists "posts admin write" on public.posts;
create policy "posts admin write" on public.posts
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "cases public read published" on public.case_studies;
create policy "cases public read published" on public.case_studies
  for select using (status = 'published' or (select private.is_admin()));
drop policy if exists "cases admin write" on public.case_studies;
create policy "cases admin write" on public.case_studies
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "redirects public read active" on public.redirects;
create policy "redirects public read active" on public.redirects
  for select using (active or (select private.is_admin()));
drop policy if exists "redirects admin write" on public.redirects;
create policy "redirects admin write" on public.redirects
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy if exists "projects admin all" on public.projects;
create policy "projects admin all" on public.projects
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
drop policy if exists "milestones admin all" on public.project_milestones;
create policy "milestones admin all" on public.project_milestones
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

drop function if exists public.is_admin();
drop function if exists public.make_first_user_admin();
