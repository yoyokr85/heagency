// HE:A:GENCY 공유 분류값 — 광고주 폼 / 전문가 지원 폼 / 어드민 / (Phase2)매칭이 모두 참조.
// 매칭 키: SERVICE_TYPES + DOMAINS

export const SERVICE_TYPES = ['숏폼', '유튜브', '블로그', '컨설팅'] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]

// 광고주 업종 = 전문가 경험 도메인 (같은 축으로 매칭)
export const DOMAINS = [
  '의사·병원',
  '변호사·법률',
  '피트니스·헬스',
  '기타 자영업·중소기업',
] as const
export type Domain = (typeof DOMAINS)[number]

export const EXPERT_ROLES = ['PD', '편집자', '마케터·블로거'] as const
export type ExpertRole = (typeof EXPERT_ROLES)[number]

export const BUDGET_TIERS = [
  '아직 미정',
  '월 50만원 이하',
  '월 50~150만원',
  '월 150~300만원',
  '월 300만원 이상',
] as const

// 들어온 값이 화이트리스트에 있는 것만 남김(서버 검증용)
export function sanitizeList(input: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(input)) return []
  return input.filter((v): v is string => typeof v === 'string' && allowed.includes(v))
}
