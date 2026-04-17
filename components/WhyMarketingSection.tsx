const comparisons = [
  {
    topic: '① 시장 vs 제품',
    yes: '"고객이 뭐가 힘들지?"를 먼저 봐요',
    no: '"우리 물건 좋은데"만 봐요',
  },
  {
    topic: '② 미래 vs 오늘',
    yes: '내일을 설계해요',
    no: '오늘을 살아내느라 바빠요',
  },
  {
    topic: '③ 브랜드 vs 물건',
    yes: '이름만으로 줄 세워요',
    no: '물건 없으면 시작도 못 해요',
  },
  {
    topic: '④ 팬덤 vs 영업',
    yes: '시스템을 만들어요',
    no: '한 명씩 설득하다 지쳐요',
  },
  {
    topic: '⑤ 다름 vs 비교',
    yes: '"우리는 아예 달라요"',
    no: '"우리가 더 좋아요"',
  },
]

export default function WhyMarketingSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Why Marketing First</div>
        <h2>
          왜 아이에게<br />
          <em>마케팅부터</em> 가르치나요?
        </h2>
        <div className="why-mkt">
          <p className="lead">
            아무리 좋은 제품이 있어도, 세상에 알리지 못하면 없는 것과 같아요. 아무리 좋은 아이디어를 떠올려도,
            &lsquo;누가 쓰겠노&rsquo; 하고 자기 안에 가두면 시작조차 못 해요. 아이들은 대부분, 아이디어가 없는 게
            아니라{' '}
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>
              &lsquo;내가 세상에 닿을 수 있다&rsquo;는 감각
            </em>
            이 없어요.
          </p>

          <div className="hl">
            <q>내가 확산력이 있다는 걸 인지하는 순간, 그때부터 진짜 사업 기획이 시작돼요.</q>
            <cite>— 선사, HE:A:GENCY™ 기획자</cite>
          </div>

          <div className="cmp">
            {comparisons.map((c) => (
              <div className="cmp-row" key={c.topic}>
                <div className="topic">{c.topic}</div>
                <div className="cmp-pair">
                  <div className="cmp-cell yes">
                    <span className="lbl">아는 대표</span>
                    {c.yes}
                  </div>
                  <div className="cmp-cell no">
                    <span className="lbl">모르는 대표</span>
                    {c.no}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="outro">
            해이전시 4단계 중 절반(
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--mint)' }}>
              퍼트리기 · 연결하기
            </em>
            )이 바로 이 능력이에요. 우리 아이들은 노동이 아니라 &lsquo;내가 세상에 닿을 수 있다&rsquo;는 감각을
            먼저 배워요.
          </p>
        </div>
      </div>
    </section>
  )
}
