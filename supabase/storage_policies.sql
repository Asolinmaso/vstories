-- 0. Create 'products' bucket if not exists
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- 1. Allow Public Read Access to 'products' bucket
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'products' );

-- 2. Allow Authenticated Users (Admins) to Upload
drop policy if exists "Admin Upload Access" on storage.objects;
create policy "Admin Upload Access"
on storage.objects for insert
with check (
  bucket_id = 'products' 
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and role = 'admin'
  )
);

-- 3. Allow Admins to Update/Delete
drop policy if exists "Admin Update/Delete Access" on storage.objects;
create policy "Admin Update/Delete Access"
on storage.objects for delete
using (
  bucket_id = 'products'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and role = 'admin'
  )
);

drop policy if exists "Admin Update Access" on storage.objects;
create policy "Admin Update Access"
on storage.objects for update
using (
  bucket_id = 'products'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.profiles 
    where id = auth.uid() 
    and role = 'admin'
  )
);
