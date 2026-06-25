'use client'

import { useState } from 'react'
import { AI_MODEL_OPTIONS } from '../../lib/ai/models'

const SOURCE_LABEL: Record<string, string> = {
  db: '어드민 설정',
  env: '환경변수(AI_CHAT)',
  default: '코드 기본값',
}

export default function AdminAiModel({
  current,
  source,
}: {
  current: string
  source: 'db' | 'env' | 'default'
}) {
  // db 설정이 있으면 그 값, 아니면 빈값(기본값 사용)
  const [sel, setSel] = useState(source === 'db' ? current : '')
  const [busy, setBusy] = useState(false)
  const [savedSource, setSavedSource] = useState(source)

  async function save() {
    setBusy(true)
    try {
      const res = await fetch('/api/admin/ai-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: sel }),
      })
      if (!res.ok) throw new Error('failed')
      setSavedSource(sel ? 'db' : source === 'db' ? 'env' : source)
      alert('저장됐어요. (재배포 없이 즉시 적용)')
    } catch {
      alert('저장 실패')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px' }}>
      <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 10 }}>
        현재 적용 모델: <b style={{ color: 'var(--clay)' }}>{current}</b>{' '}
        <span style={{ color: 'var(--muted)' }}>({SOURCE_LABEL[savedSource]})</span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <select className="ag-select" value={sel} onChange={(e) => setSel(e.target.value)} style={{ maxWidth: 320 }}>
          <option value="">기본값 사용 (env / 코드)</option>
          {AI_MODEL_OPTIONS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <button
          onClick={save}
          disabled={busy}
          style={{ padding: '0 18px', background: 'var(--clay)', color: '#fff', border: 'none', borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          저장
        </button>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '10px 0 0' }}>
        ※ API 키(<code>GEMINI_API_KEY</code> / <code>ANTHROPIC_API_KEY</code>)는 보안상 환경변수에 두고,
        모델 선택만 여기서 바꿉니다. 선택한 모델의 키가 없으면 상담이 실패해요.
      </p>
    </div>
  )
}
