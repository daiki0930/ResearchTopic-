import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { GRADES, CATEGORIES, FREE_TEXT_MAX_LENGTH } from "@/lib/constants";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import type { GenerateRequest } from "@/lib/types";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("認証が必要です", { status: 401 });
  }

  let body: GenerateRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("不正なリクエストです", { status: 400 });
  }

  const { grade, category, freeText } = body;

  if (!grade || !category) {
    return new Response("学年とカテゴリは必須です", { status: 400 });
  }

  if (!GRADES.some((g) => g.value === grade)) {
    return new Response("不正な学年です", { status: 400 });
  }

  if (!CATEGORIES.some((c) => c.value === category)) {
    return new Response("不正なカテゴリです", { status: 400 });
  }

  const sanitizedFreeText = (freeText ?? "").slice(0, FREE_TEXT_MAX_LENGTH);

  const result = streamText({
    model: anthropic("claude-3-5-haiku-20241022"),
    system: buildSystemPrompt(),
    prompt: buildUserPrompt(grade, category, sanitizedFreeText),
    temperature: 0.8,
  });

  return result.toTextStreamResponse();
}
