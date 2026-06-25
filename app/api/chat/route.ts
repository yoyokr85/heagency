import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'
import { aiComplete, type ChatMsg } from '../../../lib/ai'
import { leadCtx } from '../../../lib/notify'

const SYSTEM = `당신은 HE:A:GENCY(부산 전문직 전문 광고·마케팅 에이전시)의 AI 상담사입니다.
고객은 의사·변호사·원장 등 전문직 광고주입니다.

목표:
1) 따뜻하고 신뢰감 있는 톤으로 대화한다.
2) 고객의 업종·마케팅 목표·현재 상황·예산대를 자연스럽게 한두 가지씩 파악한다.
3) 적합한 서비스(숏폼 대행 / 전문직 유튜브 / 블로그 마케팅 / 브랜드·설득 컨설팅)를 제안한다.
4) 구체적 금액은 "담당 전문가가 상담 후 맞춤 견적으로 안내드린다"고만 말한다(임의 가격 금지).
5) 의료광고법 등 과장·허위 표현은 피하도록 부드럽게 조언한다.

규칙: 한국어. 답변은 2~4문장으로 간결하게. 한 번에 질문은 하나만.`

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
    .select('id, name, domain, service_types, budget')
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

  const ctx = leadCtx(lead.domain, lead.service_types ?? [])
  const system = `${SYSTEM}\n\n[상담 고객] ${lead.name}님${ctx ? ` · ${ctx}` : ''}${
    lead.budget ? ` · 예산 ${lead.budget}` : ''
  }`

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
