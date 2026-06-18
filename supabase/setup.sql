-- Pro Build Services Supabase setup
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Residential', 'Commercial', 'Renovation')),
  location text,
  description text,
  completion_date date,
  image text not null,
  before_image text,
  after_image text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Public can view projects" on public.projects;
create policy "Public can view projects"
on public.projects
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can add projects" on public.projects;
create policy "Authenticated users can add projects"
on public.projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update projects" on public.projects;
create policy "Authenticated users can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete projects" on public.projects;
create policy "Authenticated users can delete projects"
on public.projects
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('project-photos', 'project-photos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view project photos" on storage.objects;
create policy "Public can view project photos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'project-photos');

drop policy if exists "Authenticated users can upload project photos" on storage.objects;
create policy "Authenticated users can upload project photos"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-photos');

drop policy if exists "Authenticated users can update project photos" on storage.objects;
create policy "Authenticated users can update project photos"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-photos')
with check (bucket_id = 'project-photos');

drop policy if exists "Authenticated users can delete project photos" on storage.objects;
create policy "Authenticated users can delete project photos"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-photos');
