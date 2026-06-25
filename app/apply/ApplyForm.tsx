'use client'

import { useState } from 'react'
import { SERVICE_TYPES, DOMAINS, EXPERT_ROLES } from '../../lib/taxonomy'

type Status = 'idle' | 'sending' | 'done' | 'error'

function Chips({
  options,
  value,
  onToggle,
}: {
  options: readonly string[]
  value: string[]
  onToggle: (s: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((s) => {
        const on = value.includes(s)
        return (
          <button
            type="button"
            key={s}
            onClick={() => onToggle(s)}
            style={{
              padding: '9px 16px',
              borderRadius: 999,
              border: `1px solid ${on ? 'var(--clay)' : 'var(--line)'}`,
              background: on ? 'var(--clay)' : 'var(--card)',
              color: on ? '#fff' : 'var(--ink-soft)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all .15s ease',
            }}
          >
            {on ? '✓ ' : ''}
            {s}
          </button>
        )
      })}
    </div>
  )
}

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [domains, setDomains] = useState<string[]>([])

  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (s: string) =>
    set((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const email = String(data.get('email') || '').trim()
    const role = String(data.get('role') || '')
    const region = String(data.get('region') || '').trim()
    const experience_years = String(data.get('experience_years') || '').trim()
    const portfolio_url = String(data.get('portfolio_url') || '').trim()
    const memo = String(data.get('memo') || '').trim()
    const agree = data.get('agree') === 'on'
    const company = String(data.get('company') || '') // honeypot

    if (!name || !phone) {
      setError('이름과 연락처를 입력해 주세요.')
      setStatus('error')
      return
    }
    if (!agree) {
      setError('개인정보 수집·이용에 동의해 주세요.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          role,
          service_types: services,
          domains,
          region,
          experience_years,
          portfolio_url,
          memo,
          company,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('done')
      form.reset()
      setServices([])
      setDomains([])
    } catch {
      setError('전송에 실패했어요. 잠시 후 다시 시도하거나 @haeribo__ DM으로 문의해 주세요.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 6px' }}>
        <div style={{ fontSize: 36 }}>✓</div>
        <h3 className="ag-serif" style={{ fontSize: 21, fontWeight: 900, margin: '10px 0 0', color: 'var(--espresso)' }}>
          지원이 접수됐어요.
        </h3>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: '10px 0 0' }}>
          포트폴리오를 검토한 뒤 개별 연락드리겠습니다. 감사합니다.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
      <div>
        <label className="ag-label" htmlFor="af-name">이름 *</label>
        <input id="af-name" name="name" className="ag-input" placeholder="성함" autoComplete="name" />
      </div>

      <div>
        <label className="ag-label" htmlFor="af-phone">연락처 *</label>
        <input id="af-phone" name="phone" className="ag-input" placeholder="010-0000-0000" inputMode="tel" autoComplete="tel" />
      </div>

      <div>
        <label className="ag-label" htmlFor="af-email">이메일 (선택)</label>
        <input id="af-email" name="email" className="ag-input" placeholder="email@example.com" inputMode="email" autoComplete="email" />
      </div>

      <div>
        <label className="ag-label" htmlFor="af-role">역할</label>
        <select id="af-role" name="role" className="ag-select" defaultValue={EXPERT_ROLES[0]}>
          {EXPERT_ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <span className="ag-label">가능한 서비스 (복수 선택)</span>
        <Chips options={SERVICE_TYPES} value={services} onToggle={toggle(setServices)} />
      </div>

      <div>
        <span className="ag-label">경험 있는 분야 (복수 선택)</span>
        <Chips options={DOMAINS} value={domains} onToggle={toggle(setDomains)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label className="ag-label" htmlFor="af-region">활동 지역 (선택)</label>
          <input id="af-region" name="region" className="ag-input" placeholder="예: 부산 해운대" />
        </div>
        <div>
          <label className="ag-label" htmlFor="af-exp">경력 (년, 선택)</label>
          <input id="af-exp" name="experience_years" className="ag-input" placeholder="예: 3" inputMode="numeric" />
        </div>
      </div>

      <div>
        <label className="ag-label" htmlFor="af-portfolio">포트폴리오 링크 (선택)</label>
        <input id="af-portfolio" name="portfolio_url" className="ag-input" placeholder="유튜브·인스타·드라이브 등 URL" inputMode="url" />
      </div>

      <div>
        <label className="ag-label" htmlFor="af-memo">자기소개 (선택)</label>
        <textarea id="af-memo" name="memo" className="ag-textarea" placeholder="작업 스타일, 강점, 가능 일정 등 자유롭게 적어주세요." />
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-soft)' }}>
        <input type="checkbox" name="agree" style={{ marginTop: 3, accentColor: 'var(--clay)' }} />
        <span>
          전문가 선발 목적의 개인정보 수집·이용에 동의합니다. (제공 정보: 이름·연락처·이메일·포트폴리오 / 보유기간: 선발 종료 후 1년)
        </span>
      </label>

      {status === 'error' && (
        <div style={{ fontSize: 13, color: 'var(--clay-deep)', fontWeight: 700 }}>{error}</div>
      )}

      <button
        type="submit"
        className="ag-cta"
        disabled={status === 'sending'}
        style={{
          padding: '15px 20px',
          background: 'var(--clay)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 16,
          cursor: status === 'sending' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
          fontFamily: 'inherit',
        }}
      >
        {status === 'sending' ? '전송 중…' : '전문가 지원하기'}
      </button>
    </form>
  )
}
