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
  title: 'HE:A:GENCY™ · 광고를 물어다 주는 에이전시',
  description: '편집자들의 놀이터. 교육에 그치지 않고 실제 광고주를 연결해 수익까지 만드는 크리에이터·편집자 에이전시. 11세 사업가 온이의 3,300만원 광고 수주에서 시작된 HE:A:GENCY.',
  openGraph: {
    title: 'HE:A:GENCY™ · 광고를 물어다 주는 에이전시',
    description: '수익화가 막막한 크리에이터·편집자를 위한 에이전시. 포트폴리오부터 광고 매칭·정산까지. 편집자들의 놀이터, HE:A:GENCY.',
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
