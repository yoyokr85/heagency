import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'

// 임시 진단 라우트 — 확인 후 삭제.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || ''
  const sb = supabaseAdmin()

  const expertRes = await sb.from('heagency_experts').select('id,name').eq('portal_token', token).single()
  const expert = expertRes.data

  const allRes = await sb.from('heagency_leads').select('id,assigned_expert_id,status').limit(20)
  const filtRes = expert
    ? await sb.from('heagency_leads').select('id').eq('assigned_expert_id', expert.id)
    : { data: null, error: null }

  return NextResponse.json({
    project_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    expert,
    expert_id_type: typeof expert?.id,
    expertErr: expertRes.error?.message ?? null,
    allLeads: allRes.data,
    allLeadsErr: allRes.error?.message ?? null,
    sample_assigned_type: allRes.data?.[0] ? typeof allRes.data[0].assigned_expert_id : null,
    filteredCount: filtRes.data?.length ?? null,
    filteredErr: filtRes.error?.message ?? null,
  })
}
