import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '../../../lib/supabase'
import { AG_STYLES } from '../../../lib/styles'
import { aiComplete } from '../../../lib/ai'
import { buildConsultSystem } from '../../../lib/consult'
import ChatClient from './ChatClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI 상담 · HE:A:GENCY',
  robots: { index: false, follow: false },
}

const wrap: CSSProperties = { maxWidth: 640, margin: '0 auto', padding: '0 22px 40px' }

export default async function ConsultChatPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const sb = supabaseAdmin()
  const { data: lead } = await sb
    .from('heagency_leads')
    .select('id, name, domain, service_types, budget, message')
    .eq('chat_token', token)
    .single()
  if (!lead) notFound()

  const { data: history } = await sb
    .from('heagency_messages')
    .select('role, content')
    .eq('lead_id', lead.id)
    .order('created_at', { ascending: true })
    .limit(40)

  let initial = (history ?? []).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  // 첫 진입: 문의 내용을 반영해 AI 첫 응답 생성 후 저장(새로고침해도 유지).
  if (!initial.length) {
    if (lead.message) {
      let reply: string
      try {
        reply = await aiComplete({
          system: buildConsultSystem(lead),
          messages: [{ role: 'user', content: lead.message }],
          maxTokens: 700,
        })
      } catch {
        reply = `${lead.name}님, 남겨주신 문의 잘 봤어요! 바로 도와드릴게요. 현재 마케팅을 해보신 적이 있으신가요?`
      }
      await sb.from('heagency_messages').insert([
        { lead_id: lead.id, role: 'user', content: lead.message },
        { lead_id: lead.id, role: 'assistant', content: reply },
      ])
      initial = [
        { role: 'user', content: lead.message },
        { role: 'assistant', content: reply },
      ]
    } else {
      initial = [
        {
          role: 'assistant',
          content: `${lead.name}님, 안녕하세요! HE:A:GENCY 상담사예요. 어떤 점이 가장 고민이신지 편하게 말씀해 주세요. 현재 마케팅을 해보신 적이 있으신가요?`,
        },
      ]
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AG_STYLES }} />
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ ...wrap, padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A<span style={{ color: 'var(--clay)' }}>:</span>GENCY
          </span>
          <span style={{ color: 'var(--muted)', letterSpacing: '1px' }}>AI 상담</span>
        </div>
      </header>

      <main style={{ ...wrap, paddingTop: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', margin: '0 0 16px' }}>
          AI 상담사가 먼저 니즈를 파악하고, 담당 전문가가 이어서 연락드려요.
        </p>
        <ChatClient token={token} initial={initial} />
      </main>
    </>
  )
}
