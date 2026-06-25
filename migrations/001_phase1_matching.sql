-- HE:A:GENCY 매칭 플랫폼 Phase 1
-- 빌드 시 scripts/migrate.mjs 가 자동 적용 (DATABASE_URL 필요). 콘솔 복붙 불필요.
-- 매칭 키(Phase 2 자동 직배정): service_types[] + domains[]

-- ── 광고주 요청(리드) ─────────────────────────────
create table if not exists public.heagency_leads (
  id                  bigint generated always as identity primary key,
  created_at          timestamptz not null default now(),
  name                text not null,
  phone               text not null,
  domain              text,
  service_types       text[] not null default '{}',
  budget              text,
  message             text,
  status              text not null default 'new'
                        check (status in ('new','assigned','contacted','closed')),
  assigned_expert_id  bigint,
  notify_status       text,
  consent_at          timestamptz,
  ip                  text
);

-- ── 전문가 지원 ───────────────────────────────────
create table if not exists public.heagency_expert_applications (
  id                bigint generated always as identity primary key,
  created_at        timestamptz not null default now(),
  name              text not null,
  phone             text not null,
  email             text,
  role              text,
  service_types     text[] not null default '{}',
  domains           text[] not null default '{}',
  region            text,
  experience_years  int,
  portfolio_url     text,
  memo              text,
  status            text not null default 'pending'
                      check (status in ('pending','reviewing','accepted','rejected')),
  consent_at        timestamptz
);

-- ── 승인된 전문가(매칭 대상) ───────────────────────
create table if not exists public.heagency_experts (
  id                    bigint generated always as identity primary key,
  created_at            timestamptz not null default now(),
  name                  text not null,
  phone                 text not null,
  email                 text,
  role                  text,
  service_types         text[] not null default '{}',
  domains               text[] not null default '{}',
  region                text,
  rating                int not null default 70,
  status                text not null default 'pending'
                          check (status in ('pending','active','suspended')),
  memo                  text,
  source_application_id bigint references public.heagency_expert_applications(id) on delete set null
);

-- leads.assigned_expert_id → experts FK (experts 생성 후 부착)
alter table public.heagency_leads
  drop constraint if exists heagency_leads_assigned_expert_id_fkey;
alter table public.heagency_leads
  add constraint heagency_leads_assigned_expert_id_fkey
  foreign key (assigned_expert_id) references public.heagency_experts(id) on delete set null;

-- 서버(API)는 SERVICE_ROLE_KEY 로만 접근. RLS 켜고 공개 정책 없음.
alter table public.heagency_leads                enable row level security;
alter table public.heagency_expert_applications  enable row level security;
alter table public.heagency_experts              enable row level security;

create index if not exists heagency_leads_created_idx   on public.heagency_leads (created_at desc);
create index if not exists heagency_leads_status_idx    on public.heagency_leads (status);
create index if not exists heagency_apps_created_idx     on public.heagency_expert_applications (created_at desc);
create index if not exists heagency_apps_status_idx      on public.heagency_expert_applications (status);
create index if not exists heagency_experts_status_idx   on public.heagency_experts (status);
