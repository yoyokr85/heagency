'use client'

import { useEffect, useRef } from 'react'

const PARTY_EMOJIS = ['🎉','🎊','✨','🎈','🎆','🎇','🌟','⭐','💫','🏆','🥳','🎁','🎀','🪅','🎪','🌈','💖','💕','🔥','👏','🙌','🎶','🦄','🍾']
const FIREWORK_COLORS = ['#ff6b9d','#ffd700','#7df9d9','#c084fc','#ff3b5c','#fff']

function spawn(parent: HTMLElement, cls: string, styles: Record<string, string>, text?: string) {
  const d = document.createElement('div')
  d.className = cls
  if (text) d.textContent = text
  Object.assign(d.style, styles)
  parent.appendChild(d)
}

function burstFirework(ov: HTMLElement, cx: number, cy: number) {
  const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
  for (let i = 0; i < 18; i++) {
    const angle = (Math.PI * 2 * i) / 18
    const dist = 80 + Math.random() * 120
    spawn(ov, 'firework', {
      left: cx + 'px', top: cy + 'px',
      background: color,
      boxShadow: `0 0 10px ${color},0 0 20px ${color}`,
      '--fx': Math.cos(angle) * dist + 'px',
      '--fy': Math.sin(angle) * dist + 'px',
      animation: 'fwBurst 1.2s ease-out forwards',
    })
  }
}

export default function CelebrationOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)

  function triggerParty() {
    const ov = overlayRef.current
    if (!ov) return
    ov.classList.add('on')

    const isMobile = window.innerWidth < 500
    const N_CONFETTI = isMobile ? 70 : 120
    const N_EMOJI = isMobile ? 45 : 80
    const N_FIREWORKS = isMobile ? 4 : 6
    const N_SIDE = isMobile ? 12 : 20

    const confColors = ['#ff6b9d','#ffd700','#7df9d9','#c084fc','#fff','#ff3b5c']
    for (let i = 0; i < N_CONFETTI; i++) {
      spawn(ov, 'confetti', {
        left: Math.random() * 100 + '%', top: '-20px',
        background: confColors[i % confColors.length],
        animationDelay: (Math.random() * 2) + 's',
        animationDuration: (2 + Math.random() * 2.5) + 's',
        borderRadius: i % 3 === 0 ? '50%' : (i % 3 === 1 ? '0' : '2px'),
        transform: `rotate(${Math.random() * 360}deg)`,
      })
    }

    for (let i = 0; i < N_EMOJI; i++) {
      const emo = PARTY_EMOJIS[Math.floor(Math.random() * PARTY_EMOJIS.length)]
      const size = isMobile ? (18 + Math.random() * 22) : (20 + Math.random() * 30)
      spawn(ov, 'emoji-rain', {
        left: Math.random() * 100 + '%', top: '0',
        fontSize: size + 'px',
        animationDelay: (Math.random() * 2.5) + 's',
        animationDuration: (2.8 + Math.random() * 2.2) + 's',
      }, emo)
    }

    const W = window.innerWidth, H = window.innerHeight
    for (let i = 0; i < N_FIREWORKS; i++) {
      setTimeout(() => burstFirework(ov, W * (0.15 + Math.random() * 0.7), H * (0.15 + Math.random() * 0.45)), 300 + i * 350)
    }

    const bigEmojis = ['🎉','🎊','🥳','🎆','🌈','🎪']
    bigEmojis.forEach((em, i) => {
      setTimeout(() => {
        spawn(ov, 'big-pop', {
          left: (15 + Math.random() * 70) + '%',
          top: (20 + Math.random() * 50) + '%',
          animationDelay: '0s',
          fontSize: isMobile ? '44px' : '60px',
        }, em)
      }, 200 + i * 280)
    })

    for (let i = 0; i < N_SIDE; i++) {
      const fromLeft = i % 2 === 0
      const emo = PARTY_EMOJIS[Math.floor(Math.random() * PARTY_EMOJIS.length)]
      spawn(ov, 'side-streak', {
        left: fromLeft ? '-5%' : '105%',
        top: (10 + Math.random() * 70) + '%',
        '--sx0': '0px', '--sy0': '0px',
        '--sx1': (fromLeft ? W * 0.9 : -(W * 0.9)) + 'px',
        '--sy1': ((Math.random() - 0.5) * 200) + 'px',
        animationDelay: (Math.random() * 1.5) + 's',
        fontSize: isMobile ? '26px' : '32px',
      }, emo)
    }
  }

  function resetParty() {
    const ov = overlayRef.current
    if (!ov) return
    ov.classList.remove('on')
    ov.querySelectorAll('.confetti,.emoji-rain,.firework,.big-pop,.side-streak').forEach((c) => c.remove())
  }

  useEffect(() => {
    window.addEventListener('trigger-party', triggerParty)
    window.addEventListener('reset-party', resetParty)
    return () => {
      window.removeEventListener('trigger-party', triggerParty)
      window.removeEventListener('reset-party', resetParty)
    }
  }, [])

  return (
    <div className="celebrate-overlay" id="celebrate" ref={overlayRef}>
      <div className="celebrate-flash" />
      <div className="celebrate-card">
        <div className="emo">🎉</div>
        <h3>축제 개막 🎆</h3>
        <p>
          아이 1,000명이 외쳤고,<br />
          기업 100곳이 응답했어요.<br />
          <strong>해이전시 마켓, 정식 오픈 🎪</strong>
        </p>
        <button className="celebrate-close" onClick={resetParty}>
          계속 둘러보기
        </button>
      </div>
    </div>
  )
}
