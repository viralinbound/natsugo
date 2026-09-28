-- Nihongo Path — initial schema.
-- Public visitors read through the anon key (RLS: select-only on published rows).
-- All writes go through Next.js route handlers using the service-role key.

create extension if not exists "pgcrypto";

-- ───────────── Teachers ─────────────
create table public.teachers (
  id text primary key,
  name text not null,
  role text not null default 'Japanese Language Instructor',
  experience_years int,
  levels text[] not null default '{}',
  specialization text not null default '',
  bio text,
  photo_url text,
  published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- ───────────── Batches ─────────────
create table public.batches (
  id text primary key,
  course_slug text not null,
  course_title text not null,
  level text not null check (level in ('N5','N4','N3','N2','N1','All Levels')),
  mode text not null check (mode in ('Online','Offline')),
  days text not null check (days in ('Weekday','Weekend')),
  time_of_day text not null check (time_of_day in ('Morning','Afternoon','Evening')),
  goal text not null check (goal in ('JLPT','Speaking','General Japanese')),
  start_date date not null,
  schedule text not null,
  duration_hours int not null,
  seats_total int not null default 12,
  seats_left int not null default 12 check (seats_left >= 0),
  price_label text not null default 'Fee on request',
  teacher_id text references public.teachers(id) on delete set null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index on public.batches (start_date);

-- ───────────── Leads (demo / contact / enrol / level-test) ─────────────
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('demo','contact','enrol','level-test','waitlist')),
  status text not null default 'new' check (status in ('new','contacted','confirmed','closed')),
  name text not null,
  phone text not null,
  email text,
  interest text,
  level text,
  preferred_time text,
  message text,
  batch_id text references public.batches(id) on delete set null,
  source_path text
);
create index on public.leads (created_at desc);
create index on public.leads (batch_id);

-- ───────────── Testimonials (submitted by students, approved by admin) ─────────────
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  course text not null,
  level text not null,
  quote text not null check (char_length(quote) between 20 and 800),
  photo_url text,
  approved boolean not null default false,
  verified boolean not null default false
);

-- ───────────── Word of the day ─────────────
create table public.words (
  id serial primary key,
  jp text not null,
  reading text not null,
  romaji text not null,
  meaning text not null,
  example_jp text,
  example_en text,
  level text not null default 'N5'
);

-- ───────────── Public activity feed (anonymised, shown as live ticker) ─────────────
create table public.activity (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  message text not null
);

-- ───────────── Site settings (announcement bar etc.) ─────────────
create table public.settings (
  key text primary key,
  value jsonb not null
);

-- ───────────── Level test results (anonymous, for analytics) ─────────────
create table public.level_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  score int not null,
  total int not null,
  recommended text not null,
  by_skill jsonb not null
);

-- ───────────── Row Level Security ─────────────
alter table public.teachers enable row level security;
alter table public.batches enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;
alter table public.words enable row level security;
alter table public.activity enable row level security;
alter table public.settings enable row level security;
alter table public.level_results enable row level security;

create policy "public read teachers" on public.teachers for select using (published);
create policy "public read batches" on public.batches for select using (published);
create policy "public read approved testimonials" on public.testimonials for select using (approved);
create policy "public read words" on public.words for select using (true);
create policy "public read activity" on public.activity for select using (created_at > now() - interval '7 days');
create policy "public read settings" on public.settings for select using (true);
-- leads and level_results: no public policies → only the service role can read/write.

-- ───────────── Seat confirmation (atomic) ─────────────
create or replace function public.confirm_enrolment(p_lead uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_batch text;
begin
  select batch_id into v_batch from leads where id = p_lead and status <> 'confirmed' for update;
  if v_batch is not null then
    update batches set seats_left = seats_left - 1 where id = v_batch and seats_left > 0;
    if not found then raise exception 'Batch is full'; end if;
  end if;
  update leads set status = 'confirmed' where id = p_lead;
end $$;
revoke all on function public.confirm_enrolment(uuid) from public, anon, authenticated;

-- ───────────── Realtime ─────────────
alter publication supabase_realtime add table public.batches;
alter publication supabase_realtime add table public.activity;

-- ───────────── Storage bucket (fallback when Vercel Blob is not configured) ─────────────
-- Public bucket: files are served by URL; no list policy, uploads only via the service role.
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;
