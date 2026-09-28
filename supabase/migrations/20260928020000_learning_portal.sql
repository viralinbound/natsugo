-- Online learning portal: lessons, study materials, live classes, recordings, student login.
-- Public: lesson outlines + live class schedule. Private: videos, notes, join links, recordings
-- (free-preview lessons excepted). Enrolled students unlock private content through the
-- srv_* functions, which require the server secret stored in public.app_secret.

create table public.app_secret (id int primary key default 1 check (id = 1), value text not null);
alter table public.app_secret enable row level security; -- no policies: never readable via the API

create or replace function public._check_secret(p_secret text)
returns void language plpgsql stable security definer set search_path = public as $$
begin
  if p_secret is null or not exists (select 1 from app_secret where value = p_secret) then
    raise exception 'forbidden';
  end if;
end $$;
revoke all on function public._check_secret(text) from public, anon, authenticated;

-- ───────────── Lessons ─────────────
create table public.lessons (
  id text primary key,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  unit int not null,
  unit_title text not null,
  sort int not null default 0,
  title text not null,
  summary text not null default '',
  duration_min int not null default 0,
  is_free boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index on public.lessons (level, unit, sort);

create table public.lesson_assets (
  lesson_id text primary key references public.lessons(id) on delete cascade,
  video_url text,
  notes text,
  material_url text,
  material_label text
);

alter table public.lessons enable row level security;
alter table public.lesson_assets enable row level security;
create policy "public read lessons" on public.lessons for select using (published);
create policy "public read free lesson assets" on public.lesson_assets for select
  using (exists (select 1 from public.lessons l where l.id = lesson_id and l.is_free and l.published));
create policy "admin all lessons" on public.lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all lesson assets" on public.lesson_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ───────────── Live classes ─────────────
create table public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  level text not null check (level in ('N5','N4','N3','N2','N1','All Levels')),
  batch_id text references public.batches(id) on delete set null,
  title text not null,
  description text,
  starts_at timestamptz not null,
  duration_min int not null default 60 check (duration_min between 10 and 300),
  teacher_id text references public.teachers(id) on delete set null,
  platform text not null default 'Zoom' check (platform in ('Zoom','Google Meet','YouTube Live','Microsoft Teams','Other')),
  cancelled boolean not null default false,
  created_at timestamptz not null default now()
);
create index on public.live_sessions (starts_at);
create index on public.live_sessions (batch_id);

create table public.live_session_links (
  session_id uuid primary key references public.live_sessions(id) on delete cascade,
  join_url text,
  recording_url text
);

alter table public.live_sessions enable row level security;
alter table public.live_session_links enable row level security;
create policy "public read live schedule" on public.live_sessions for select using (true);
create policy "admin all live sessions" on public.live_sessions for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin all live links" on public.live_session_links for all to authenticated using (public.is_admin()) with check (public.is_admin());
alter publication supabase_realtime add table public.live_sessions;

-- Public flag so pages can show "Recording available" without exposing the link.
alter table public.live_sessions add column has_recording boolean not null default false;
create or replace function public._sync_has_recording()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update live_sessions set has_recording = coalesce(nullif(new.recording_url, ''), null) is not null where id = new.session_id;
  return new;
end $$;
revoke all on function public._sync_has_recording() from public, anon, authenticated;
create trigger live_links_sync after insert or update on public.live_session_links
  for each row execute function public._sync_has_recording();

-- ───────────── Students (enrolled) ─────────────
create table public.students (
  email text primary key check (email = lower(email)),
  name text not null,
  phone text,
  levels text[] not null default '{}',
  batch_ids text[] not null default '{}',
  active boolean not null default true,
  access_until date,
  created_at timestamptz not null default now()
);
alter table public.students enable row level security;
create policy "admin all students" on public.students for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.student_login_codes (
  id bigserial primary key,
  email text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts int not null default 0,
  used boolean not null default false,
  created_at timestamptz not null default now()
);
create index on public.student_login_codes (email, created_at desc);
alter table public.student_login_codes enable row level security;

