export default function ManifestoSection() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Manifesto</div>
        <h2>
          다들 말만 해요.<br />
          <em>&ldquo;이런 아이로 키우세요.&rdquo;</em>
        </h2>
        <p className="lede">
          AI 시대엔 문제 정의력이 중요하대요. 주도성이 답이래요. 연결하는 힘이 전부래요. 모두가 같은 이야기를 해요.
          그런데 <em>&ldquo;그래서 내일부터 뭘 시키면 되나요?&rdquo;</em>에 답하는 사람은 없어요.
        </p>
        <p className="lede">
          듣기만 좋은 미래. 참여할 수 없는 미래. 마지막엔 심리적 박탈감만 남는{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--pink)' }}>성공 포르노.</em>
        </p>
        <div className="bubble">
          <q>
            &ldquo;다음 시대의 가장 희귀한 능력은 지식이 아니다. 스스로 결정하고, 스스로 실행하는 에이전시(Agency)다.&rdquo;
          </q>
          <cite>— Sam Altman, OpenAI</cite>
        </div>
        <p>
          우리는 이 단어를, 한국어의 가장 단단한 동사 하나와 결합했어요. 그리고 당신 아이가{' '}
          <em className="mint">내일부터</em> 들어올 수 있는 문을 열었어요.
        </p>
        <div className="etym">
          <div className="eq">
            &ldquo;<span className="grad">해!</span>&rdquo;{' '}
            <span style={{ color: 'var(--sub)', fontSize: '18px' }}>+</span>{' '}
            Agency{' '}
            <span style={{ color: 'var(--sub)', fontSize: '18px' }}>=</span>{' '}
            <span className="grad">HE:A:GENCY</span>
            <sup style={{ fontSize: '11px', color: 'var(--sub)' }}>™</sup>
          </div>
          <small>정의하기 · 퍼트리기 · 연결하기 · 실행하기</small>
        </div>
      </div>
    </section>
  )
}
