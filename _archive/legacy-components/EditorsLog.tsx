type LogEntry = { date: string; text: string; status: 'done' | 'open' | 'miss' | '' }
type LogBlock = { title: string; badge: string; entries: LogEntry[] }

const blocks: LogBlock[] = [
  {
    title: '🏢 기업을 찾아서',
    badge: 'LIVE',
    entries: [
      { date: '04.10', text: '시드 기업 ◯◯사 합류 확정 ✦', status: 'done' },
      { date: '04.08', text: '△△사 대표께 제안서 발송, 회신 대기', status: 'open' },
      { date: '04.05', text: '□□사 거절 — 내부 CSR 일정', status: 'miss' },
    ],
  },
  {
    title: '🎓 스승을 찾아서',
    badge: 'LIVE',
    entries: [
      { date: '04.09', text: '시드 스승 1호 합류 ✦', status: 'done' },
      { date: '04.07', text: '◇◇ 교수 미팅, 커리큘럼 검토', status: 'open' },
    ],
  },
  {
    title: '📍 마켓 장소',
    badge: 'LIVE',
    entries: [
      { date: '04.11', text: '서울 ☆☆몰 미팅, 긍정 검토', status: 'open' },
      { date: '04.06', text: '△△카페 거절 — 안전 책임 이슈', status: 'miss' },
    ],
  },
  {
    title: '🧒 아이들의 외침',
    badge: '합류 순',
    entries: [
      { date: '–', text: '곧 합류한 아이들의 영상이 이 자리에 쌓여요 ✨', status: '' },
    ],
  },
]

export default function EditorsLog() {
  return (
    <section>
      <div className="wrap">
        <div className="dept">✦ Editor&rsquo;s Log</div>
        <h2>
          우리가 어떻게 만들어가는지,<br />
          <em>숨기지 않고</em> 기록해요.
        </h2>
        <p className="lede">
          거절당한 기업도, 실패한 미팅도 이 페이지에 남겨요. 이게 우리가 아이들에게 가르치려는
          것—<em className="mint">퍼트리고, 연결하고, 실행한다</em>—의 진짜 모습이니까요.
        </p>
        <div className="journal">
          {blocks.map((b) => (
            <div className="entry" key={b.title}>
              <div className="entry-h">
                <b>{b.title}</b>
                <span>{b.badge}</span>
              </div>
              {b.entries.map((e, i) => (
                <div
                  key={i}
                  className={`log${e.status === 'done' ? ' done' : e.status === 'open' ? ' open' : e.status === 'miss' ? ' miss' : ''}`}
                >
                  <div className="d">{e.date}</div>
                  <div style={e.status === '' ? { color: 'var(--sub)', fontFamily: "'Gowun Dodum'" } : undefined}>
                    {e.text}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
