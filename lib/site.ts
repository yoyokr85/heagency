// 사이트 절대 URL (SMS 링크용). env 우선, 없으면 운영 도메인.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://heagency.sssgroup.kr'
).replace(/\/$/, '')

export const CONTACT_EMAIL = 'inmoa.team@gmail.com'
export const BRAND = 'HE:A:GENCY'
