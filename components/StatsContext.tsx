'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useRealtimeStats, Stats } from '@/hooks/useRealtimeStats'
import { Registration } from '@/lib/supabase'

type StatsContextType = Stats

const StatsContext = createContext<StatsContextType>({
  kidsCount: 7,
  companiesCount: 3,
  tickerItems: [],
})

export const SEED_KIDS: Registration[] = [
  { id: '1', name: '김○○', city: '서울', type: 'kid', created_at: '' },
  { id: '2', name: '이○○', city: '인천', type: 'kid', created_at: '' },
  { id: '3', name: '박○○', city: '충주', type: 'kid', created_at: '' },
  { id: '4', name: '최○○', city: '부산', type: 'kid', created_at: '' },
  { id: '5', name: '정○○', city: '서울', type: 'kid', created_at: '' },
  { id: '6', name: '윤○○', city: '강남', type: 'kid', created_at: '' },
  { id: '7', name: '장○○', city: '서초', type: 'kid', created_at: '', is_new: true },
]

export const SEED_COMPANIES: Registration[] = [
  { id: 'b1', name: '◯◯ 스낵', city: 'F&B', type: 'company', created_at: '' },
  { id: 'b2', name: '◯◯ 뷰티', city: '코스메틱', type: 'company', created_at: '' },
  { id: 'b3', name: '◯◯ 문구', city: '리빙', type: 'company', created_at: '', is_new: true },
]

export function StatsProvider({ children }: { children: ReactNode }) {
  const stats = useRealtimeStats({
    kidsCount: 7,
    companiesCount: 3,
    tickerItems: [...SEED_KIDS, ...SEED_COMPANIES],
  })

  return (
    <StatsContext.Provider value={stats}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  return useContext(StatsContext)
}
