// HE:A:GENCY 단가표 — 단일 출처. 초기 "가설"(글로브 벤치마크 + 06-24 회의)이며 추후 조정.
// 광고주 단가 = 제작비 + 에이전시 수수료 포함. 편집자에게는 매칭 건별 정산.

export type AdvPrice = { service: string; price: string; note: string }

export const ADVERTISER_PRICING: AdvPrice[] = [
  { service: '숏폼 편집', price: '20만원~', note: '기획안·촬영본 제공 시 편집만' },
  { service: '숏폼 촬영+편집', price: '33만원~', note: '방문 촬영부터 편집까지' },
  { service: '롱폼 (유튜브)', price: '200만원~', note: '10분 내외 기획·촬영·편집' },
  { service: '블로그 마케팅', price: '상담', note: '병원·피트니스 특화' },
]

// 편집자/크리에이터 수익 구조
export const EDITOR_REVENUE = {
  portfolio: '건당 1만원',
  matched: '광고 매칭 시 건별 정산',
}

export const PRICING_NOTE =
  '표시가는 초기 가설이며 분량·난이도에 따라 달라집니다. 광고주 단가에는 제작비와 에이전시 수수료가 포함되고, 편집자에게는 매칭된 광고 건별로 정산됩니다.'
