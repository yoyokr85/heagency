import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isAuthed } from '../../../../lib/admin'
import { supabaseAdmin } from '../../../../lib/supabase'
import { sendInfoSms } from '../../../../lib/solapi'
import { SITE_URL, BRAND } from '../../../../lib/site'

export async function POST(req: NextRequest) {
  if (!isAuthed(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: { id?: number; action?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const id = Number(body.id)
  const map: Record<string, string> = {
    activate: 'active',
    suspend: 'suspended',
    pending: 'pending',
  }
  const status = body.action ? map[body.action] : undefined
  if (!id || !status) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const sb = supabaseAdmin()
  const { error } = await sb.from('heagency_experts').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: 'db error' }, { status: 500 })

  // 활성화 시 전문가에게 포털 링크 SMS
  if (status === 'active') {
    const { data: e } = await sb
      .from('heagency_experts')
      .select('name, phone, portal_token')
      .eq('id', id)
      .single()
    if (e?.phone && e.portal_token) {
      const text = [
        `[${BRAND}] 전문가 계정이 활성화되었습니다.`,
        `${e.name}님, 아래 포털에서 배정된 상담을 확인하세요:`,
        `${SITE_URL}/portal/${e.portal_token}`,
      ].join('\n')
      sendInfoSms(e.phone, text).catch(() => {})
    }
  }

  return NextResponse.json({ ok: true })
}
