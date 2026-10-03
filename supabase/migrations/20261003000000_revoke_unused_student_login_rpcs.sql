-- The student login was removed (all classes are free, no student accounts). These SECURITY DEFINER functions
-- are no longer called by the app, so close them to the public API. Re-grant with GRANT EXECUTE if ever needed.
revoke execute on function public.srv_create_login_code(text, text) from public, anon, authenticated;
revoke execute on function public.srv_verify_login_code(text, text, text) from public, anon, authenticated;
revoke execute on function public.srv_student_portal(text, text) from public, anon, authenticated;
revoke execute on function public.srv_logout(text, text) from public, anon, authenticated;
-- Only the signed-in admin calls this; it checks is_admin() itself, but there is no reason to expose it to visitors.
revoke execute on function public.confirm_enrolment(uuid) from public, anon;
