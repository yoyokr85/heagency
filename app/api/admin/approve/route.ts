import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isAuthed } from '../../../../lib/admin'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: { id?: number; action?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const id = Number(body.id)
  const action = body.action
  if (!id || (action !== 'accept' && action !== 'reject')) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const supabase = getSupabase()

  // 반려
  if (action === 'reject') {
    const { error } = await supabase
      .from('heagency_expert_applications')
      .update({ status: 'rejected' })
      .eq('id', id)
    if (error) return NextResponse.json({ error: 'db error' }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  // 승인 → 전문가 자동 등록
  const { data: app, error: loadErr } = await supabase
    .from('heagency_expert_applications')
    .select('*')
    .eq('id', id)
    .single()
  if (loadErr || !app) {
    return NextResponse.json({ error: 'application not found' }, { status: 404 })
  }

  // 같은 연락처 전문가 중복 방지
  const { data: existing } = await supabase
    .from('heagency_experts')
    .select('id')
    .eq('phone', app.phone)
    .maybeSingle()

  if (!existing) {
    const links: string[] = app.portfolio_urls ?? []
    const { error: insErr } = await supabase.from('heagency_experts').insert({
      name: app.name,
      phone: app.phone,
      email: app.email,
      role: app.role,
      service_types: app.service_types ?? [],
      domains: app.domains ?? [],
      regions: app.regions ?? [],
      status: 'pending', // 등록은 되되 활성화는 관리자가 별도로(평점·검토 후)
      memo: [app.memo, links.length ? `포트폴리오:\n${links.join('\n')}` : '', '지원서 승인 자동생성']
        .filter(Boolean)
        .join('\n'),
      source_application_id: app.id,
    })
    if (insErr) {
      console.error('[expert insert]', insErr.message)
      return NextResponse.json({ error: 'db error' }, { status: 500 })
    }
  }

  const { error: updErr } = await supabase
    .from('heagency_expert_applications')
    .update({ status: 'accepted' })
    .eq('id', id)
  if (updErr) return NextResponse.json({ error: 'db error' }, { status: 500 })

  return NextResponse.json({ ok: true, alreadyExists: !!existing })
}
