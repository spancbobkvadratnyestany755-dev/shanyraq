-- Run once in the SQL Editor of a NEW Supabase project.
begin;
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 3 and 90),
  kind text not null check (kind in ('home','business')),
  deal text not null check (deal in ('rent','buy')),
  price numeric not null check (price > 0 and price <= 999999999999),
  area numeric not null check (area > 0 and area <= 100000),
  address text not null check (char_length(trim(address)) between 3 and 150),
  district text not null check (district in ('Алмалинский','Бостандыкский','Медеуский','Ауэзовский','Турксибский','Алатауский','Наурызбайский','Жетысуский')),
  latitude double precision not null check (latitude between 43.05 and 43.5),
  longitude double precision not null check (longitude between 76.65 and 77.15),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  phone text not null check (phone ~ '^\+?[0-9 ()-]{7,25}$'),
  photo_path text check (photo_path is null or (split_part(photo_path,'/',1)=owner_id::text and photo_path ~ '^[0-9a-f-]+/[0-9a-f-]+\.(jpg|png|webp)$')),
  status text not null default 'active' check (status in ('active','archived')),
  created_at timestamptz not null default now()
);
create index listings_owner_idx on public.listings(owner_id);
create index listings_public_idx on public.listings(status,kind,deal,created_at desc);
alter table public.listings enable row level security;
revoke all on public.listings from anon, authenticated;
grant select on public.listings to anon, authenticated;
grant insert,update,delete on public.listings to authenticated;
create policy "Read published or own listings" on public.listings for select to anon,authenticated
 using (status='active' or owner_id=(select auth.uid()));
create policy "Create own listing" on public.listings for insert to authenticated
 with check (owner_id=(select auth.uid()));
create policy "Edit own listing" on public.listings for update to authenticated
 using (owner_id=(select auth.uid())) with check (owner_id=(select auth.uid()));
create policy "Delete own listing" on public.listings for delete to authenticated
 using (owner_id=(select auth.uid()));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
 values ('listing-photos','listing-photos',true,3145728,array['image/jpeg','image/png','image/webp']);
create policy "Upload own listing photos" on storage.objects for insert to authenticated
 with check (bucket_id='listing-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
create policy "Read own photo metadata" on storage.objects for select to authenticated
 using (bucket_id='listing-photos' and owner_id=(select auth.uid()::text));
create policy "Delete own listing photos" on storage.objects for delete to authenticated
 using (bucket_id='listing-photos' and owner_id=(select auth.uid()::text));
commit;
