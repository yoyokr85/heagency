import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '../../../lib/admin'

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin', req.url))
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
