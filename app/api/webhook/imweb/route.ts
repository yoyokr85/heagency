import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  // 페이로드 확인용 로그 (파싱 로직 완성 전)
  const supabase = getSupabase()
  console.log('[imweb webhook]', JSON.stringify(body, null, 2))

  // TODO: 페이로드 확인 후 파싱 로직 추가
  // const { name, city } = parseImwebPayload(body)
  // await supabase.from('registrations').insert({ name, city, type: 'kid' })

  return NextResponse.json({ ok: true })
}
