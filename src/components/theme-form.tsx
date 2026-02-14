"use client";

import { useState } from "react";
import { CategorySelector } from "./category-selector";
import { GradeSelector } from "./grade-selector";
import { LoadingIndicator } from "./loading-indicator";
import { ThemeResultCard } from "./theme-result";
import { useThemeGeneration } from "@/hooks/use-theme-generation";
import { FREE_TEXT_MAX_LENGTH } from "@/lib/constants";
import type { GradeLevel, CategoryValue } from "@/lib/types";

export function ThemeForm() {
  const [grade, setGrade] = useState<GradeLevel | null>(null);
  const [category, setCategory] = useState<CategoryValue | null>(null);
  const [freeText, setFreeText] = useState("");

  const { streamedText, result, isLoading, error, generate, reset } =
    useThemeGeneration();

  const canSubmit = grade && category && !isLoading;

  function handleSubmit() {
    if (!grade || !category) return;
    generate({ grade, category, freeText });
  }

  function handleRegenerate() {
    if (!grade || !category) return;
    generate({ grade, category, freeText });
  }

  function handleReset() {
    setGrade(null);
    setCategory(null);
    setFreeText("");
    reset();
  }

  if (result) {
    return (
      <ThemeResultCard
        result={result}
        onRegenerate={handleRegenerate}
        onReset={handleReset}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingIndicator />
        {streamedText && (
          <div className="rounded-lg bg-card p-4">
            <p className="whitespace-pre-wrap text-sm text-muted">
              {streamedText}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GradeSelector value={grade} onChange={setGrade} />
      <CategorySelector value={category} onChange={setCategory} />

      <div className="space-y-2">
        <label
          htmlFor="free-text"
          className="block text-lg font-bold text-foreground"
        >
          好きなことや気になることはある？（自由入力）
        </label>
        <textarea
          id="free-text"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          maxLength={FREE_TEXT_MAX_LENGTH}
          placeholder="例: 虫が好き、お菓子作りに興味がある、星が気になる..."
          rows={3}
          className="w-full resize-none rounded-lg border border-card-border bg-card p-3 text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <p className="text-right text-xs text-muted">
          {freeText.length}/{FREE_TEXT_MAX_LENGTH}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-error/30 bg-red-50 p-4 text-sm text-error">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full rounded-xl bg-accent py-4 text-lg font-bold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        テーマを提案してもらう！
      </button>
    </div>
  );
}
