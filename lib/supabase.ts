import { createClient } from '@supabase/supabase-js'

// 서버 전용 admin 클라이언트 (SERVICE_ROLE_KEY → RLS 우회). API 라우트/서버에서만 사용.
// global.fetch 에 cache:'no-store' 강제 — 서버 컴포넌트에서 Next.js 가 쿼리 결과를
// 데이터 캐시에 담아 stale 값을 주는 문제 방지(포털 배정 0건 버그 원인).
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key',
    {
      auth: { persistSession: false },
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, { ...init, cache: 'no-store' }),
      },
    }
  )
}
