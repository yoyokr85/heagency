import type { Metadata } from 'next'
import { Noto_Sans_KR, Gowun_Dodum } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

const gowunDodum = Gowun_Dodum({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gowun',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HE:A:GENCY™ · 세계 최초 아이 사업가 교육 IP',
  description: '열한 살이 일곱 달 만에 3,200만원 벌었어요. 당신 아이도 자기 이름의 사업자등록증을 받을 수 있어요.',
  openGraph: {
    title: 'HE:A:GENCY™ · 세계 최초 아이 사업가 교육 IP',
    description: '열한 살이 일곱 달 만에 3,200만원 벌었어요.',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${gowunDodum.variable}`}>
        {children}
      </body>
    </html>
  )
}
