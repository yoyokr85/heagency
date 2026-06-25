import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { SERVICE_TYPES, sanitizeList } from '../../../lib/taxonomy'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

function clientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for')
  return (xff ? xff.split(',')[0] : '').trim() || null
}

export async function POST(req: NextRequest) {
  let body: {
    name?: string
    phone?: string
    domain?: string
    service_types?: unknown
    budget?: string
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
  const domain = (body.domain || '').trim().slice(0, 60)
  const budget = (body.budget || '').trim().slice(0, 60)
  const message = (body.message || '').trim().slice(0, 2000)
  const service_types = sanitizeList(body.service_types, SERVICE_TYPES)

  if (!name || !phone) {
    return NextResponse.json({ error: '이름과 연락처는 필수입니다.' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('heagency_leads').insert({
    name,
    phone,
    domain,
    service_types,
    budget,
    message,
    consent_at: new Date().toISOString(),
    ip: clientIp(req),
  })

  if (error) {
    console.error('[lead insert]', error.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
