'use client'

import { useState } from 'react'
import { SIDO_LIST, sigungusOf } from '../../lib/regions'

/**
 * 활동 지역 선택기 — 시/도 드롭다운 → 시군구 칩. "시도 시군구"/"시도 전체"로 정규화 저장.
 * 자유입력 대신 정규화된 값으로 저장(매칭·표기 일관성).
 */
export default function RegionPicker({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const [sido, setSido] = useState('')
  const sigungus = sido ? sigungusOf(sido) : []
  const toggle = (entry: string) =>
    onChange(value.includes(entry) ? value.filter((x) => x !== entry) : [...value, entry])

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '7px 13px',
    borderRadius: 999,
    border: `1px solid ${active ? 'var(--clay)' : 'var(--line)'}`,
    background: active ? 'var(--clay)' : 'var(--card)',
    color: active ? '#fff' : 'var(--ink-soft)',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  })

  return (
    <div>
      {value.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {value.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange(value.filter((x) => x !== r))}
              style={{ ...chip(true), display: 'inline-flex', alignItems: 'center', gap: 5 }}
            >
              {r} <span style={{ opacity: 0.7 }}>✕</span>
            </button>
          ))}
        </div>
      )}

      <select className="ag-select" value={sido} onChange={(e) => setSido(e.target.value)} style={{ maxWidth: 200 }}>
        <option value="">시 / 도 선택</option>
        {SIDO_LIST.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {sido && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          <button type="button" onClick={() => toggle(`${sido} 전체`)} style={chip(value.includes(`${sido} 전체`))}>
            {sido} 전체
          </button>
          {sigungus.map((g) => {
            const entry = `${sido} ${g}`
            return (
              <button key={g} type="button" onClick={() => toggle(entry)} style={chip(value.includes(entry))}>
                {g}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
