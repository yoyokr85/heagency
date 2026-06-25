import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

// 포털 토큰 → 전문가, 그리고 그 전문가에게 배정된 리드인지 확인
async function authLead(token: string, leadId: number) {
  const sb = supabaseAdmin()
  const { data: expert } = await sb
    .from('heagency_experts')
    .select('id')
    .eq('portal_token', token)
    .single()
  if (!expert) return null
  const { data: lead } = await sb
    .from('heagency_leads')
    .select('id, assigned_expert_id')
    .eq('id', leadId)
    .single()
  if (!lead || lead.assigned_expert_id !== expert.id) return null
  return { sb, expertId: expert.id, leadId: lead.id }
}

export async function POST(req: NextRequest) {
  let body: { token?: string; lead_id?: number; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const token = (body.token || '').trim()
  const leadId = Number(body.lead_id)
  const message = (body.message || '').trim().slice(0, 2000)
  if (!token || !leadId || !message) return NextResponse.json({ error: 'bad request' }, { status: 400 })

  const auth = await authLead(token, leadId)
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  // 전문가 답장은 광고주 상담창(/c)에 assistant 로 표시 + 상태 contacted 로
  const { error } = await auth.sb
    .from('heagency_messages')
    .insert({ lead_id: leadId, role: 'assistant', content: message })
  if (error) return NextResponse.json({ error: 'db error' }, { status: 500 })

  await auth.sb.from('heagency_leads').update({ status: 'contacted' }).eq('id', leadId).eq('status', 'assigned')

  return NextResponse.json({ ok: true })
}
