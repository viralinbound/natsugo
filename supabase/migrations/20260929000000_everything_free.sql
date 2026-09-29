-- Everything in the online classroom is free: open all lesson assets and live-class links to the public.
drop policy if exists "public read free lesson assets" on public.lesson_assets;
create policy "public read lesson assets" on public.lesson_assets for select
  using (exists (select 1 from public.lessons l where l.id = lesson_id and l.published));

create policy "public read live links" on public.live_session_links for select using (true);

update public.lessons set is_free = true where not is_free;
