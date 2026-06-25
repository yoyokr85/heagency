'use client'

import { useEffect, useRef } from 'react'
import { useStats } from './StatsContext'

const KIDS_TOTAL = 1000
const BRANDS_TOTAL = 100

export default function RainbowBridgeGauge() {
  const { kidsCount, companiesCount } = useStats()
  const bridgeRef = useRef<HTMLDivElement>(null)
  const kidsBarRef = useRef<HTMLDivElement>(null)
  const brandsBarRef = useRef<HTMLDivElement>(null)
  const partyFiredRef = useRef(false)

  function applyGauge(kidsPct: number, brandsPct: number) {
    const bridge = bridgeRef.current
    const kBar = kidsBarRef.current
    const bBar = brandsBarRef.current
    if (!bridge || !kBar || !bBar) return

    const kW = Math.min(kidsPct, 100) * 0.48
    const bW = Math.min(brandsPct, 100) * 0.48
    kBar.style.width = kW + '%'
    bBar.style.width = bW + '%'
    bridge.classList.remove('near', 'meet')

    if (kidsPct >= 100 && brandsPct >= 100) {
      bridge.classList.add('meet')
      if (!partyFiredRef.current) {
        setTimeout(() => window.dispatchEvent(new Event('trigger-party')), 600)
        partyFiredRef.current = true
      }
    } else if (kidsPct >= 80 && brandsPct >= 80) {
      bridge.classList.add('near')
    }
  }

  // Update gauge when counts change
  useEffect(() => {
    const kidsPct = (kidsCount / KIDS_TOTAL) * 100
    const brandsPct = (companiesCount / BRANDS_TOTAL) * 100
    applyGauge(kidsPct, brandsPct)
  }, [kidsCount, companiesCount])

  // Listen for preview-party event from demo button
  useEffect(() => {
    function handlePreview() {
      partyFiredRef.current = false
      window.dispatchEvent(new Event('reset-party'))
      applyGauge(0, 0)
      setTimeout(() => applyGauge(40, 35), 300)
      setTimeout(() => applyGauge(70, 60), 900)
      setTimeout(() => applyGauge(85, 82), 1600)
      setTimeout(() => applyGauge(100, 100), 2600)
    }
    window.addEventListener('preview-party', handlePreview)
    return () => window.removeEventListener('preview-party', handlePreview)
  }, [])

  return (
    <div className="bridge" id="bridge" ref={bridgeRef} aria-label="아이·기업 합류 게이지">
      <div className="bridge-track">
        <div className="bridge-kids" ref={kidsBarRef} />
        <div className="bridge-gap" />
        <div className="bridge-brands" ref={brandsBarRef} />
      </div>
    </div>
  )
}
