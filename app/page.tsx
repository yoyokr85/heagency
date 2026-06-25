import type { CSSProperties } from 'react'
import ConsultForm from './ConsultForm'
import { AG_STYLES } from '../lib/styles'

const HAERIBO_DM = 'https://www.instagram.com/haeribo__'
const styles = AG_STYLES

const wrap: CSSProperties = {
  maxWidth: 680,
  margin: '0 auto',
  padding: '0 22px 80px',
}

const sectionTag: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '1.5px',
  color: 'var(--clay)',
}

const PAINS = [
  '광고는 해야 할 것 같은데, 뭐부터 어떻게 시작할지 모르겠다',
  '영상을 맡겨봤지만 "예뻐 보이기만" 하고 문의로 이어지진 않았다',
  '내 분야의 실력과 신뢰를 말로 풀어줄 사람이 없다',
]

const EDGES = [
  {
    t: '설득 구조(VSL) 설계',
    d: '보는 사람이 "연락하게" 만드는 영상 구조부터 짭니다. 촬영·편집은 그다음입니다.',
  },
  {
    t: '브랜드 말투 설계',
    d: '당신 분야의 신뢰가 묻어나는 말투와 메시지를 정의합니다. 고관여 상품일수록 언어가 전부입니다.',
  },
  {
    t: '실행은 전문가 네트워크',
    d: '전국 시공사를 조직화한 방식 그대로, 검증된 PD·편집자와 함께 안정적으로 제작합니다.',
  },
]

