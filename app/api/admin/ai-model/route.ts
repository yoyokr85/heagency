import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isAuthed } from '../../../../lib/admin'
import { setStrSetting } from '../../../../lib/settings'
import { AI_MODEL_OPTIONS } from '../../../../lib/ai/models'

export async function POST(req: NextRequest) {
  if (!isAuthed(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  let body: { model?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const model = (body.model || '').trim()
  // 빈값 = 기본값 복귀. 값이 있으면 화이트리스트 검증.
  if (model && !AI_MODEL_OPTIONS.some((m) => m.id === model)) {
    return NextResponse.json({ error: 'unknown model' }, { status: 400 })
  }
  await setStrSetting('ai_model_chat', model || null)
  return NextResponse.json({ ok: true })
}
