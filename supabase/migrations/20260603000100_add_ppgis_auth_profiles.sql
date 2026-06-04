create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  research_consent_agreed boolean not null default false,
  research_consent_agreed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'Profiles are readable by the owner'
  ) then
    execute 'create policy "Profiles are readable by the owner"
      on public.profiles
      for select
      to authenticated
      using (auth.uid() = id)';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'Profiles are insertable by the owner'
  ) then
    execute 'create policy "Profiles are insertable by the owner"
      on public.profiles
      for insert
      to authenticated
      with check (auth.uid() = id)';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'Profiles are updatable by the owner'
  ) then
    execute 'create policy "Profiles are updatable by the owner"
      on public.profiles
      for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id)';
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1),
      'Participant'
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

alter table public.submissions
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists interview_contact_agreed boolean not null default false,
  add column if not exists interview_contact_agreed_at timestamptz;

create index if not exists submissions_user_id_idx
  on public.submissions (user_id);

comment on column public.submissions.user_id is
  'Authenticated Supabase user who created this PPGIS submission.';

comment on column public.submissions.interview_contact_agreed is
  'Whether the submitter acknowledged the additional interview contact notice at submission time.';

comment on column public.submissions.interview_contact_agreed_at is
  'Timestamp when the submitter acknowledged the additional interview contact notice.';
