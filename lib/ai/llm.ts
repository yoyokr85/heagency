// 프로바이더 공통 채팅 요청 타입 (Claude/Gemini 어댑터가 각자 변환).
export type ChatMsg = { role: 'user' | 'assistant'; content: string }

export type AiRequest = {
  system?: string
  messages: ChatMsg[]
  maxTokens?: number
}
