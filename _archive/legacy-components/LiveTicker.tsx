'use client'

import { useStats, SEED_KIDS, SEED_COMPANIES } from './StatsContext'
import { Registration } from '@/lib/supabase'

function TickerItem({ reg, index }: { reg: Registration; index: number }) {
  const isCompany = reg.type === 'company'
  const num = String(index + 1).padStart(3, '0')
  return (
    <span className="lt-item">
      {reg.is_new && <span className="new">NEW</span>}
      {isCompany ? (
        <b style={{ color: 'var(--pink)' }}>B#{num}</b>
      ) : (
        <b>#{num}</b>
      )}
      {' '}{reg.name}{' '}
      <span className="city">· {reg.city}</span>
    </span>
  )
}

export default function LiveTicker() {
  const { kidsCount, companiesCount, tickerItems } = useStats()

  const kids = tickerItems.filter((r) => r.type === 'kid')
  const companies = tickerItems.filter((r) => r.type === 'company')

  // Use seed data as fallback for display if no DB data
  const displayKids = kids.length > 0 ? kids : SEED_KIDS
  const displayCompanies = companies.length > 0 ? companies : SEED_COMPANIES

  const allItems = [...displayKids, ...displayCompanies]
  const trackHtml = allItems.map((reg, i) => (
    <TickerItem key={reg.id + i} reg={reg} index={i} />
  ))

  const nextKid = String(kidsCount + 1).padStart(3, '0')

  return (
    <>
      <div className="live-ticker" role="status" aria-label="실시간 등록 현황">
        <div className="lt-left">
          <span className="lt-dot" />
          <span className="lt-live">LIVE</span>
        </div>
        <div className="lt-count">
          <div className="lt-num">
            <span className="cur">{String(kidsCount).padStart(3, '0')}</span>
            <span className="sep">/</span>
            <span className="tot">1,000</span>
          </div>
          <div className="lt-lbl">아이 사업가</div>
        </div>
        <div className="lt-count brand">
          <div className="lt-num">
            <span className="cur">{String(companiesCount).padStart(3, '0')}</span>
            <span className="sep">/</span>
            <span className="tot">100</span>
          </div>
          <div className="lt-lbl">응답 기업</div>
        </div>
        <div className="lt-stream">
          <div className="lt-track">
            {trackHtml}
            {trackHtml}
          </div>
        </div>
      </div>
      {/* nextKid exposed for StickyBottomNav via data attribute */}
      <span id="nextKidNum" data-val={nextKid} style={{ display: 'none' }} />
    </>
  )
}
