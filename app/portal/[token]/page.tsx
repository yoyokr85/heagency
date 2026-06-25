import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '../../../lib/supabase'
import { AG_STYLES } from '../../../lib/styles'
import PortalLeads, { type PortalLead } from './PortalLeads'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: '전문가 포털 · HE:A:GENCY',
  robots: { index: false, follow: false },
}

const wrap: CSSProperties = { maxWidth: 720, margin: '0 auto', padding: '0 22px 60px' }

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const sb = supabaseAdmin()
  const { data: expert } = await sb
    .from('heagency_experts')
    .select('id, name, role, status')
    .eq('portal_token', token)
    .single()
  if (!expert) notFound()

  const { data: leadRows } = await sb
    .from('heagency_leads')
    .select('id, created_at, name, phone, domain, service_types, budget, message, status')
    .eq('assigned_expert_id', expert.id)
    .order('created_at', { ascending: false })
    .limit(200)

  const leads = (leadRows ?? []) as Omit<PortalLead, 'messages'>[]
  const ids = leads.map((l) => l.id)

  const msgByLead = new Map<number, { role: 'user' | 'assistant'; content: string }[]>()
  if (ids.length) {
    const { data: msgs } = await sb
      .from('heagency_messages')
      .select('lead_id, role, content, created_at')
      .in('lead_id', ids)
      .order('created_at', { ascending: true })
    for (const m of msgs ?? []) {
      const arr = msgByLead.get(m.lead_id) ?? []
      arr.push({ role: m.role as 'user' | 'assistant', content: m.content })
      msgByLead.set(m.lead_id, arr)
    }
  }

  const withMsgs: PortalLead[] = leads.map((l) => ({ ...l, messages: msgByLead.get(l.id) ?? [] }))
  const activeCount = withMsgs.filter((l) => l.status !== 'closed').length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AG_STYLES }} />
      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ ...wrap, padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A<span style={{ color: 'var(--clay)' }}>:</span>GENCY
          </span>
          <span style={{ color: 'var(--muted)', letterSpacing: '1px' }}>전문가 포털</span>
        </div>
      </header>

      <main style={{ ...wrap, paddingTop: 26 }}>
        <h1 className="ag-serif" style={{ fontSize: 22, fontWeight: 900, color: 'var(--espresso)' }}>
          {expert.name}님{expert.role ? ` · ${expert.role}` : ''}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '6px 0 0' }}>
          진행 중 상담 <b style={{ color: 'var(--clay)' }}>{activeCount}</b>건
          {expert.status !== 'active' && (
            <span style={{ color: 'var(--muted)' }}> · (계정 활성화 대기 중 — 배정은 활성화 후 시작)</span>
          )}
        </p>
        <div style={{ marginTop: 20 }}>
          <PortalLeads token={token} leads={withMsgs} />
        </div>
      </main>
    </>
  )
}
