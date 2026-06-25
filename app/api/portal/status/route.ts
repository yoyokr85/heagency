import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

const ALLOWED = ['assigned', 'contacted', 'closed']

export async function POST(req: NextRequest) {
  let body: { token?: string; lead_id?: number; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const token = (body.token || '').trim()
  const leadId = Number(body.lead_id)
  const status = body.status || ''
  if (!token || !leadId || !ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const sb = supabaseAdmin()
  const { data: expert } = await sb
    .from('heagency_experts')
    .select('id')
    .eq('portal_token', token)
    .single()
  if (!expert) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { error } = await sb
    .from('heagency_leads')
    .update({ status })
    .eq('id', leadId)
    .eq('assigned_expert_id', expert.id)
  if (error) return NextResponse.json({ error: 'db error' }, { status: 500 })

  return NextResponse.json({ ok: true })
}
