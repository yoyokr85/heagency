import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import ApplyForm from './ApplyForm'
import { AG_STYLES } from '../../lib/styles'

export const metadata: Metadata = {
  title: '전문가 지원 · HE:A:GENCY',
  description: 'HE:A:GENCY와 함께할 PD·편집자·마케터를 모집합니다. 부산 전문직 광고를 만드는 팀에 합류하세요.',
}

const wrap: CSSProperties = {
  maxWidth: 680,
  margin: '0 auto',
  padding: '0 22px 80px',
}

export default function ApplyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AG_STYLES }} />

      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div
          style={{
            ...wrap,
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
          }}
        >
          <a href="/" style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)', textDecoration: 'none' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A
            <span style={{ color: 'var(--clay)' }}>:</span>GENCY
            <sup style={{ fontSize: 9, marginLeft: 1 }}>™</sup>
          </a>
          <span style={{ color: 'var(--muted)', letterSpacing: '1px' }}>전문가 지원</span>
        </div>
      </header>

      <main style={wrap}>
        <section className="ag-fade" style={{ paddingTop: 56, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.2px',
              color: 'var(--clay)',
              border: '1px solid var(--line)',
              borderRadius: 999,
              padding: '7px 16px',
              background: 'var(--card)',
            }}
          >
            ● PD · 편집자 · 마케터 상시 모집
          </span>
          <h1 className="ag-serif" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.36, margin: '24px 0 0' }}>
            전문직 광고를
            <br />
            <span style={{ color: 'var(--clay)' }}>함께 만들</span> 분을 찾습니다.
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', margin: '20px auto 0', maxWidth: 480 }}>
            HE:A:GENCY는 부산 전문직(의사·변호사·원장님) 광고를 만드는 팀입니다. 촬영·편집·블로그·마케팅
            역량이 있는 분이라면 지원해 주세요. 포트폴리오 검토 후 과제·협업으로 이어집니다.
          </p>
        </section>

        <section style={{ marginTop: 30 }}>
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '0 18px 40px -28px rgba(45,36,32,0.4)',
            }}
          >
            <ApplyForm />
          </div>
        </section>

        <footer
          style={{
            marginTop: 48,
            paddingTop: 26,
            borderTop: '1px solid var(--line)',
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.9,
          }}
        >
          <a href="/" style={{ color: 'var(--clay)', fontWeight: 700, textDecoration: 'none' }}>
            ← HE:A:GENCY 홈으로
          </a>
          <div style={{ marginTop: 10 }}>해리보 · 대표 김해온 · 사업자등록번호 864-09-02818</div>
        </footer>
      </main>
    </>
  )
}
