const cases = [
  { emoji: '🍭', no: 'CASE 01 · 서울', name: '김해온', age: '만 10세 · 2025.04 등록', desc: '7개월 · 3,200만원. 장소와 운영자를 연결해 첫 구조를 설계했어요.' },
  { emoji: '✨', no: 'CASE 02 · 강남·서초', name: '복제 1호', age: '강남세무서 등록 완료', desc: '해온의 영상을 보고 부모와 함께 세무서에 갔어요. 동네 상가에서 운영 중.' },
  { emoji: '🌊', no: 'CASE 03 · 인천', name: '복제 2호', age: '인천세무서 등록 완료', desc: '해이전시 4단계를 스스로 따라 실행. 인천에서 캔디샵을 열었어요.' },
  { emoji: '🏔', no: 'CASE 04 · 충주', name: '복제 3호', age: '충주세무서 등록 완료', desc: '지방 소도시에서도 같은 방식이 작동했어요. 현재 운영 중.' },
]

export default function FieldReportSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Field Report</div>
        <h2>
          한 아이의 이야기가 아니에요.<br />
          이미 <em>네 도시에서</em> 움직이고 있어요.
        </h2>
        <p className="lede">
          김해온 이후, 또래 아이들이 부모의 손을 잡고 각자의 세무서로 갔어요.
          자기 이름이 적힌 사업자등록증을 받고, 각자의 작은 캔디샵을 열었어요.
        </p>
        <div className="cities">
          {cases.map((c) => (
            <div className="city" key={c.no}>
              <div className="city-img">{c.emoji}</div>
              <div className="city-meta">
                <div className="no">{c.no}</div>
                <h3>{c.name}</h3>
                <div className="age">{c.age}</div>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
