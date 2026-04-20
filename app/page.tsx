import { StatsProvider } from '@/components/StatsContext'
import LiveTicker from '@/components/LiveTicker'
import RainbowBridgeGauge from '@/components/RainbowBridgeGauge'
import CelebrationOverlay from '@/components/CelebrationOverlay'
import HeroSection from '@/components/HeroSection'
import ManifestoSection from '@/components/ManifestoSection'
import FieldReportSection from '@/components/FieldReportSection'
import FrameworkSection from '@/components/FrameworkSection'
import WhyMarketingSection from '@/components/WhyMarketingSection'
import MarketSection from '@/components/MarketSection'
import PricingSection from '@/components/PricingSection'
import EditorsLog from '@/components/EditorsLog'
import PartnersSection from '@/components/PartnersSection'
import FAQSection from '@/components/FAQSection'
import ClosingSection from '@/components/ClosingSection'
import StickyBottomNav from '@/components/StickyBottomNav'

function PreviewBanner() {
  return (
    <div style={{
      background: 'rgba(255,215,0,0.08)',
      borderBottom: '1px solid rgba(255,215,0,0.2)',
      padding: '10px 20px',
      textAlign: 'center',
      fontSize: '13px',
      color: 'rgba(255,255,255,0.75)',
      lineHeight: '1.6',
      position: 'relative',
      zIndex: 200,
    }}>
      ✦ 현재 <strong style={{color:'#FFD700'}}>정식 오픈 전</strong> 검토 중인 사이트입니다.
    </div>
  )
}

export default function Home() {
  return (
    <StatsProvider>
      <PreviewBanner />
      <LiveTicker />
      <RainbowBridgeGauge />
      <CelebrationOverlay />

      <div className="top">
        <span className="logo">
          HE<span className="c">:</span>A<span className="c">:</span>GENCY
          <sup>™</sup>
        </span>
        <span>VOL.01 · 2026</span>
      </div>

      <HeroSection />
      <ManifestoSection />
      <FieldReportSection />
      <FrameworkSection />
      <WhyMarketingSection />
      <MarketSection />
      <PricingSection />
      <EditorsLog />
      <PartnersSection />
      <FAQSection />
      <ClosingSection />

      <StickyBottomNav />
    </StatsProvider>
  )
}
