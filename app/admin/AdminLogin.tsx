'use client'

import { useState } from 'react'

export default function AdminLogin() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || '로그인 실패')
      }
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 실패')
      setBusy(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: 360,
        margin: '80px auto',
        padding: '0 22px',
        display: 'grid',
        gap: 14,
      }}
    >
      <h1 className="ag-serif" style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', color: 'var(--espresso)' }}>
        HE:A:GENCY 관리자
      </h1>
      <input
        type="password"
        className="ag-input"
        placeholder="관리자 비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        autoFocus
      />
      {error && <div style={{ fontSize: 13, color: 'var(--clay-deep)', fontWeight: 700 }}>{error}</div>}
      <button
        type="submit"
        className="ag-cta"
        disabled={busy}
        style={{
          padding: '13px 20px',
          background: 'var(--clay)',
          color: '#fff',
          border: 'none',
          borderRadius: 11,
          fontWeight: 700,
          fontSize: 15,
          cursor: busy ? 'default' : 'pointer',
          opacity: busy ? 0.7 : 1,
          fontFamily: 'inherit',
        }}
      >
        {busy ? '확인 중…' : '로그인'}
      </button>
    </form>
  )
}
