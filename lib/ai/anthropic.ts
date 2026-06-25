import Anthropic from '@anthropic-ai/sdk'
import type { AiRequest } from './llm'

/** 공통 AiRequest → Anthropic Messages API. 텍스트 응답만 합쳐서 반환. */
export async function anthropicComplete(model: string, req: AiRequest): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY 미설정')
  const client = new Anthropic()
  const res = await client.messages.create({
    model,
    max_tokens: req.maxTokens ?? 1024,
    ...(req.system ? { system: req.system } : {}),
    messages: req.messages.map((m) => ({ role: m.role, content: m.content })),
  })
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
}
