const PARTNER_URL = process.env.NEXT_PUBLIC_IMWEB_PARTNER_URL || '#'

const partners = [
  {
    tag: '마케팅 의뢰 ⭐',
    heroP: true,
    title: '우리 제품,\n아이 크리에이터에게 의뢰하기.',
    summary: `아이들이 "나는 아이 사업가다"라고 외쳤어요. 그 외침에 <strong style="color:#fff">응답한 첫 브랜드</strong>로 기록됩니다. 아이들은 그 제품을 자기 릴스로 소개하며 판매해요. 1,000명이 합류하면 <strong style="color:#fff">아이들이 직접 만드는 UGC 콘텐츠가 수천 편</strong> 쌓여요. 재고 리스크 없이, 아이들이 해이전시 2단계 · 퍼트리기를 실전으로 체득하는 교육 과정이에요. 기업은 그 훈련의 첫 무대를 함께 만들어주시는 분이에요.`,
    reach: `판매된 수량만큼만 정산 · 미판매 <b>전량 회수</b><br/>김해온 채널 <b>단일 영상 380만 조회 · 팔로워 +1만</b> 기반 확산<br/>"미래 세대에 응답한 첫 기업"이라는 브랜드 서사 획득`,
    cta: '마케팅 의뢰 신청',
  },
  {
    tag: '장소 파트너',
    heroP: false,
    title: '해이전시 마켓 공간',
    summary: '리테일·카페·쇼핑몰·학원·복합문화공간. 아이 셀러 1인당 가족 4~6인 동반 + 일반 관람객까지, 당일 집객 규모가 상당해요.',
    reach: `파트너십 전 기간 <b>최소 3회 공식 노출</b> · 현장 브랜드 노출 포함`,
    cta: '장소 파트너 신청',
  },
  {
    tag: '후원 기업',
    heroP: false,
    title: '캠페인 공식 후원',
    summary: '현금·리소스 후원. ESG·CSR 연계 가능.',
    reach: `조건부 집행 — 마켓 미개최 시 <b>전액 환급</b> · 제안서 즉시 수령`,
    cta: '기업 제안서 요청',
  },
  {
    tag: '시드 스승',
    heroP: false,
    title: '아이들에게 지식을 나눌 분',
    summary: '사업 경험자 · 교육자 · 크리에이터. 월 1회 이상 세션 가능하신 분.',
    reach: `캠페인 전 기간 <b>공동 크레딧</b> 기록`,
    cta: '스승으로 합류',
  },
]

export default function PartnersSection() {
  return (
    <section id="partnersSection">
      <div className="wrap">
        <div className="dept">✦ For Partners · 응답한 사람들</div>
        <h2>
          아이들이 외쳤어요.<br />
          <em>
            &ldquo;우리를 위한 사업 생태계를<br />
            함께 만듭시다.&rdquo;
          </em>
        </h2>
        <p className="lede" style={{ marginTop: '14px' }}>
          이 외침에 응답한 분들이 이 페이지 하단에 기록돼요. 네 가지 방법으로 응답할 수 있어요.
        </p>

        <div className="partners">
          {partners.map((p) => (
            <div key={p.tag} className={`partner${p.heroP ? ' hero-p' : ''}`}>
              <span className="tag">{p.tag}</span>
              <h3 style={{ whiteSpace: 'pre-line' }}>{p.title}</h3>
              <p className="sum" dangerouslySetInnerHTML={{ __html: p.summary }} />
              <div className="reach" dangerouslySetInnerHTML={{ __html: p.reach }} />
              <a href={PARTNER_URL} target="_blank" rel="noopener noreferrer" className="btn ghost">
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
