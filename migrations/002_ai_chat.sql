-- AI 상담 채팅 — 리드별 1회용 토큰 + 메시지 로그

alter table public.heagency_leads
  add column if not exists chat_token uuid not null default gen_random_uuid();
create unique index if not exists heagency_leads_chat_token_idx
  on public.heagency_leads (chat_token);

create table if not exists public.heagency_messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  lead_id     bigint not null references public.heagency_leads(id) on delete cascade,
  role        text not null check (role in ('user','assistant')),
  content     text not null
);
alter table public.heagency_messages enable row level security;
create index if not exists heagency_messages_lead_idx
  on public.heagency_messages (lead_id, created_at);
