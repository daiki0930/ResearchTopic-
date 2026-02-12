"use client";

import { useState, useCallback } from "react";
import type { ThemeResult, GenerateRequest } from "@/lib/types";

type GenerationState = {
  streamedText: string;
  result: ThemeResult | null;
  isLoading: boolean;
  error: string | null;
};

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 1000;

function isRetryableError(status: number): boolean {
  return status >= 500 || status === 0;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useThemeGeneration() {
  const [state, setState] = useState<GenerationState>({
    streamedText: "",
    result: null,
    isLoading: false,
    error: null,
  });

  const generate = useCallback(async (params: GenerateRequest) => {
    setState({ streamedText: "", result: null, isLoading: true, error: null });

    let lastError: string | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        await delay(BASE_DELAY_MS * Math.pow(2, attempt - 1));
        setState((prev) => ({ ...prev, streamedText: "", error: null }));
      }

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          if (!isRetryableError(response.status)) {
            const errorText = await response.text();
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: errorText || "生成に失敗しました",
            }));
            return;
          }
          lastError = `サーバーエラー (${response.status})`;
          continue;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          lastError = "レスポンスの読み取りに失敗しました";
          continue;
        }

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setState((prev) => ({ ...prev, streamedText: fullText }));
        }

        const jsonMatch = fullText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]) as ThemeResult;
            setState((prev) => ({
              ...prev,
              result: parsed,
              isLoading: false,
            }));
            return;
          } catch {
            lastError = "レスポンスの解析に失敗しました";
            continue;
          }
        } else {
          lastError = "レスポンスの形式が正しくありません";
          continue;
        }
      } catch (e) {
        lastError =
          e instanceof Error ? e.message : "予期しないエラーが発生しました";
        continue;
      }
    }

    setState((prev) => ({
      ...prev,
      isLoading: false,
      error:
        lastError ??
        "生成に失敗しました。時間をおいて再度お試しください",
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      streamedText: "",
      result: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return { ...state, generate, reset };
}
