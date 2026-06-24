-- HE:A:GENCY 상담 신청 테이블
-- Supabase 콘솔 > SQL Editor 에 붙여넣고 1회 실행하세요.

create table if not exists public.consults (
  id          bigint generated always as identity primary key,
  name        text not null,
  phone       text not null,
  category    text,
  message     text,
  created_at  timestamptz not null default now()
);

-- 서버(API 라우트)는 SERVICE_ROLE_KEY로 접근하므로 RLS를 켜두고
-- 공개 정책은 만들지 않습니다(익명 클라이언트는 읽기/쓰기 불가).
alter table public.consults enable row level security;

create index if not exists consults_created_at_idx on public.consults (created_at desc);
