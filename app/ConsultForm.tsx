'use client'

import { useState } from 'react'
import { SERVICE_TYPES, DOMAINS, BUDGET_TIERS } from '../lib/taxonomy'

type Status = 'idle' | 'sending' | 'done' | 'error'

export default function ConsultForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [services, setServices] = useState<string[]>([])

  function toggleService(s: string) {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const domain = String(data.get('domain') || '')
    const budget = String(data.get('budget') || '')
    const message = String(data.get('message') || '').trim()
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
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, domain, service_types: services, budget, message, company }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('done')
      form.reset()
      setServices([])
    } catch {
      setError('전송에 실패했어요. 잠시 후 다시 시도하거나 @haeribo__ DM으로 문의해 주세요.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '20px 6px' }}>
        <div style={{ fontSize: 36 }}>✓</div>
        <h3 className="ag-serif" style={{ fontSize: 21, fontWeight: 900, margin: '10px 0 0', color: 'var(--espresso)' }}>
          상담 신청이 접수됐어요.
        </h3>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: '10px 0 0' }}>
          영업일 기준 1일 내로 담당자가 연락드리겠습니다. 감사합니다.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
      <div>
        <label className="ag-label" htmlFor="cf-name">이름 *</label>
        <input id="cf-name" name="name" className="ag-input" placeholder="성함" autoComplete="name" />
      </div>

      <div>
        <label className="ag-label" htmlFor="cf-phone">연락처 *</label>
        <input
          id="cf-phone"
          name="phone"
          className="ag-input"
          placeholder="010-0000-0000"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div>
        <label className="ag-label" htmlFor="cf-domain">업종</label>
        <select id="cf-domain" name="domain" className="ag-select" defaultValue={DOMAINS[0]}>
          {DOMAINS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <span className="ag-label">필요한 서비스 (복수 선택)</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVICE_TYPES.map((s) => {
            const on = services.includes(s)
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleService(s)}
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
                {on ? '✓ ' : ''}{s}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="ag-label" htmlFor="cf-budget">예상 예산 (선택)</label>
        <select id="cf-budget" name="budget" className="ag-select" defaultValue={BUDGET_TIERS[0]}>
          {BUDGET_TIERS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="ag-label" htmlFor="cf-message">문의 내용 (선택)</label>
        <textarea
          id="cf-message"
          name="message"
          className="ag-textarea"
          placeholder="현재 상황이나 궁금한 점을 자유롭게 적어주세요."
        />
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
          상담 목적의 연락처 수집·이용에 동의합니다. (제공 정보: 이름·연락처 / 보유기간: 상담 종료 후 1년)
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
        {status === 'sending' ? '전송 중…' : '무료 상담 신청하기'}
      </button>
    </form>
  )
}
