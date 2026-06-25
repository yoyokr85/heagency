'use client'

import { useEffect, useState } from 'react'
import { supabase, Registration } from '@/lib/supabase'

export type Stats = {
  kidsCount: number
  companiesCount: number
  tickerItems: Registration[]
}

export function useRealtimeStats(initial: Stats): Stats {
  const [stats, setStats] = useState<Stats>(initial)

  useEffect(() => {
    // Fetch real counts on mount
    async function fetchCounts() {
      const [kidsRes, companiesRes, tickerRes] = await Promise.all([
        supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('type', 'kid'),
        supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('type', 'company'),
        supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(20),
      ])
      setStats({
        kidsCount: kidsRes.count ?? initial.kidsCount,
        companiesCount: companiesRes.count ?? initial.companiesCount,
        tickerItems: tickerRes.data ?? initial.tickerItems,
      })
    }
    fetchCounts()

    // Subscribe to real-time inserts
    const channel = supabase
      .channel('registrations-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'registrations' },
        (payload) => {
          const reg = payload.new as Registration
          setStats((prev) => ({
            kidsCount: reg.type === 'kid' ? prev.kidsCount + 1 : prev.kidsCount,
            companiesCount: reg.type === 'company' ? prev.companiesCount + 1 : prev.companiesCount,
            tickerItems: [{ ...reg, is_new: true }, ...prev.tickerItems].slice(0, 20),
          }))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return stats
}
