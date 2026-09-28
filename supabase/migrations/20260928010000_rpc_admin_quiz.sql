-- No service-role key needed by the app:
--  • visitors write only through the narrow SECURITY DEFINER functions below
--  • admins are signed-in users whose email is in public.admins; RLS grants them full access

-- ───────────── Admins ─────────────
create table public.admins (email text primary key check (email = lower(email)));
alter table public.admins enable row level security;
insert into public.admins (email) values ('khuwaish.g@viralinbound.com') on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admins where email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_admin() to anon, authenticated;

create policy "admins see admins" on public.admins for select to authenticated using (public.is_admin());

-- ───────────── Admin policies ─────────────
create policy "admin all teachers" on public.teachers for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all batches" on public.batches for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all testimonials" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all settings" on public.settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all words" on public.words for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin read leads" on public.leads for select to authenticated using (public.is_admin());
create policy "admin update leads" on public.leads for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin read level results" on public.level_results for select to authenticated using (public.is_admin());

-- Admin-only image uploads to the "media" bucket (fallback when Vercel Blob isn't connected).
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());

-- ───────────── Seat confirmation: admin only ─────────────
create or replace function public.confirm_enrolment(p_lead uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_batch text;
begin
  if not public.is_admin() then raise exception 'Not authorised'; end if;
  select batch_id into v_batch from leads where id = p_lead and status <> 'confirmed' for update;
  if v_batch is not null then
    update batches set seats_left = seats_left - 1 where id = v_batch and seats_left > 0;
    if not found then raise exception 'Batch is full'; end if;
  end if;
  update leads set status = 'confirmed' where id = p_lead;
end $$;
revoke all on function public.confirm_enrolment(uuid) from public, anon;
grant execute on function public.confirm_enrolment(uuid) to authenticated;

-- ───────────── Public write functions ─────────────
create or replace function public.submit_lead(
  p_type text, p_name text, p_phone text, p_email text, p_interest text, p_level text,
  p_preferred_time text, p_message text, p_batch_id text, p_source_path text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid; v_batch text;
begin
  if p_type not in ('demo','contact','enrol','level-test','waitlist') then raise exception 'Invalid type'; end if;
  if char_length(trim(p_name)) < 2 or char_length(p_name) > 100 then raise exception 'Invalid name'; end if;
  if regexp_replace(p_phone, '[\s-]', '', 'g') !~ '^(\+91)?[6-9][0-9]{9}$' then raise exception 'Invalid phone'; end if;
  select id into v_batch from batches where id = nullif(p_batch_id, '');
  insert into leads (type, name, phone, email, interest, level, preferred_time, message, batch_id, source_path)
  values (p_type, left(trim(p_name), 100), left(trim(p_phone), 20), nullif(left(trim(p_email), 150), ''),
          nullif(left(p_interest, 60), ''), nullif(left(p_level, 60), ''), nullif(left(p_preferred_time, 60), ''),
          nullif(left(p_message, 1000), ''), v_batch, nullif(left(p_source_path, 300), ''))
  returning id into v_id;

  -- Anonymous public activity line (no names or numbers).
  insert into activity (message)
  select case p_type
    when 'demo' then 'Someone just booked a free demo' || coalesce(' for ' || nullif(left(p_interest, 40), ''), '')
    when 'enrol' then 'A new student requested enrolment' || coalesce(' in ' || nullif(left(p_interest, 40), ''), '')
    when 'waitlist' then 'Someone joined the waitlist' || coalesce(' for ' || nullif(left(p_interest, 40), ''), '')
  end
  where p_type in ('demo','enrol','waitlist');

  return v_id;
end $$;
grant execute on function public.submit_lead(text,text,text,text,text,text,text,text,text,text) to anon, authenticated;

create or replace function public.submit_review(p_name text, p_course text, p_level text, p_quote text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(trim(p_name)) < 2 or char_length(trim(p_course)) < 2 then raise exception 'Invalid review'; end if;
  if p_level not in ('Beginner','N5','N4','N3','N2','N1') then raise exception 'Invalid level'; end if;
  insert into testimonials (name, course, level, quote, approved, verified)
  values (left(trim(p_name), 80), left(trim(p_course), 80), p_level, left(trim(p_quote), 800), false, false);
end $$;
grant execute on function public.submit_review(text,text,text,text) to anon, authenticated;

create or replace function public.log_level_result(p_score int, p_total int, p_recommended text, p_by_skill jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_total < 1 or p_total > 50 or p_score < 0 or p_score > p_total then raise exception 'Invalid score'; end if;
  insert into level_results (score, total, recommended, by_skill)
  values (p_score, p_total, left(coalesce(p_recommended, ''), 40), coalesce(p_by_skill, '{}'::jsonb));
end $$;
grant execute on function public.log_level_result(int,int,text,jsonb) to anon, authenticated;

-- ───────────── Quiz bank: 5 JLPT levels × 3 difficulties × 10 questions ─────────────
create table public.quiz_questions (
  id text primary key,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  difficulty text not null check (difficulty in ('easy','medium','hard')),
  skill text not null check (skill in ('Vocabulary','Grammar','Reading','Listening','Kanji')),
  prompt text not null,
  audio text,
  options text[] not null check (array_length(options, 1) between 2 and 6),
  answer int not null check (answer >= 0),
  explanation text,
  sort int not null default 0,
  published boolean not null default true
);
create index on public.quiz_questions (level, difficulty, sort);
alter table public.quiz_questions enable row level security;
create policy "public read quiz" on public.quiz_questions for select using (published);
create policy "admin all quiz" on public.quiz_questions for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  level text not null,
  difficulty text not null,
  score int not null,
  total int not null
);
alter table public.quiz_attempts enable row level security;
create policy "admin read quiz attempts" on public.quiz_attempts for select to authenticated using (public.is_admin());

create or replace function public.log_quiz_attempt(p_level text, p_difficulty text, p_score int, p_total int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_level not in ('N5','N4','N3','N2','N1') or p_difficulty not in ('easy','medium','hard') then raise exception 'Invalid quiz'; end if;
  if p_total < 1 or p_total > 50 or p_score < 0 or p_score > p_total then raise exception 'Invalid score'; end if;
  insert into quiz_attempts (level, difficulty, score, total) values (p_level, p_difficulty, p_score, p_total);
end $$;
grant execute on function public.log_quiz_attempt(text,text,int,int) to anon, authenticated;
