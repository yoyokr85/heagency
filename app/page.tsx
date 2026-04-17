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

export default function Home() {
  return (
    <StatsProvider>
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
