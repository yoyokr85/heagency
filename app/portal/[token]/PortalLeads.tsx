'use client'

import { useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }
export type PortalLead = {
  id: number
  created_at: string
  name: string
  phone: string
  domain: string | null
  service_types: string[] | null
  budget: string | null
  message: string | null
  status: string
  messages: Msg[]
}

const STATUS_LABEL: Record<string, string> = {
  new: '신규',
  assigned: '배정됨',
  contacted: '상담중',
  closed: '종료',
}

function fmt(iso: string) {
  return iso.replace('T', ' ').slice(0, 16)
}

function LeadCard({ token, lead }: { token: string; lead: PortalLead }) {
  const [msgs, setMsgs] = useState<Msg[]>(lead.messages)
  const [status, setStatus] = useState(lead.status)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setBusy(true)
    try {
      const res = await fetch('/api/portal/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, lead_id: lead.id, message: text }),
      })
      if (!res.ok) throw new Error('failed')
      setMsgs((m) => [...m, { role: 'assistant', content: text }])
      setInput('')
      if (status === 'assigned') setStatus('contacted')
    } catch {
      alert('전송 실패. 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
  }

  async function setLeadStatus(s: string) {
    setBusy(true)
    try {
      const res = await fetch('/api/portal/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, lead_id: lead.id, status: s }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus(s)
    } catch {
      alert('상태 변경 실패')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '16px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontWeight: 900, color: 'var(--espresso)' }}>
          {lead.name} · {lead.domain || '업종미정'}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: status === 'closed' ? '#bbb' : 'var(--paper-2)', color: 'var(--ink-soft)' }}>
          {STATUS_LABEL[status] || status}
        </span>
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.8 }}>
        <div>📞 <a href={`tel:${lead.phone}`} style={{ color: 'var(--clay)' }}>{lead.phone}</a></div>
        <div>서비스: {(lead.service_types ?? []).join(', ') || '-'} / 예산: {lead.budget || '-'}</div>
        {lead.message && <div style={{ whiteSpace: 'pre-wrap' }}>💬 {lead.message}</div>}
        <div style={{ color: 'var(--muted)', fontSize: 12 }}>{fmt(lead.created_at)}</div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        style={{ marginTop: 10, background: 'none', border: 'none', color: 'var(--clay)', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
      >
        {open ? '▾ 상담 내역 닫기' : `▸ 상담 내역·답장 (${msgs.length})`}
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            {msgs.length === 0 && <div style={{ fontSize: 13, color: 'var(--muted)' }}>아직 대화가 없습니다.</div>}
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  padding: '9px 12px',
                  borderRadius: 12,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  background: m.role === 'user' ? 'var(--paper-2)' : 'var(--clay)',
                  color: m.role === 'user' ? 'var(--ink)' : '#fff',
                }}
              >
                <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>{m.role === 'user' ? '광고주' : '상담/전문가'}</div>
                {m.content}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="ag-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send() } }}
              placeholder="광고주에게 보낼 답장"
              disabled={busy}
            />
            <button onClick={send} disabled={busy || !input.trim()} style={{ padding: '0 18px', background: 'var(--clay)', color: '#fff', border: 'none', borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              전송
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {status !== 'contacted' && (
              <button onClick={() => setLeadStatus('contacted')} disabled={busy} style={chip}>상담중으로</button>
            )}
            {status !== 'closed' && (
              <button onClick={() => setLeadStatus('closed')} disabled={busy} style={chip}>종료</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const chip: React.CSSProperties = {
  padding: '6px 12px',
  background: 'var(--card)',
  color: 'var(--ink-soft)',
  border: '1px solid var(--line)',
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 12.5,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function PortalLeads({ token, leads }: { token: string; leads: PortalLead[] }) {
  if (!leads.length) return <p style={{ color: 'var(--muted)', fontSize: 14 }}>아직 배정된 상담이 없습니다.</p>
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {leads.map((l) => (
        <LeadCard key={l.id} token={token} lead={l} />
      ))}
    </div>
  )
}
