'use client'

import { useEffect, useRef } from 'react'
import { useStats } from './StatsContext'

function rollCounter(el: HTMLElement) {
  const target = parseInt(el.dataset.count || '0', 10)
  const pad = parseInt(el.dataset.pad || '0', 10)
  const dur = 1400
  const start = performance.now()
  function tick(now: number) {
    const p = Math.min((now - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    const v = Math.floor(target * eased)
    el.textContent = String(v).padStart(pad, '0')
    if (p < 1) requestAnimationFrame(tick)
    else el.textContent = String(target).padStart(pad, '0')
  }
  requestAnimationFrame(tick)
}

export default function HeroSection() {
  const { kidsCount, companiesCount } = useStats()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const counters = section.querySelectorAll<HTMLElement>('.stat .n[data-count]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          rollCounter(e.target as HTMLElement)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.4 })
    counters.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      <div className="wrap">
        <div className="tick">
          <span className="d" />세계 최초 아이 사업가 교육 IP
        </div>
        <h1>
          열한 살이<br />
          일곱 달 만에<br />
          <span className="big grad">3,200만원</span>벌었어요.
        </h1>
        <p className="deck">
          그리고 지금, 이 아이를 따라 <em>서울 · 강남 · 인천 · 충주</em>에서<br />
          또래 아이들이 자기 이름의 사업자등록증을 받고 있어요.
        </p>

        <div className="vsl" role="button" aria-label="영상 재생" />
        <p className="vsl-cap">✨ 김해온의 이야기 · 약 3분</p>

        <div className="live">
          <div className="live-h"><span className="d" />LIVE · 지금 이 순간</div>
          <div className="stats">
            <div className="stat">
              <div className="n" data-count={kidsCount} data-pad="3">000</div>
              <div className="g">/ 1,000명</div>
              <div className="l">사업자등록<br />대기 아이</div>
            </div>
            <div className="stat">
              <div className="n" data-count="1" data-pad="2">00</div>
              <div className="g">시드 합류</div>
              <div className="l">함께하는<br />스승</div>
            </div>
            <div className="stat">
              <div className="n" data-count={companiesCount} data-pad="2">00</div>
              <div className="g">시드 합류</div>
              <div className="l">함께하는<br />기업</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
