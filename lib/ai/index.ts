import { anthropicComplete } from './anthropic'
import { geminiComplete } from './gemini'
import type { AiRequest } from './llm'

export type { ChatMsg, AiRequest } from './llm'

// 모델 선택: env AI_CHAT (예: gemini-3-flash-preview) → 없으면 Claude 기본.
export function chatModel(): string {
  return (process.env.AI_CHAT || '').trim() || 'claude-sonnet-4-6'
}

export function providerOf(model: string): 'gemini' | 'anthropic' {
  return model.startsWith('gemini') ? 'gemini' : 'anthropic'
}

/** 투트랙 호출 — 모델 prefix로 Claude/Gemini 자동 선택. 텍스트 반환. */
export async function aiComplete(req: AiRequest): Promise<string> {
  const model = chatModel()
  return providerOf(model) === 'gemini' ? geminiComplete(model, req) : anthropicComplete(model, req)
}
