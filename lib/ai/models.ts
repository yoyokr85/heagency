// AI 모델 후보(서버/클라 공용 상수). 실제 선택은 DB→env→기본 (lib/ai/index.ts).
export type ModelOption = { id: string; label: string; provider: 'anthropic' | 'gemini' }

export const DEFAULT_CHAT_MODEL = 'claude-sonnet-4-6'

export const AI_MODEL_OPTIONS: ModelOption[] = [
  { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash — 고품질', provider: 'gemini' },
  { id: 'gemini-3-flash-preview', label: 'Gemini 3 Flash — 가성비', provider: 'gemini' },
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash — 안정(GA)', provider: 'gemini' },
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 — 균형', provider: 'anthropic' },
  { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 — 저가', provider: 'anthropic' },
  { id: 'claude-opus-4-8', label: 'Claude Opus 4.8 — 최고품질', provider: 'anthropic' },
]

export function providerOf(model: string): 'gemini' | 'anthropic' {
  return model.startsWith('gemini') ? 'gemini' : 'anthropic'
}

export function modelLabel(id: string): string {
  return AI_MODEL_OPTIONS.find((m) => m.id === id)?.label ?? id
}