const SERVICES = [
  { t: '숏폼 대행', d: '방문 촬영부터 편집까지. 꾸준히 쌓여 자산이 되는 숏폼 콘텐츠 운영.' },
  { t: '전문직 유튜브 대행', d: '기획·촬영·편집 풀패키지로 굴리는 전문직 유튜브 채널.' },
  { t: '블로그 마케팅', d: '검색에서 신뢰를 만드는 병원·피트니스 특화 블로그 운영.' },
  { t: '브랜드·설득 컨설팅', d: '퍼스널 브랜딩 방향과 설득 구조를 함께 설계하는 컨설팅.' },
]

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

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
          <span style={{ fontWeight: 900, letterSpacing: '0.5px', color: 'var(--espresso)' }}>
            HE<span style={{ color: 'var(--clay)' }}>:</span>A
            <span style={{ color: 'var(--clay)' }}>:</span>GENCY
            <sup style={{ fontSize: 9, marginLeft: 1 }}>™</sup>
          </span>
          <a href="#consult" style={{ color: 'var(--clay)', fontWeight: 700, textDecoration: 'none' }}>
            무료 상담 →
          </a>
        </div>
      </header>

      <main style={wrap}>
        {/* HERO */}
        <section className="ag-fade" style={{ paddingTop: 60, textAlign: 'center' }}>
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
            ● 부산 전문직 전문 광고·마케팅 에이전시
          </span>

          <h1
            className="ag-serif"
            style={{ fontSize: 37, fontWeight: 900, lineHeight: 1.34, margin: '26px 0 0' }}
          >
            촬영팀은 많지만,
            <br />
            <span style={{ color: 'var(--clay)' }}>설득의 공식</span>을 가진
            <br />
            팀은 드뭅니다.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              margin: '24px auto 0',
              maxWidth: 500,
            }}
          >
            <strong style={{ color: 'var(--ink)' }}>HE:A:GENCY</strong>는 의사·변호사·원장님처럼
            “실력은 확실한데 알리는 게 어려운” 전문직을 위한 광고 에이전시입니다. 단순 촬영·편집이
            아니라, 고관여 상품을 파는 <strong style={{ color: 'var(--ink)' }}>설득 구조와 브랜드 언어</strong>를
            설계합니다.
          </p>

          <a
            className="ag-cta"
            href="#consult"
            style={{
              display: 'inline-block',
              marginTop: 30,
              padding: '15px 30px',
              background: 'var(--clay)',
              color: '#fff',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: 'none',
            }}
          >
            무료 상담 신청하기 →
          </a>
        </section>

        {/* PAIN */}
        <section style={{ marginTop: 64 }}>
          <div style={sectionTag}>이런 고민, 익숙하시죠?</div>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 12 }}>
            {PAINS.map((p) => (
              <li
                key={p}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  fontSize: 15.5,
                  color: 'var(--ink)',
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  padding: '16px 18px',
                }}
              >
                <span style={{ color: 'var(--clay)', fontWeight: 900, lineHeight: 1.5 }}>“</span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* EDGE */}
        <section style={{ marginTop: 64 }}>
          <div style={sectionTag}>촬영팀과 언어 공식은 다릅니다</div>
          <h2 className="ag-serif" style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.4, margin: '12px 0 0' }}>
            설득 마케팅을 배운 대표와
            <br />
            안 배운 대표의 차이.
          </h2>
          <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
            {EDGES.map((e, i) => (
              <div
                key={e.t}
                className="ag-card"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: '22px 22px',
                }}
              >
                <div
                  className="ag-serif"
                  style={{ fontSize: 14, fontWeight: 900, color: 'var(--clay)', marginBottom: 8 }}
                >
                  0{i + 1}
                </div>
                <div className="ag-serif" style={{ fontSize: 19, fontWeight: 900, color: 'var(--espresso)' }}>
                  {e.t}
                </div>
                <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: '10px 0 0' }}>{e.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ marginTop: 64 }}>
          <div style={sectionTag}>이렇게 도와드립니다</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginTop: 18,
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.t}
                className="ag-card"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: '20px 18px',
                }}
              >
                <div className="ag-serif" style={{ fontSize: 17, fontWeight: 900, color: 'var(--espresso)' }}>
                  {s.t}
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '9px 0 0' }}>{s.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', margin: '18px 0 0' }}>
            상품·업종마다 다르기에 가격은 <strong style={{ color: 'var(--ink-soft)' }}>상담 후 맞춤 견적</strong>으로 안내드립니다.
          </p>
        </section>

        {/* WHY US */}
        <section
          style={{
            marginTop: 64,
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            borderRadius: 20,
            padding: '34px 28px',
          }}
        >
          <div style={sectionTag}>왜 HE:A:GENCY인가</div>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 14 }}>
            {[
              ['30년 개발 · 17년 광고 사업 경험의 대표', '기술과 마케팅을 모두 아는 사람이 설득 구조를 설계합니다.'],
              ['전국 인테리어 매칭 플랫폼 “인모아”를 만든 팀', '실제로 플랫폼을 굴려본 팀이 당신의 채널을 운영합니다.'],
              ['직접 하지 않고 “조직화”해 규모를 만든 경험', '검증된 PD·편집자 네트워크로 품질과 납기를 동시에 잡습니다.'],
            ].map(([t, d]) => (
              <li key={t} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--clay)', fontWeight: 900 }}>✓</span>
                <span>
                  <strong style={{ color: 'var(--ink)', fontSize: 15 }}>{t}</strong>
                  <span style={{ display: 'block', fontSize: 14, color: 'var(--ink-soft)', marginTop: 3 }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* CONSULT FORM */}
        <section id="consult" style={{ marginTop: 64, scrollMarginTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={sectionTag}>무료 상담 신청</div>
            <h2 className="ag-serif" style={{ fontSize: 27, fontWeight: 900, lineHeight: 1.4, margin: '12px 0 0' }}>
              부산에서 가장 잘 나가는
              <br />
              전문직 광고, 여기서 시작합니다.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '14px auto 0', maxWidth: 440 }}>
              연락처를 남겨주시면 영업일 기준 1일 내로 연락드려요. 부담 없이 현재 상황만 알려주세요.
            </p>
          </div>
          <div
            style={{
              marginTop: 26,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '0 18px 40px -28px rgba(45,36,32,0.4)',
            }}
          >
            <ConsultForm />
          </div>
        </section>

        {/* TALENT */}
        <section
          style={{
            marginTop: 40,
            padding: '22px 24px',
            border: '1px dashed var(--line)',
            borderRadius: 16,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--ink-soft)',
          }}
        >
          혹시 영상을 만드는 분이신가요? 부산 <strong style={{ color: 'var(--ink)' }}>PD·편집자·마케터</strong>
          합류를 상시 모집합니다.{' '}
          <a href="/apply" style={{ color: 'var(--clay)', fontWeight: 700, textDecoration: 'none' }}>
            전문가 지원하기 →
          </a>
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
          <div style={{ fontWeight: 900, color: 'var(--ink-soft)', letterSpacing: '0.5px' }}>HE:A:GENCY™</div>
          <div>해리보 · 대표 김해온 · 사업자등록번호 864-09-02818</div>
          <div>부산광역시 해운대구 좌동순환로433번길 30, 103동 3103호</div>
          <div>
            문의 inmoa.team@gmail.com ·{' '}
            <a href={HAERIBO_DM} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>
              @haeribo__
            </a>
          </div>
          <div style={{ marginTop: 8 }}>© 2026 HE:A:GENCY (해리보). All rights reserved.</div>
        </footer>
      </main>
    </>
  )
}
