-- 전문가 포털 — 전문가별 1회용 접속 토큰(링크 인증)

alter table public.heagency_experts
  add column if not exists portal_token uuid not null default gen_random_uuid();
create unique index if not exists heagency_experts_portal_token_idx
  on public.heagency_experts (portal_token);
