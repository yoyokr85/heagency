import { supabaseAdmin } from './supabase'

/** 어드민 편집형 설정 읽기. 없으면 null. */
export async function getStrSetting(key: string): Promise<string | null> {
  const { data } = await supabaseAdmin()
    .from('heagency_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle()
  return data?.value ?? null
}

/** 설정 저장. 빈값이면 삭제(기본값 복귀). */
export async function setStrSetting(key: string, value: string | null): Promise<void> {
  const sb = supabaseAdmin()
  if (!value || !value.trim()) {
    await sb.from('heagency_settings').delete().eq('key', key)
    return
  }
  await sb.from('heagency_settings').upsert({ key, value: value.trim(), updated_at: new Date().toISOString() })
}
