-- HE:A:GENCY 매칭 플랫폼 Phase 1 스키마
-- Supabase 콘솔 > SQL Editor 에 붙여넣고 1회 실행.
-- (이전 supabase/consults.sql 의 consults 테이블은 heagency_leads 로 대체 — deprecated)
--
-- 매칭 키(Phase 2 자동 직배정에서 사용): service_types[] + domains[]

-- ── 광고주 요청(리드) ─────────────────────────────
create table if not exists public.heagency_leads (
  id                  bigint generated always as identity primary key,
  created_at          timestamptz not null default now(),
  name                text not null,
  phone               text not null,
  domain              text,                 -- 업종: 의사·병원 / 변호사·법률 / 피트니스·헬스 / 기타
  service_types       text[] not null default '{}',  -- 숏폼 / 유튜브 / 블로그 / 컨설팅
  budget              text,                 -- 예산대(자유)
  message             text,
  status              text not null default 'new'
                        check (status in ('new','assigned','contacted','closed')),
  assigned_expert_id  bigint,               -- Phase 2 (FK 는 experts 생성 후 아래에서 추가)
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
  role              text,                   -- PD / 편집자 / 마케터·블로거
  service_types     text[] not null default '{}',  -- 가능 서비스
  domains           text[] not null default '{}',  -- 경험 도메인(병원/법률/피트니스 ...)
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

-- heagency_leads.assigned_expert_id 가 experts 를 참조하므로 experts 를 먼저 만들어야 함.
-- 위 순서상 leads 가 먼저 선언돼 FK 가 깨질 수 있어, FK 는 테이블 생성 후 별도로 건다.
alter table public.heagency_leads
  drop constraint if exists heagency_leads_assigned_expert_id_fkey;
alter table public.heagency_leads
  add constraint heagency_leads_assigned_expert_id_fkey
  foreign key (assigned_expert_id) references public.heagency_experts(id) on delete set null;

-- 서버(API)는 SERVICE_ROLE_KEY 로만 접근. RLS 켜고 공개 정책 없음(익명 차단).
alter table public.heagency_leads                enable row level security;
alter table public.heagency_expert_applications  enable row level security;
alter table public.heagency_experts              enable row level security;

create index if not exists heagency_leads_created_idx  on public.heagency_leads (created_at desc);
create index if not exists heagency_leads_status_idx   on public.heagency_leads (status);
create index if not exists heagency_apps_created_idx    on public.heagency_expert_applications (created_at desc);
create index if not exists heagency_apps_status_idx     on public.heagency_expert_applications (status);
create index if not exists heagency_experts_status_idx  on public.heagency_experts (status);
