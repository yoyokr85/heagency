-- 전문가 지원: 지역 다중선택 + 포트폴리오 링크 다중

alter table public.heagency_expert_applications
  add column if not exists regions text[] not null default '{}',
  add column if not exists portfolio_urls text[] not null default '{}';

alter table public.heagency_experts
  add column if not exists regions text[] not null default '{}';
