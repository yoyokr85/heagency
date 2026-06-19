import type { CSSProperties } from 'react'

const INMOA_URL = 'https://apt.inmoa.kr'
const HAERIBO_DM = 'https://www.instagram.com/haeribo__'

const styles = `
  :root {
    --paper: #faf7f2;
    --paper-2: #f2ece1;
    --card: #fffdfa;
    --ink: #211e1a;
    --ink-soft: #565049;
    --muted: #8a8177;
    --line: #e6ded1;
    --clay: #b4623e;
    --clay-deep: #93492b;
    --espresso: #2b2420;
  }
  html, body {
    background: var(--paper) !important;
    color: var(--ink) !important;
    font-family: var(--font-noto), 'Noto Sans KR', sans-serif;
    line-height: 1.7;
  }
  body::before, body::after { display: none !important; }
  .ad-serif { font-family: var(--font-serif), 'Noto Serif KR', serif; word-break: keep-all; }
  .ad-cta:hover { background: var(--clay-deep) !important; }
  .ad-ghost:hover { background: var(--paper-2) !important; }
  @keyframes adFade { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
  .ad-fade { animation: adFade .7s ease both; }
`

const wrap: CSSProperties = {
  maxWidth: 640,
  margin: '0 auto',
  padding: '0 22px 72px',
}

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header
        style={{
          borderBottom: '1px solid var(--line)',
          background: 'var(--paper)',
        }}
      >
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
          <span style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A
            <span style={{ color: 'var(--clay)' }}>:</span>GENCY
            <sup style={{ fontSize: 9, marginLeft: 1 }}>™</sup>
          </span>
          <span style={{ color: 'var(--muted)', letterSpacing: '1px' }}>광고 안내</span>
        </div>
      </header>

      <main style={wrap}>
        {/* HERO */}
        <section className="ad-fade" style={{ paddingTop: 64, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: 'var(--clay)',
              border: '1px solid var(--line)',
              borderRadius: 999,
              padding: '7px 16px',
              background: 'var(--card)',
            }}
          >
            ● 이 광고 자리는 낙찰 완료되었습니다
          </span>

          <h1
            className="ad-serif"
            style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.32, margin: '26px 0 0' }}
          >
            이 자리,
            <br />
            <span style={{ color: 'var(--clay)' }}>3,300만원</span>에<br />
            주식회사 인모아가
            <br />
            가져갔습니다.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              margin: '24px auto 0',
              maxWidth: 460,
            }}
          >
            열한 살 김해온이 만든 세계 최초 아이 사업가 교육 IP,
            <strong style={{ color: 'var(--ink)' }}> HE:A:GENCY</strong>. 그 광고 자리가
            공개 입찰에 부쳐졌고, 최종 <strong style={{ color: 'var(--ink)' }}>3,300만원</strong>에{' '}
            <strong style={{ color: 'var(--ink)' }}>주식회사 인모아</strong>가 낙찰했습니다.
          </p>
        </section>

        {/* DEAL STATS */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            overflow: 'hidden',
            margin: '40px 0',
          }}
        >
          {[
            { n: '3,300만원', l: '최종 낙찰가' },
            { n: '주식회사 인모아', l: '낙찰 광고주' },
            { n: '인테리어', l: '광고 카테고리' },
          ].map((s) => (
            <div key={s.l} style={{ background: 'var(--card)', padding: '22px 10px', textAlign: 'center' }}>
              <div className="ad-serif" style={{ fontSize: 17, fontWeight: 900, color: 'var(--espresso)' }}>
                {s.n}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </section>

        {/* INMOA AD */}
        <section
          style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 20,
            padding: '36px 28px',
            boxShadow: '0 18px 40px -28px rgba(45,36,32,0.4)',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', color: 'var(--clay)' }}>
            SPONSORED · 인모아
          </div>
          <h2 className="ad-serif" style={{ fontSize: 27, fontWeight: 900, lineHeight: 1.4, margin: '14px 0 0' }}>
            우리 집 인테리어,
            <br />
            믿을 수 있는 곳과 만나는 가장 쉬운 방법.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '16px 0 0' }}>
            <strong style={{ color: 'var(--ink)' }}>인모아</strong>는 검증된 시공사와 고객을 잇는
            전국 인테리어 매칭 플랫폼입니다. 견적 비교부터 시공, 완공 후 평가까지 — 처음부터 끝까지
            투명하게.
          </p>

          <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'grid', gap: 10 }}>
            {[
              '집 정보만 입력하면 바로 받는 예상 견적',
              '신뢰점수로 가려낸 검증 시공사 매칭',
              '시공 전·후 사진으로 남기는 투명한 기록',
            ].map((f) => (
              <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14.5, color: 'var(--ink)' }}>
                <span style={{ color: 'var(--clay)', fontWeight: 900 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            className="ad-cta"
            href={INMOA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: 28,
              padding: '16px 20px',
              background: 'var(--clay)',
              color: '#fff',
              textAlign: 'center',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
              transition: 'background .2s ease',
            }}
          >
            인모아 보러 가기 →
          </a>
          <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
            apt.inmoa.kr · 주식회사 인모아
          </div>
        </section>

        {/* DM INQUIRY */}
        <section
          style={{
            marginTop: 48,
            padding: '36px 28px',
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            borderRadius: 20,
            textAlign: 'center',
          }}
        >
          <h2 className="ad-serif" style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.45 }}>
            다음 광고 자리를
            <br />
            찾고 계신가요?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '14px auto 0', maxWidth: 420 }}>
            HE:A:GENCY 광고·협업 문의는 <strong style={{ color: 'var(--ink)' }}>해리보</strong>에게
            DM으로 받고 있어요. 편하게 메시지 보내주세요.
          </p>
          <a
            className="ad-ghost"
            href={HAERIBO_DM}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 24,
              padding: '14px 26px',
              background: 'var(--card)',
              color: 'var(--espresso)',
              border: '1px solid var(--espresso)',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'background .2s ease',
            }}
          >
            ✉ 해리보 인스타 DM으로 문의하기
          </a>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>@haeribo__</div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: '1px solid var(--line)',
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.9,
          }}
        >
          <div style={{ fontWeight: 900, color: 'var(--ink-soft)', letterSpacing: '0.5px' }}>
            HE:A:GENCY™
          </div>
          <div>광고주 · 주식회사 인모아 (대표 박재일)</div>
          <div>문의 inmoa.team@gmail.com</div>
          <div style={{ marginTop: 8 }}>© 2026 HE:A:GENCY. All rights reserved.</div>
        </footer>
      </main>
    </>
  )
}
