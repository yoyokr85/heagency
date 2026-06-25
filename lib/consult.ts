import { leadCtx } from './notify'

export const CONSULT_SYSTEM_BASE = `당신은 HE:A:GENCY(부산 전문직 전문 광고·마케팅 에이전시)의 AI 상담사입니다.
고객은 의사·변호사·원장 등 전문직 광고주입니다.

목표:
1) 따뜻하고 신뢰감 있는 톤으로 대화한다.
2) 고객이 처음 남긴 문의 내용을 반드시 반영해, 첫 응답에서 그 니즈를 구체적으로 언급한다.
3) 업종·마케팅 목표·현재 상황·예산대를 자연스럽게 한두 가지씩 파악한다.
4) 적합한 서비스(숏폼 대행 / 전문직 유튜브 / 블로그 마케팅 / 브랜드·설득 컨설팅)를 제안한다.
5) 구체적 금액은 "담당 전문가가 상담 후 맞춤 견적으로 안내드린다"고만 말한다(임의 가격 금지).
6) 의료광고법 등 과장·허위 표현은 피하도록 부드럽게 조언한다.

규칙: 한국어. 답변은 2~4문장으로 간결하게. 한 번에 질문은 하나만.`

type ConsultLead = {
  name: string
  domain: string | null
  service_types: string[] | null
  budget: string | null
  message: string | null
}

export function buildConsultSystem(lead: ConsultLead): string {
  const ctx = leadCtx(lead.domain, lead.service_types ?? [])
  const lines = [
    CONSULT_SYSTEM_BASE,
    '',
    `[상담 고객] ${lead.name}님${ctx ? ` · ${ctx}` : ''}${lead.budget ? ` · 예산 ${lead.budget}` : ''}`,
  ]
  if (lead.message) lines.push(`[고객이 남긴 문의 내용] ${lead.message}`)
  return lines.join('\n')
}
