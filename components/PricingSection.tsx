const KID_URL = process.env.NEXT_PUBLIC_IMWEB_KID_URL || '#'

export default function PricingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Join</div>
        <h2>
          당신의 아이가<br />
          <em>합류하는 방법.</em>
        </h2>

        <div className="offer">
          <div className="kicker">HE:A:GENCY™ 1호 캠페인</div>
          <h3>참가 예치금</h3>
          <p className="hint">
            상품을 파는 게 아니에요.<br />
            한 달 안에 실행할 아이를 찾는 거예요.<br />
            그래서 모든 금액은 조건부로 돌려드려요.
          </p>
          <div className="price-row">
            <div className="price">₩335,000</div>
            <div className="price-lbl">100% 환급 가능</div>
          </div>
          <ul>
            <li>미성년자 사업자등록 완벽 가이드 PDF</li>
            <li>관할 세무서 방문 절차 · 서류 체크리스트</li>
            <li>해이전시 4단계 실천 워크북</li>
            <li>전국 해이전시 마켓 참가 우선권</li>
            <li>시드 스승 · 기업 매칭 풀 접근권</li>
          </ul>
          <div className="refund">
            <b>✦ 100% 환급 조건</b>
            <p>
              ① <strong style={{ color: '#fff' }}>1개월 이내</strong> 아이 명의 사업자등록증 발급 · 사본 제출<br />
              ② 아이 본인의 <strong style={{ color: '#fff' }}>&ldquo;해!&rdquo; 선언 영상</strong> 업로드 · 증빙<br />
              → 확인 즉시 전액 환급.
            </p>
          </div>
          <div className="number-note">
            ✦ 지금 합류하면 <strong>1,000명 한정 넘버링</strong>이 부여돼요.<br />
            이 번호는 평생 사라지지 않아요.
          </div>
          <p className="whisper">말로만 하는 사람은, 오지 않으셔도 괜찮아요 :)</p>
        </div>

        <a href={KID_URL} target="_blank" rel="noopener noreferrer" className="btn">
          내 아이 참가 신청하기 ✦
          <small>부모 동의서 포함 · 3분</small>
        </a>
      </div>
    </section>
  )
}
