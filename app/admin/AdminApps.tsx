'use client'

import { useState } from 'react'

type App = {
  id: number
  created_at: string
  name: string
  phone: string
  email: string | null
  role: string | null
  service_types: string[] | null
  domains: string[] | null
  region: string | null
  experience_years: number | null
  portfolio_url: string | null
  memo: string | null
  status: string
}

const STATUS_LABEL: Record<string, string> = {
  pending: '검토대기',
  reviewing: '검토중',
  accepted: '승인',
  rejected: '반려',
}

function fmt(iso: string) {
  // 서버에서 받은 ISO 를 그대로 보기좋게 (YYYY-MM-DD HH:mm)
  return iso.replace('T', ' ').slice(0, 16)
}

export default function AdminApps({ apps }: { apps: App[] }) {
  const [items, setItems] = useState(apps)
  const [busyId, setBusyId] = useState<number | null>(null)

  async function act(id: number, action: 'accept' | 'reject') {
    if (action === 'accept' && !confirm('이 지원자를 승인하고 전문가로 등록할까요?')) return
    if (action === 'reject' && !confirm('이 지원을 반려할까요?')) return
    setBusyId(id)
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j.error || '처리 실패')
      setItems((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: action === 'accept' ? 'accepted' : 'rejected' } : a))
      )
      if (action === 'accept' && j.alreadyExists) alert('이미 등록된 연락처라 전문가 생성은 건너뛰고 상태만 승인했습니다.')
    } catch (err) {
      alert(err instanceof Error ? err.message : '처리 실패')
    } finally {
      setBusyId(null)
    }
  }

  if (!items.length) return <p style={{ color: 'var(--muted)', fontSize: 14 }}>아직 지원자가 없습니다.</p>

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((a) => (
        <div
          key={a.id}
          style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontWeight: 900, color: 'var(--espresso)' }}>
              {a.name} · {a.role || '역할미정'}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 999,
                background: a.status === 'accepted' ? 'var(--clay)' : a.status === 'rejected' ? '#bbb' : 'var(--paper-2)',
                color: a.status === 'accepted' ? '#fff' : 'var(--ink-soft)',
              }}
            >
              {STATUS_LABEL[a.status] || a.status}
            </span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.8 }}>
            <div>📞 {a.phone}{a.email ? ` · ✉ ${a.email}` : ''}</div>
            <div>
              서비스: {a.service_types?.join(', ') || '-'} / 도메인: {a.domains?.join(', ') || '-'}
            </div>
            <div>
              지역: {a.region || '-'} / 경력: {a.experience_years != null ? `${a.experience_years}년` : '-'}
            </div>
            {a.portfolio_url && (
              <div>
                🔗{' '}
                <a href={a.portfolio_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clay)' }}>
                  포트폴리오
                </a>
              </div>
            )}
            {a.memo && <div style={{ whiteSpace: 'pre-wrap' }}>📝 {a.memo}</div>}
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>{fmt(a.created_at)}</div>
          </div>

          {a.status !== 'accepted' && a.status !== 'rejected' && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
                onClick={() => act(a.id, 'accept')}
                disabled={busyId === a.id}
                style={{
                  padding: '8px 16px',
                  background: 'var(--clay)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 9,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                승인 → 전문가 등록
              </button>
              <button
                onClick={() => act(a.id, 'reject')}
                disabled={busyId === a.id}
                style={{
                  padding: '8px 16px',
                  background: 'var(--card)',
                  color: 'var(--ink-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 9,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                반려
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
