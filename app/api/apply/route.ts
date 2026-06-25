import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { SERVICE_TYPES, DOMAINS, EXPERT_ROLES, sanitizeList } from '../../../lib/taxonomy'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  // honeypot
  if (body.company) return NextResponse.json({ ok: true })

  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

  const name = str(body.name, 80)
  const phone = str(body.phone, 40)
  const email = str(body.email, 120)
  const roleRaw = str(body.role, 30)
  const role = (EXPERT_ROLES as readonly string[]).includes(roleRaw) ? roleRaw : ''
  const region = str(body.region, 60)
  const portfolio_url = str(body.portfolio_url, 300)
  const memo = str(body.memo, 2000)
  const service_types = sanitizeList(body.service_types, SERVICE_TYPES)
  const domains = sanitizeList(body.domains, DOMAINS)

  const expRaw = str(body.experience_years, 6)
  const expNum = parseInt(expRaw, 10)
  const experience_years = Number.isFinite(expNum) && expNum >= 0 && expNum < 100 ? expNum : null

  if (!name || !phone) {
    return NextResponse.json({ error: '이름과 연락처는 필수입니다.' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('heagency_expert_applications').insert({
    name,
    phone,
    email,
    role,
    service_types,
    domains,
    region,
    experience_years,
    portfolio_url,
    memo,
    consent_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[apply insert]', error.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
