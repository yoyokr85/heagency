import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string
    phone?: string
    category?: string
    message?: string
    company?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  // honeypot — 봇이 채우면 조용히 성공 처리
  if (body.company) return NextResponse.json({ ok: true })

  const name = (body.name || '').trim().slice(0, 80)
  const phone = (body.phone || '').trim().slice(0, 40)
  const category = (body.category || '').trim().slice(0, 60)
  const message = (body.message || '').trim().slice(0, 2000)

  if (!name || !phone) {
    return NextResponse.json({ error: '이름과 연락처는 필수입니다.' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('consults').insert({
    name,
    phone,
    category,
    message,
  })

  if (error) {
    console.error('[consult insert]', error.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
