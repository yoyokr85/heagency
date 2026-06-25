import { CONTACT_EMAIL } from './site'

// 광고주가 원하는 서비스/업종을 한 줄 컨텍스트로
export function leadCtx(domain: string | null, serviceTypes: string[]): string {
  return [domain || null, serviceTypes.length ? serviceTypes.join('·') : null]
    .filter(Boolean)
    .join(' / ')
}

/** 광고주에게 보내는 상담 접수 정보성 SMS. (chatLink 있으면 AI 상담 바로 시작) */
export function buildLeadReceivedSms(name: string, ctx: string, chatLink?: string): string {
  return [
    '[HE:A:GENCY] 상담 신청이 접수되었습니다.',
    `${name}님${ctx ? `, ${ctx}` : ''}`,
    chatLink ? '아래에서 바로 상담을 시작하세요:' : '담당자가 영업일 기준 1일 내 연락드리겠습니다.',
    chatLink ?? `문의 ${CONTACT_EMAIL}`,
  ].join('\n')
}

/** 배정된 전문가에게 보내는 새 상담 알림 SMS. */
export function buildLeadAssignedSms(leadName: string, ctx: string, portalUrl: string): string {
  return [
    '[HE:A:GENCY] 새 상담이 배정되었습니다.',
    `${leadName}님${ctx ? ` · ${ctx}` : ''}`,
    '포털에서 확인하고 상담을 이어가세요:',
    portalUrl,
  ].join('\n')
}

/** 전문가 지원 접수 시 지원자에게 보내는 정보성 SMS. */
export function buildApplicationReceivedSms(name: string): string {
  return [
    '[HE:A:GENCY] 전문가 지원이 접수되었습니다.',
    `${name}님, 제출 감사합니다.`,
    '포트폴리오 검토 후 순차적으로 연락드리겠습니다.',
  ].join('\n')
}
