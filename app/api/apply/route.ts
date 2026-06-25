import { NextRequest, NextResponse } from 'next/server'
import { SERVICE_TYPES, DOMAINS, EXPERT_ROLES, sanitizeList } from '../../../lib/taxonomy'
import { supabaseAdmin } from '../../../lib/supabase'
import { sendInfoSms } from '../../../lib/solapi'
import { buildApplicationReceivedSms } from '../../../lib/notify'
import { isValidRegion } from '../../../lib/regions'

function cleanRegions(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return Array.from(new Set(v.filter((x): x is string => typeof x === 'string' && isValidRegion(x)))).slice(0, 40)
}
function cleanLinks(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((x): x is string => typeof x === 'string')
    .map((x) => x.trim().slice(0, 300))
    .filter((x) => /^https?:\/\//i.test(x) || (x.length > 0 && x.includes('.')))
    .slice(0, 8)
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
  const regions = cleanRegions(body.regions)
  const portfolio_urls = cleanLinks(body.portfolio_urls)
  const memo = str(body.memo, 2000)
  const service_types = sanitizeList(body.service_types, SERVICE_TYPES)
  const domains = sanitizeList(body.domains, DOMAINS)

  const expRaw = str(body.experience_years, 6)
  const expNum = parseInt(expRaw, 10)
  const experience_years = Number.isFinite(expNum) && expNum >= 0 && expNum < 100 ? expNum : null

  if (!name || !phone) {
    return NextResponse.json({ error: '이름과 연락처는 필수입니다.' }, { status: 400 })
  }

  const supabase = supabaseAdmin()
  const { error } = await supabase.from('heagency_expert_applications').insert({
    name,
    phone,
    email,
    role,
    service_types,
    domains,
    regions,
    experience_years,
    portfolio_urls,
    memo,
    consent_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[apply insert]', error.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  // 지원 접수 안내 SMS (실패해도 접수는 유지)
  sendInfoSms(phone, buildApplicationReceivedSms(name)).catch(() => {})

  return NextResponse.json({ ok: true })
}
