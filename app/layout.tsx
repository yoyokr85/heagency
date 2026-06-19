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
  title: 'HE:A:GENCY™ 광고 안내 · 주식회사 인모아',
  description: 'HE:A:GENCY 광고 자리는 주식회사 인모아가 낙찰했습니다. 전국 인테리어 매칭 플랫폼 인모아를 만나보세요. 광고 문의는 해리보 DM으로.',
  openGraph: {
    title: 'HE:A:GENCY™ 광고 안내 · 주식회사 인모아',
    description: '이 광고 자리는 주식회사 인모아가 낙찰했습니다. 전국 인테리어 매칭 플랫폼 인모아를 만나보세요.',
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
