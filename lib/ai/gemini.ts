import { GoogleGenAI } from '@google/genai'
import type { AiRequest } from './llm'

/** 공통 AiRequest → Gemini generateContent. 텍스트 응답 반환. */
export async function geminiComplete(model: string, req: AiRequest): Promise<string> {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY 미설정')
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  type GContent = { role: string; parts: { text: string }[] }
  const raw: GContent[] = req.messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
  // Gemini는 첫 턴 user + user/model 교대 요구 → 선행 model 제거 + 같은 role 연속 병합.
  const start = raw.findIndex((c) => c.role === 'user')
  const contents: GContent[] = []
  for (const c of start < 0 ? [] : raw.slice(start)) {
    const last = contents[contents.length - 1]
    if (last && last.role === c.role) last.parts.push(...c.parts)
    else contents.push({ role: c.role, parts: [...c.parts] })
  }

  const config: Record<string, unknown> = {
    maxOutputTokens: req.maxTokens ?? 1024,
    thinkingConfig: { thinkingBudget: 0 }, // Claude처럼 thinking 끔 (안 끄면 빈 응답 위험)
  }
  if (req.system) config.systemInstruction = req.system

  const res = await ai.models.generateContent({ model, contents, config })
  const text = res.text ?? ''
  if (!text.trim()) {
    const reason = res.candidates?.[0]?.finishReason ?? 'unknown'
    throw new Error(`Gemini(${model}) 빈 응답 (finishReason=${reason})`)
  }
  return text
}
