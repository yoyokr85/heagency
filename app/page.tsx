import type { CSSProperties } from 'react'
import ConsultForm from './ConsultForm'
import { AG_STYLES } from '../lib/styles'
import { ADVERTISER_PRICING, EDITOR_REVENUE, PRICING_NOTE } from '../lib/pricing'

const styles = AG_STYLES

const wrap: CSSProperties = { maxWidth: 680, margin: '0 auto', padding: '0 22px 80px' }
const sectionTag: CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', color: 'var(--clay)' }

const PROOF = [
  { n: '3,300만원', l: '차량광고 수주' },
  { n: '380만+', l: '영상 조회수' },
  { n: '만 1년', l: '온이의 사업 여정' },
]

const EDGES = [
  {
    t: '교육이 아니라 "광고를 물어다" 줍니다',
    d: '강의만 듣고 끝나는 곳과 다릅니다. 온이의 검증된 광고 유치력으로 실제 광고주를 연결해 수익으로 잇습니다.',
  },
  {
    t: '문턱 낮은 "편집자들의 놀이터"',
    d: '팔로워 수와 무관하게 누구나 지원. 함께 만들고, 쌓고, 성장하는 크리에이터·편집자 풀입니다.',
  },
  {
    t: '포트폴리오 → 수익의 선순환',
    d: `포트폴리오 구축 단계엔 ${EDITOR_REVENUE.portfolio}부터, 광고 매칭이 되면 건별로 정산받습니다.`,
  },
]

