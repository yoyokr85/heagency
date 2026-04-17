-- 1. registrations 테이블 (참가자 카운터 + 라이브 티커 소스)
create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  city text not null,
  type text check (type in ('kid', 'company')) not null,
  created_at timestamptz default now()
);

-- 2. editor_logs 테이블 (에디터 저널)
create table if not exists editor_logs (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  content text not null,
  status text check (status in ('done', 'open', 'missed')) default 'open',
  created_at timestamptz default now()
);

-- 3. Row Level Security — SELECT 공개, INSERT는 서버 전용
alter table registrations enable row level security;
alter table editor_logs enable row level security;

create policy "public read registrations"
  on registrations for select using (true);

create policy "public read editor_logs"
  on editor_logs for select using (true);

-- 4. Realtime 활성화
alter publication supabase_realtime add table registrations;

-- 5. 시드 데이터 (현재 7명 아이 + 3개 기업)
insert into registrations (name, city, type) values
  ('김○○', '서울', 'kid'),
  ('이○○', '인천', 'kid'),
  ('박○○', '충주', 'kid'),
  ('최○○', '부산', 'kid'),
  ('정○○', '서울', 'kid'),
  ('윤○○', '강남', 'kid'),
  ('장○○', '서초', 'kid'),
  ('◯◯ 스낵', 'F&B', 'company'),
  ('◯◯ 뷰티', '코스메틱', 'company'),
  ('◯◯ 문구', '리빙', 'company');

-- 6. 에디터 로그 시드
insert into editor_logs (category, content, status) values
  ('company', '시드 기업 ◯◯사 합류 확정 ✦', 'done'),
  ('company', '△△사 대표께 제안서 발송, 회신 대기', 'open'),
  ('company', '□□사 거절 — 내부 CSR 일정', 'missed'),
  ('mentor', '시드 스승 1호 합류 ✦', 'done'),
  ('mentor', '◇◇ 교수 미팅, 커리큘럼 검토', 'open'),
  ('venue', '서울 ☆☆몰 미팅, 긍정 검토', 'open'),
  ('venue', '△△카페 거절 — 안전 책임 이슈', 'missed');
