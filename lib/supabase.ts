import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Registration = {
  id: string
  name: string
  city: string
  type: 'kid' | 'company'
  created_at: string
  is_new?: boolean
}

export type EditorLog = {
  id: string
  category: string
  content: string
  status: 'done' | 'open' | 'missed'
  created_at: string
}
