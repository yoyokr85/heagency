const steps = [
  { n: '1', t: '정의하기', d: '내가 풀 문제, 내가 설 무대를 내가 정해요.', q: '해온: "나는 미니 캔디샵을 열겠다."' },
  { n: '2', t: '퍼트리기', d: '세상에 외쳐요. 함께할 사람이 들을 수 있도록.', q: '해온 첫 영상 : 조회수 380만 · 팔로워 +10,000.' },
  { n: '3', t: '연결하기', d: '장소와 사람과 도구를 조합해요.', q: '판매 공간과 운영자를 연결 → 첫 매출 발생.' },
  { n: '4', t: '실행하기', d: '결과가 날 때까지 멈추지 않아요.', q: '일곱 달 · 3,200만원 · 복제 세 건.' },
]

export default function FrameworkSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Framework</div>
        <h2>
          HE:A:GENCY,<br />
          <em>네 개의 동사</em>가 전부예요.
        </h2>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <div>
                <div className="step-t">{s.t}</div>
                <div className="step-d">{s.d}</div>
                <div className="step-q">{s.q}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
