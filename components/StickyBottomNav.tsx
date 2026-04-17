'use client'

import { useStats } from './StatsContext'

const KID_URL = process.env.NEXT_PUBLIC_IMWEB_KID_URL || '#'
const PARTNER_URL = process.env.NEXT_PUBLIC_IMWEB_PARTNER_URL || '#'

export default function StickyBottomNav() {
  const { kidsCount, companiesCount } = useStats()
  const nextNum = '#' + String(kidsCount + 1).padStart(3, '0')

  function scrollToOffer() {
    document.querySelector('.offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function scrollToPartners() {
    document.getElementById('partnersSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handlePreview() {
    window.dispatchEvent(new Event('preview-party'))
  }

  return (
    <div className="sticky">
      <button className="sticky-btn primary" onClick={scrollToOffer}>
        <span className="top-line">🧒 내 아이 참가</span>
        <small><b>{nextNum}</b> 열림</small>
      </button>
      <button className="sticky-btn demo" onClick={handlePreview}>
        <span className="top-line">🎬 축제 미리보기</span>
        <small>폭죽 <b>SHOW</b></small>
      </button>
      <button className="sticky-btn secondary" onClick={scrollToPartners}>
        <span className="top-line">🏢 기업 의뢰</span>
        <small>응답 <b>{String(companiesCount).padStart(3, '0')}</b>/100</small>
      </button>
    </div>
  )
}
