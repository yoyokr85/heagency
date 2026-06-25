'use client'

import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatClient({ token, initial }: { token: string; initial: Msg[] }) {
  const [msgs, setMsgs] = useState<Msg[]>(initial)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, busy])

  async function send() {
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', content: text }])
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message: text }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || 'failed')
      setMsgs((m) => [...m, { role: 'assistant', content: j.reply }])
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: '죄송해요, 잠시 문제가 있었어요. 다시 한 번 보내주시겠어요?' },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 200 }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '11px 14px',
              borderRadius: 14,
              fontSize: 14.5,
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              background: m.role === 'user' ? 'var(--clay)' : 'var(--card)',
              color: m.role === 'user' ? '#fff' : 'var(--ink)',
              border: m.role === 'user' ? 'none' : '1px solid var(--line)',
            }}
          >
            {m.content}
          </div>
        ))}
        {busy && (
          <div style={{ alignSelf: 'flex-start', fontSize: 13, color: 'var(--muted)', padding: '4px 6px' }}>
            상담사가 입력 중…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, position: 'sticky', bottom: 12 }}>
        <input
          className="ag-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder="메시지를 입력하세요"
          disabled={busy}
        />
        <button
          className="ag-cta"
          onClick={send}
          disabled={busy || !input.trim()}
          style={{
            padding: '0 20px',
            background: 'var(--clay)',
            color: '#fff',
            border: 'none',
            borderRadius: 11,
            fontWeight: 700,
            fontSize: 15,
            cursor: busy ? 'default' : 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          전송
        </button>
      </div>
    </div>
  )
}