const STEPS = [
  { n: '01', t: '지원', d: '편집자/크리에이터로 가볍게 지원해요. (팔로워·경력 무관)' },
  { n: '02', t: '포트폴리오 구축', d: `함께 작업하며 결과물을 쌓아요. 구축 단계 ${EDITOR_REVENUE.portfolio}.` },
  { n: '03', t: '광고 매칭·정산', d: '실제 광고주와 연결되어 건별로 수익을 정산받아요.' },
]

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ ...wrap, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A<span style={{ color: 'var(--clay)' }}>:</span>GENCY
            <sup style={{ fontSize: 9, marginLeft: 1 }}>™</sup>
          </span>
          <a href="/apply" style={{ color: 'var(--clay)', fontWeight: 700, textDecoration: 'none' }}>
            편집자 지원 →
          </a>
        </div>
      </header>

      <main style={wrap}>
        {/* HERO */}
        <section className="ag-fade" style={{ paddingTop: 60, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '1.2px',
              color: 'var(--clay)', border: '1px solid var(--line)', borderRadius: 999,
              padding: '7px 16px', background: 'var(--card)',
            }}
          >
            ● 편집자들의 놀이터
          </span>

          <h1 className="ag-serif" style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.32, margin: '26px 0 0' }}>
            광고를 직접
            <br />
            <span style={{ color: 'var(--clay)' }}>물어다 주는</span>
            <br />
            에이전시.
          </h1>

          <p style={{ fontSize: 16, color: 'var(--ink-soft)', margin: '24px auto 0', maxWidth: 480 }}>
            수익화가 막막한 크리에이터·편집자를 위한 <strong style={{ color: 'var(--ink)' }}>HE:A:GENCY</strong>.
            교육에 그치지 않고, 실제 광고주를 연결해 <strong style={{ color: 'var(--ink)' }}>수익</strong>까지 만듭니다.
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
            <a className="ag-cta" href="/apply" style={{ padding: '15px 28px', background: 'var(--clay)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              편집자로 지원하기 →
            </a>
            <a className="ag-ghost" href="#advertiser" style={{ padding: '15px 24px', background: 'var(--card)', color: 'var(--espresso)', border: '1px solid var(--espresso)', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              광고주세요?
            </a>
          </div>
        </section>

        {/* 온이 PROOF */}
        <section style={{ marginTop: 56 }}>
          <p style={{ ...sectionTag, textAlign: 'center', marginBottom: 14 }}>온이가 증명한 광고 유치력</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
            {PROOF.map((s) => (
              <div key={s.l} style={{ background: 'var(--card)', padding: '22px 8px', textAlign: 'center' }}>
                <div className="ag-serif" style={{ fontSize: 19, fontWeight: 900, color: 'var(--espresso)' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', margin: '12px 0 0' }}>
            11세 사업가 온이의 차량광고 프로젝트가 <strong style={{ color: 'var(--ink-soft)' }}>3,300만원</strong> 수주로 이어졌습니다.
          </p>
        </section>

        {/* EDGE */}
        <section style={{ marginTop: 60 }}>
          <div style={sectionTag}>왜 HE:A:GENCY인가</div>
          <h2 className="ag-serif" style={{ fontSize: 25, fontWeight: 900, lineHeight: 1.4, margin: '12px 0 0' }}>
            교육만 하고 끝나지
            <br />
            않습니다.
          </h2>
          <div style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            {EDGES.map((e, i) => (
              <div key={e.t} className="ag-card" style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '22px' }}>
                <div className="ag-serif" style={{ fontSize: 14, fontWeight: 900, color: 'var(--clay)', marginBottom: 8 }}>0{i + 1}</div>
                <div className="ag-serif" style={{ fontSize: 18, fontWeight: 900, color: 'var(--espresso)' }}>{e.t}</div>
                <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: '10px 0 0' }}>{e.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: 60 }}>
          <div style={sectionTag}>어떻게 작동하나요</div>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
                <div className="ag-serif" style={{ fontSize: 22, fontWeight: 900, color: 'var(--clay)', lineHeight: 1 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 900, color: 'var(--espresso)', fontSize: 16 }}>{s.t}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '5px 0 0' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 단가표 */}
        <section style={{ marginTop: 60 }}>
          <div style={sectionTag}>단가 안내</div>
          <h2 className="ag-serif" style={{ fontSize: 22, fontWeight: 900, margin: '12px 0 18px' }}>투명한 광고 단가</h2>
          <div style={{ border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
            {ADVERTISER_PRICING.map((p, i) => (
              <div key={p.service} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '16px 18px', background: 'var(--card)', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{p.service}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{p.note}</div>
                </div>
                <div className="ag-serif" style={{ fontSize: 17, fontWeight: 900, color: 'var(--clay)', whiteSpace: 'nowrap' }}>{p.price}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '14px 16px', background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 13, color: 'var(--ink-soft)' }}>
            <strong style={{ color: 'var(--ink)' }}>편집자 수익</strong> — 포트폴리오 구축 {EDITOR_REVENUE.portfolio}, {EDITOR_REVENUE.matched}.
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '10px 0 0' }}>{PRICING_NOTE}</p>
        </section>

        {/* 편집자 지원 CTA */}
        <section style={{ marginTop: 56, padding: '34px 28px', background: 'var(--espresso)', borderRadius: 20, textAlign: 'center' }}>
          <h2 className="ag-serif" style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.4, color: '#fff' }}>
            편집자들의 놀이터,
            <br />
            지금 합류하세요.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '12px auto 0', maxWidth: 380 }}>
            팔로워·경력 무관. 포트폴리오부터 함께 만들고 광고로 수익을 잇습니다.
          </p>
          <a className="ag-cta" href="/apply" style={{ display: 'inline-block', marginTop: 22, padding: '15px 30px', background: 'var(--clay)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            편집자로 지원하기 →
          </a>
        </section>

        {/* 광고주 (보조) */}
        <section id="advertiser" style={{ marginTop: 56, scrollMarginTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={sectionTag}>브랜드 · 광고주</div>
            <h2 className="ag-serif" style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.4, margin: '12px 0 0' }}>
              광고, 맡길 곳을 찾고 계신가요?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '12px auto 0', maxWidth: 420 }}>
              검증된 크리에이터·편집자 풀로 숏폼·유튜브·블로그를 제작합니다. 연락처를 남겨주시면 1일 내 연락드려요.
            </p>
          </div>
          <div style={{ marginTop: 24, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 20, padding: '28px 24px', boxShadow: '0 18px 40px -28px rgba(45,36,32,0.4)' }}>
            <ConsultForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 56, paddingTop: 28, borderTop: '1px solid var(--line)', textAlign: 'center', fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>
          <div style={{ fontWeight: 900, color: 'var(--ink-soft)', letterSpacing: '0.5px' }}>HE:A:GENCY™</div>
          <div>해리보 · 대표 김해온 · 사업자등록번호 864-09-02818</div>
          <div>부산광역시 해운대구 좌동순환로433번길 30, 103동 3103호</div>
          <div>문의 inmoa.team@gmail.com</div>
          <div style={{ marginTop: 8 }}>© 2026 HE:A:GENCY (해리보). All rights reserved.</div>
        </footer>
      </main>
    </>
  )
}
