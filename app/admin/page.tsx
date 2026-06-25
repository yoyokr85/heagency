import type { CSSProperties } from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { AG_STYLES } from '../../lib/styles'
import { ADMIN_COOKIE, isAuthed } from '../../lib/admin'
import AdminLogin from './AdminLogin'
import AdminApps from './AdminApps'
import AdminExperts from './AdminExperts'
import AdminAiModel from './AdminAiModel'
import { resolvedChatModel } from '../../lib/ai'

export const dynamic = 'force-dynamic'

const wrap: CSSProperties = { maxWidth: 760, margin: '0 auto', padding: '0 22px 80px' }

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  )
}

function fmt(iso: string) {
  return iso.replace('T', ' ').slice(0, 16)
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const authed = isAuthed(cookieStore.get(ADMIN_COOKIE)?.value)

  if (!authed) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: AG_STYLES }} />
        <AdminLogin />
      </>
    )
  }

  const supabase = getSupabase()
  const [{ data: leads }, { data: apps }, { data: experts }] = await Promise.all([
    supabase.from('heagency_leads').select('*').order('created_at', { ascending: false }).limit(200),
    supabase
      .from('heagency_expert_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase.from('heagency_experts').select('*').order('created_at', { ascending: false }).limit(200),
  ])

  const expertName = new Map<number, string>((experts ?? []).map((e) => [e.id, e.name]))
  const aiModel = await resolvedChatModel()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AG_STYLES }} />
      <main style={{ ...wrap, paddingTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h1 className="ag-serif" style={{ fontSize: 24, fontWeight: 900, color: 'var(--espresso)' }}>
            HE:A:GENCY 관리자
          </h1>
          <a href="/admin/logout" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
            로그아웃
          </a>
        </div>

        {/* 광고주 리드 */}
        <section style={{ marginTop: 24 }}>
          <h2 className="ag-serif" style={{ fontSize: 18, fontWeight: 900, color: 'var(--clay)' }}>
            광고주 상담 신청 ({leads?.length ?? 0})
          </h2>
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {(leads ?? []).map((l) => (
              <div
                key={l.id}
                style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 14, padding: '14px 16px' }}
              >
                <div style={{ fontWeight: 900, color: 'var(--espresso)' }}>
                  {l.name} · {l.domain || '업종미정'}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 5, lineHeight: 1.8 }}>
                  <div>📞 {l.phone}</div>
                  <div>
                    서비스: {(l.service_types ?? []).join(', ') || '-'} / 예산: {l.budget || '-'}
                  </div>
                  {l.message && <div style={{ whiteSpace: 'pre-wrap' }}>💬 {l.message}</div>}
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>
                    {fmt(l.created_at)} · 상태 {l.status}
                    {l.assigned_expert_id != null && (
                      <> · 배정 <b style={{ color: 'var(--clay)' }}>{expertName.get(l.assigned_expert_id) ?? `#${l.assigned_expert_id}`}</b></>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {!leads?.length && <p style={{ color: 'var(--muted)', fontSize: 14 }}>아직 상담 신청이 없습니다.</p>}
          </div>
        </section>

        {/* 전문가 지원 */}
        <section style={{ marginTop: 36 }}>
          <h2 className="ag-serif" style={{ fontSize: 18, fontWeight: 900, color: 'var(--clay)' }}>
            전문가 지원 ({apps?.length ?? 0})
          </h2>
          <div style={{ marginTop: 12 }}>
            <AdminApps apps={apps ?? []} />
          </div>
        </section>

        {/* 전문가(매칭 대상) */}
        <section style={{ marginTop: 36 }}>
          <h2 className="ag-serif" style={{ fontSize: 18, fontWeight: 900, color: 'var(--clay)' }}>
            전문가 ({experts?.length ?? 0})
          </h2>
          <div style={{ marginTop: 12 }}>
            <AdminExperts experts={experts ?? []} />
          </div>
        </section>

        {/* AI 상담 모델 */}
        <section style={{ marginTop: 36 }}>
          <h2 className="ag-serif" style={{ fontSize: 18, fontWeight: 900, color: 'var(--clay)' }}>
            AI 상담 모델
          </h2>
          <div style={{ marginTop: 12 }}>
            <AdminAiModel current={aiModel.model} source={aiModel.source} />
          </div>
        </section>
      </main>
    </>
  )
}
