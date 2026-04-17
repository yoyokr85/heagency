export default function ClosingSection() {
  return (
    <>
      <div className="credit-block">
        — 이 캠페인은 <b>선사</b>가 기획했습니다.<br />
        선설사 팀 대표 · HE:A:GENCY™ 창립자<br />
        고티켓 컨설팅 · 교육 사업 운영 · 김해온의 사업 멘토(이모)
      </div>

      <section className="closing">
        <div className="dept">✦ 편집자의 편지</div>
        <h2 className="grad">
          지금,<br />
          가장 저렴한 순간이에요.
        </h2>
        <p>
          이 캠페인은 상품이 아니에요. 한 세대의 아이들이 노동 대신 실행을 배우며 자라는 장면을 남기고 싶은{' '}
          <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>
            세계 최초 아이 사업가 교육 IP
          </em>{' '}
          기록 프로젝트예요.
        </p>
        <p>
          1,000번째 사업자등록증이 나오는 날까지, 이 페이지는 매일 업데이트돼요.
          거절된 자리도, 성사된 자리도, 모두 여기에 남아요.
        </p>
        <p>
          <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>
            당신이 오늘 여기 이름을 남긴다면,<br />
            10년 후 이 페이지의 가장 앞쪽에 기록될 거예요.
          </em>
        </p>
        <div className="sig">
          선설사 팀 · 선사
          <small>HE:A:GENCY™ 기획 · 편집</small>
        </div>
      </section>

      <footer>
        <span className="ip">HE:A:GENCY™</span> · 세계 최초 아이 사업가 교육 IP<br />
        선설사 팀 · 본 캠페인은 전자상거래법에 따른 청약철회 및 환급 규정을 준수합니다.<br />
        <a href="#">이용약관</a> · <a href="#">개인정보처리방침</a> · <a href="#">문의</a>
      </footer>
    </>
  )
}
