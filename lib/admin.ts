import crypto from 'crypto'

export const ADMIN_COOKIE = 'ag_admin'

// 비번 자체를 쿠키에 넣지 않고 해시 토큰만 저장. 위조하려면 비번을 알아야 함.
export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) return null
  return crypto.createHash('sha256').update(pw).digest('hex')
}

export function isAuthed(cookieValue: string | undefined): boolean {
  const token = adminToken()
  return !!token && !!cookieValue && cookieValue === token
}
