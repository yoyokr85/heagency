import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'
import { aiComplete, type ChatMsg } from '../../../lib/ai'
import { buildConsultSystem } from '../../../lib/consult'

export async function POST(req: NextRequest) {
  let body: { token?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const token = (body.token || '').trim()
  const message = (body.message || '').trim().slice(0, 2000)
  if (!token || !message) return NextResponse.json({ error: 'bad request' }, { status: 400 })

  const sb = supabaseAdmin()
  const { data: lead } = await sb
    .from('heagency_leads')
    .select('id, name, domain, service_types, budget, message')
    .eq('chat_token', token)
    .single()
  if (!lead) return NextResponse.json({ error: 'not found' }, { status: 404 })

  // 히스토리 로드
  const { data: history } = await sb
    .from('heagency_messages')
    .select('role, content')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: true })
    .limit(40)

  const messages: ChatMsg[] = (history ?? []).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))
  messages.push({ role: 'user', content: message })

  const system = buildConsultSystem(lead)

  let reply: string
  try {
    reply = await aiComplete({ system, messages, maxTokens: 700 })
  } catch (e) {
    console.error('[chat ai]', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'ai error' }, { status: 500 })
  }

  // 사용자 + 답변 저장
  await sb.from('heagency_messages').insert([
    { lead_id: lead.id, role: 'user', content: message },
    { lead_id: lead.id, role: 'assistant', content: reply },
  ])

  return NextResponse.json({ reply })
}
