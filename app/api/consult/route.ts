import { NextRequest, NextResponse } from 'next/server'
import { SERVICE_TYPES, sanitizeList } from '../../../lib/taxonomy'
import { supabaseAdmin } from '../../../lib/supabase'
import { pickExpert } from '../../../lib/match'
import { sendInfoSms, isQuietHoursKst } from '../../../lib/solapi'
import { buildLeadReceivedSms, buildLeadAssignedSms, leadCtx } from '../../../lib/notify'
import { SITE_URL } from '../../../lib/site'

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

  const supabase = supabaseAdmin()
  const { data: lead, error } = await supabase
    .from('heagency_leads')
    .insert({
      name,
      phone,
      domain,
      service_types,
      budget,
      message,
      consent_at: new Date().toISOString(),
      ip: clientIp(req),
    })
    .select('id, chat_token')
    .single()

  if (error || !lead) {
    console.error('[lead insert]', error?.message)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  // 자동 직배정 — 적합 전문가 1명. 실패해도 리드는 보존(미배정 상태로 남음).
  const ctx = leadCtx(domain, service_types)
  try {
    const expert = await pickExpert({ domain, service_types })
    if (expert) {
      await supabase
        .from('heagency_leads')
        .update({ status: 'assigned', assigned_expert_id: expert.id })
        .eq('id', lead.id)
      // 배정 전문가 알림 SMS (야간 보류) — 전문가 개인 포털 링크
      if (expert.phone && !isQuietHoursKst()) {
        const portalUrl = expert.portal_token
          ? `${SITE_URL}/portal/${expert.portal_token}`
          : `${SITE_URL}/portal`
        sendInfoSms(expert.phone, buildLeadAssignedSms(name, ctx, portalUrl)).catch(() => {})
      }
    }
  } catch (e) {
    console.error('[lead assign]', e instanceof Error ? e.message : e)
  }

  // 광고주 접수 SMS + AI 상담 링크
  const chatLink = `${SITE_URL}/c/${lead.chat_token}`
  const notify = await sendInfoSms(phone, buildLeadReceivedSms(name, ctx, chatLink)).catch(
    () => 'failed' as const
  )
  await supabase.from('heagency_leads').update({ notify_status: notify }).eq('id', lead.id)

  return NextResponse.json({ ok: true })
}
