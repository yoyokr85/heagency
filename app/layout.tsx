import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HE:A:GENCY™ · 부산 전문직 전문 광고·마케팅 에이전시',
  description: '촬영팀은 많지만 설득의 공식을 가진 팀은 드뭅니다. 의사·변호사·원장님을 위한 설득 마케팅 — 숏폼·유튜브·블로그 대행과 브랜드 언어 설계. HE:A:GENCY(해리보).',
  openGraph: {
    title: 'HE:A:GENCY™ · 부산 전문직 전문 광고·마케팅 에이전시',
    description: '고관여 상품을 파는 설득 구조와 브랜드 언어를 설계합니다. 부산 전문직을 위한 광고 에이전시, HE:A:GENCY.',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
        {children}
      </body>
    </html>
  )
}