create table public.student_sessions (
  token_hash text primary key,
  email text not null references public.students(email) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index on public.student_sessions (email);
alter table public.student_sessions enable row level security;

-- ───────────── Server functions (website only) ─────────────
create or replace function public.srv_create_login_code(p_secret text, p_email text)
returns text language plpgsql security definer set search_path = public, extensions as $$
declare v_email text := lower(trim(p_email)); v_code text; v_recent int;
begin
  perform _check_secret(p_secret);
  if not exists (select 1 from students where email = v_email and active and (access_until is null or access_until >= current_date)) then
    return null;
  end if;
  select count(*) into v_recent from student_login_codes where email = v_email and created_at > now() - interval '1 hour';
  if v_recent >= 5 then raise exception 'too_many_codes'; end if;
  -- Cryptographically secure 6-digit code.
  v_code := lpad(((('x' || encode(gen_random_bytes(4), 'hex'))::bit(32)::bigint) % 1000000)::text, 6, '0');
  insert into student_login_codes (email, code_hash, expires_at)
  values (v_email, encode(digest(v_email || ':' || v_code, 'sha256'), 'hex'), now() + interval '10 minutes');
  return v_code;
end $$;

create or replace function public.srv_verify_login_code(p_secret text, p_email text, p_code text)
returns text language plpgsql security definer set search_path = public, extensions as $$
declare v_email text := lower(trim(p_email)); v_row student_login_codes; v_token text;
begin
  perform _check_secret(p_secret);
  select * into v_row from student_login_codes
   where email = v_email and not used and expires_at > now()
   order by created_at desc limit 1 for update;
  if v_row.id is null then return null; end if;
  if v_row.attempts >= 5 then return null; end if;
  if v_row.code_hash <> encode(digest(v_email || ':' || trim(p_code), 'sha256'), 'hex') then
    update student_login_codes set attempts = attempts + 1 where id = v_row.id;
    return null;
  end if;
  update student_login_codes set used = true where id = v_row.id;
  v_token := encode(gen_random_bytes(32), 'hex');
  insert into student_sessions (token_hash, email, expires_at)
  values (encode(digest(v_token, 'sha256'), 'hex'), v_email, now() + interval '30 days');
  delete from student_sessions where expires_at < now();
  return v_token;
end $$;

create or replace function public.srv_student_portal(p_secret text, p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_student students; v_levels text[];
begin
  perform _check_secret(p_secret);
  select st.* into v_student from student_sessions ss join students st on st.email = ss.email
   where ss.token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex')
     and ss.expires_at > now() and st.active and (st.access_until is null or st.access_until >= current_date);
  if v_student.email is null then return null; end if;
  v_levels := v_student.levels;
  return jsonb_build_object(
    'student', jsonb_build_object('email', v_student.email, 'name', v_student.name, 'levels', v_levels, 'batch_ids', v_student.batch_ids),
    'assets', coalesce((select jsonb_agg(jsonb_build_object('lesson_id', a.lesson_id, 'video_url', a.video_url, 'notes', a.notes, 'material_url', a.material_url, 'material_label', a.material_label))
                         from lesson_assets a join lessons l on l.id = a.lesson_id
                        where l.published and l.level = any(v_levels)), '[]'::jsonb),
    'live', coalesce((select jsonb_agg(jsonb_build_object('session_id', k.session_id, 'join_url', k.join_url, 'recording_url', k.recording_url))
                       from live_session_links k join live_sessions s on s.id = k.session_id
                      where not s.cancelled and (s.level = any(v_levels) or s.level = 'All Levels' or s.batch_id = any(v_student.batch_ids))), '[]'::jsonb)
  );
end $$;

create or replace function public.srv_logout(p_secret text, p_token text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  perform _check_secret(p_secret);
  delete from student_sessions where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex');
end $$;

-- Callable over the API only with the secret (checked inside).
grant execute on function public.srv_create_login_code(text, text) to anon;
grant execute on function public.srv_verify_login_code(text, text, text) to anon;
grant execute on function public.srv_student_portal(text, text) to anon;
grant execute on function public.srv_logout(text, text) to anon;
