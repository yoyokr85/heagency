// HE:A:GENCY 공통 스타일 — 랜딩(/)과 전문가 지원(/apply) 등 surface 가 공유.
// layout 의 --font-noto / --font-serif 변수를 사용.

export const AG_STYLES = `
  :root {
    --paper: #faf7f2;
    --paper-2: #f2ece1;
    --card: #fffdfa;
    --ink: #211e1a;
    --ink-soft: #565049;
    --muted: #8a8177;
    --line: #e6ded1;
    --clay: #b4623e;
    --clay-deep: #93492b;
    --espresso: #2b2420;
  }
  html, body {
    background: var(--paper) !important;
    color: var(--ink) !important;
    font-family: var(--font-noto), 'Noto Sans KR', sans-serif;
    line-height: 1.7;
  }
  body::before, body::after { display: none !important; }
  * { box-sizing: border-box; }
  .ag-serif { font-family: var(--font-serif), 'Noto Serif KR', serif; word-break: keep-all; }
  .ag-cta { transition: background .2s ease, transform .15s ease; }
  .ag-cta:hover { background: var(--clay-deep) !important; transform: translateY(-1px); }
  .ag-ghost:hover { background: var(--paper-2) !important; }
  .ag-card { transition: transform .2s ease, box-shadow .2s ease; }
  .ag-card:hover { transform: translateY(-2px); box-shadow: 0 22px 44px -30px rgba(45,36,32,0.45); }
  @keyframes agFade { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
  .ag-fade { animation: agFade .7s ease both; }

  .ag-input, .ag-select, .ag-textarea {
    width: 100%;
    padding: 13px 14px;
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 11px;
    font-size: 15px;
    color: var(--ink);
    font-family: inherit;
    line-height: 1.5;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  .ag-input:focus, .ag-select:focus, .ag-textarea:focus {
    outline: none;
    border-color: var(--clay);
    box-shadow: 0 0 0 3px rgba(180,98,62,0.12);
  }
  .ag-textarea { resize: vertical; min-height: 92px; }
  .ag-label { display: block; font-size: 13px; font-weight: 700; color: var(--ink-soft); margin: 0 0 7px; }
`
