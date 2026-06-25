-- 어드민 편집형 설정(키-값). AI 모델 선택 등.
create table if not exists public.heagency_settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz not null default now()
);
alter table public.heagency_settings enable row level security;
