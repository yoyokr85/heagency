import { anthropicComplete } from './anthropic'
import { geminiComplete } from './gemini'
import { getStrSetting } from '../settings'
import { DEFAULT_CHAT_MODEL, providerOf } from './models'
import type { AiRequest } from './llm'

export type { ChatMsg, AiRequest } from './llm'
export { providerOf } from './models'

const SETTING_KEY = 'ai_model_chat'

/** 상담 채팅 모델 — DB 설정(어드민) → env AI_CHAT → 코드 기본값. */
export async function chatModel(): Promise<string> {
  const fromDb = await getStrSetting(SETTING_KEY)
  if (fromDb) return fromDb
  return (process.env.AI_CHAT || '').trim() || DEFAULT_CHAT_MODEL
}

/** 어드민 표시용 — 현재 모델과 출처. */
export async function resolvedChatModel(): Promise<{ model: string; source: 'db' | 'env' | 'default' }> {
  const db = await getStrSetting(SETTING_KEY)
  if (db) return { model: db, source: 'db' }
  const env = (process.env.AI_CHAT || '').trim()
  if (env) return { model: env, source: 'env' }
  return { model: DEFAULT_CHAT_MODEL, source: 'default' }
}

/** 투트랙 호출 — 모델 prefix로 Claude/Gemini 자동 선택. */
export async function aiComplete(req: AiRequest): Promise<string> {
  const model = await chatModel()
  return providerOf(model) === 'gemini' ? geminiComplete(model, req) : anthropicComplete(model, req)
}
