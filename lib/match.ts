import { supabaseAdmin } from './supabase'

export type ExpertRow = {
  id: number
  created_at: string
  name: string
  phone: string
  role: string | null
  service_types: string[] | null
  domains: string[] | null
  rating: number | null
  status: string
  portal_token: string | null
}

type LeadMatchInput = {
  domain: string | null
  service_types: string[]
}

// 서비스 커버: 전문가가 리드가 원하는 서비스 중 하나라도 가능한가. (전문가 서비스 미설정이면 전체 가능)
function serviceCovers(e: ExpertRow, lead: LeadMatchInput): boolean {
  if (!lead.service_types.length) return true
  const ours = e.service_types ?? []
  if (!ours.length) return true
  return lead.service_types.some((s) => ours.includes(s))
}

// 도메인 커버: 전문가가 해당 업종 경험이 있는가. (도메인 미설정이면 제한 없음 / 리드 업종 없으면 제한 없음)
function domainCovers(e: ExpertRow, lead: LeadMatchInput): boolean {
  if (!lead.domain) return true
  const ours = e.domains ?? []
  if (!ours.length) return true
  return ours.includes(lead.domain)
}

/**
 * 리드에 배정할 전문가 1명 선택 (인모아 pickContractor 포팅).
 * 서비스+도메인 매칭 → 진행 중 리드 적은 순(부하분산) → 평점 높은 순 → 먼저 등록된 순.
 * 매칭 없으면 전체 active 폴백(리드 미아 방지). active 전문가 없으면 null.
 */
export async function pickExpert(lead: LeadMatchInput): Promise<ExpertRow | null> {
  const sb = supabaseAdmin()
  const { data } = await sb.from('heagency_experts').select('*').eq('status', 'active')
  const active = (data ?? []) as ExpertRow[]
  if (!active.length) return null

  const eligible = active.filter((e) => serviceCovers(e, lead) && domainCovers(e, lead))
  const pool = eligible.length ? eligible : active

  // 부하: 아직 처리 중인 배정 리드 수(assigned/contacted) — 적은 곳 우선.
  const { data: leadRows } = await sb
    .from('heagency_leads')
    .select('assigned_expert_id')
    .in('status', ['assigned', 'contacted'])
  const load = new Map<number, number>()
  for (const l of leadRows ?? []) {
    const id = (l as { assigned_expert_id: number | null }).assigned_expert_id
    if (id != null) load.set(id, (load.get(id) ?? 0) + 1)
  }

  pool.sort(
    (a, b) =>
      (load.get(a.id) ?? 0) - (load.get(b.id) ?? 0) ||
      (b.rating ?? -1) - (a.rating ?? -1) ||
      (a.created_at < b.created_at ? -1 : 1)
  )
  return pool[0]
}
