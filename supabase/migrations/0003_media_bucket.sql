-- Media bucket: admins also need SELECT on storage.objects, because Storage
-- checks it for delete and overwrite. Public reads use the public URL and need
-- no policy. Limit uploads to raster images up to 5 MB (no SVG: it can carry script).
drop policy if exists "media bucket admin select" on storage.objects;
create policy "media bucket admin select" on storage.objects
  for select to authenticated using (bucket_id = 'media' and (select private.is_admin()));

update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
where id = 'media';
