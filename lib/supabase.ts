import { createClient } from '@supabase/supabase-js'

// 서버 전용 admin 클라이언트 (SERVICE_ROLE_KEY → RLS 우회). API 라우트/서버에서만 사용.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key',
    { auth: { persistSession: false } }
  )
}
