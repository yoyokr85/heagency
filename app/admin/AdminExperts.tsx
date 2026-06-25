'use client'

import { useState } from 'react'

type Expert = {
  id: number
  name: string
  phone: string
  role: string | null
  service_types: string[] | null
  domains: string[] | null
  rating: number | null
  status: string
  portal_token: string | null
}

function copyPortal(token: string) {
  const url = `${window.location.origin}/portal/${token}`
  navigator.clipboard?.writeText(url).then(
    () => alert('포털 링크가 복사됐어요:\n' + url),
    () => prompt('포털 링크', url)
  )
}

const STATUS_LABEL: Record<string, string> = {
  pending: '대기',
  active: '활성',
  suspended: '정지',
}

export default function AdminExperts({ experts }: { experts: Expert[] }) {
  const [items, setItems] = useState(experts)
  const [busyId, setBusyId] = useState<number | null>(null)

  async function act(id: number, action: 'activate' | 'suspend') {
    setBusyId(id)
    try {
      const res = await fetch('/api/admin/expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      if (!res.ok) throw new Error('처리 실패')
      setItems((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: action === 'activate' ? 'active' : 'suspended' } : e))
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : '처리 실패')
    } finally {
      setBusyId(null)
    }
  }

  if (!items.length) return <p style={{ color: 'var(--muted)', fontSize: 14 }}>등록된 전문가가 없습니다. (지원 승인 시 자동 등록)</p>

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: 0 }}>
        ※ <b>활성(active)</b> 전문가만 자동 배정 대상입니다.
      </p>
      {items.map((e) => (
        <div
          key={e.id}
          style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '14px 16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontWeight: 900, color: 'var(--espresso)' }}>
              {e.name} · {e.role || '역할미정'}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 999,
                background: e.status === 'active' ? 'var(--clay)' : e.status === 'suspended' ? '#bbb' : 'var(--paper-2)',
                color: e.status === 'active' ? '#fff' : 'var(--ink-soft)',
              }}
            >
              {STATUS_LABEL[e.status] || e.status}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.7 }}>
            <div>📞 {e.phone} · ⭐ {e.rating ?? '-'}</div>
            <div>서비스: {e.service_types?.join(', ') || '-'} / 도메인: {e.domains?.join(', ') || '-'}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {e.status !== 'active' ? (
              <button
                onClick={() => act(e.id, 'activate')}
                disabled={busyId === e.id}
                style={{ padding: '7px 14px', background: 'var(--clay)', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                활성화
              </button>
            ) : (
              <button
                onClick={() => act(e.id, 'suspend')}
                disabled={busyId === e.id}
                style={{ padding: '7px 14px', background: 'var(--card)', color: 'var(--ink-soft)', border: '1px solid var(--line)', borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                정지
              </button>
            )}
            {e.portal_token && (
              <button
                onClick={() => copyPortal(e.portal_token as string)}
                style={{ padding: '7px 14px', background: 'var(--card)', color: 'var(--ink-soft)', border: '1px solid var(--line)', borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                포털 링크 복사
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
