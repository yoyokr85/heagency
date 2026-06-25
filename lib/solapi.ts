// 솔라피 SMS — 인모아 패턴 포팅. env 3종 없으면 dry-run(콘솔 로그).
// 인모아와 같은 계정·발신번호 env 를 그대로 쓰면 실발송.

type SolapiConfig = { apiKey: string; apiSecret: string; sender: string }

export function getSolapiConfig(): SolapiConfig | null {
  const apiKey = process.env.SOLAPI_API_KEY
  const apiSecret = process.env.SOLAPI_API_SECRET
  const sender = process.env.SOLAPI_SENDER_NUMBER
  if (!apiKey || !apiSecret || !sender) return null
  return { apiKey, apiSecret, sender }
}

export type SendResult = 'sent' | 'dry_run' | 'failed'

const digits = (p: string) => p.replace(/[^0-9]/g, '')

/**
 * 정보성 SMS/LMS 발송(거래성 안내용, 광고 옵션 없음).
 * 90바이트 초과 시 솔라피 자동 LMS. 설정 없으면 dry-run. solapi는 동적 import.
 */
export async function sendInfoSms(to: string, text: string): Promise<SendResult> {
  const cfg = getSolapiConfig()
  const phone = digits(to)
  if (!cfg) {
    console.log(`[SMS dry-run] → ${phone}\n${text}`)
    return 'dry_run'
  }
  try {
    const { SolapiMessageService } = await import('solapi')
    const service = new SolapiMessageService(cfg.apiKey, cfg.apiSecret)
    await service.send({ to: phone, from: digits(cfg.sender), text })
    return 'sent'
  } catch (e) {
    console.error('[SMS 발송 실패]', (e as Error).message)
    return 'failed'
  }
}

/** 현재 KST가 야간(22:00~08:00)인지 — 야간엔 전문가 알림 SMS 보류. */
export function isQuietHoursKst(): boolean {
  const kstHour = (new Date().getUTCHours() + 9) % 24
  return kstHour >= 22 || kstHour < 8
}
