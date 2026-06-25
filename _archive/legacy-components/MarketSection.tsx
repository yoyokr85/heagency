const pins = [
  { city: '서울', status: '✦ 장소 검토 중', active: true },
  { city: '강남·서초', status: '섭외 대기', active: false },
  { city: '인천', status: '섭외 대기', active: false },
  { city: '충주', status: '섭외 대기', active: false },
  { city: '부산', status: '섭외 대기', active: false },
  { city: '신청 도시', status: '열람 가능', active: false },
]

export default function MarketSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ 2026 Offline</div>
        <h2>
          전국 <em>해이전시 마켓.</em><br />
          아이 사업가의 첫 무대예요.
        </h2>
        <p className="lede">
          사업자등록만으로는 부족해요. 아이들은 오프라인에서 첫 손님을 만나야 해요.
          그 첫 박수가 한 아이의 인생을 바꿔요.
        </p>

        <div className="market-hero">
          <div className="mkt-tag">✦ 3대가 함께 만드는 축제</div>
          <h3>
            아이 한 명이 데뷔하면,<br />
            <span className="grad">세 세대가 축하합니다.</span>
          </h3>
          <p>
            아이 셀러 1인당 부모가 함께 오고, 손주의 첫 사업을 응원하러 할머니 할아버지가 함께 와요. 한 셀러 뒤에{' '}
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>4~6명의 가족</em>이 따라오고,
            아이 마켓을 보러 오는 손님들까지—{' '}
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>도시마다 거대한 가족 축제</em>가 됩니다.
          </p>
        </div>

        <div className="triad">
          <div className="tri"><div className="e">👋</div><div className="t">첫 손님</div><div className="s">내가 만든 걸<br />누군가가 사요</div></div>
          <div className="tri"><div className="e">💰</div><div className="t">첫 매출</div><div className="s">내 이름 계좌에<br />돈이 들어와요</div></div>
          <div className="tri"><div className="e">👏</div><div className="t">첫 박수</div><div className="s">가족이 나를<br />사업가로 봐요</div></div>
        </div>

        <div className="flea">
          <div className="flea-t">개최 예정 도시</div>
          <div className="flea-s">장소 · 물품 파트너 확정 순서대로 열려요</div>
          <div className="pins">
            {pins.map((p) => (
              <div key={p.city} className={`pin${p.active ? ' active' : ''}`}>
                <b>{p.city}</b>
                <small>{p.status}</small>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--sub)', marginTop: '14px' }}>
          ※ 부모 동반 필수 · 현장 안전관리 프로토콜 · 상해보험 포함
        </p>
      </div>
    </section>
  )
}
