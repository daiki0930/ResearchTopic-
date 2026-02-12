"use client";

import type { ThemeResult } from "@/lib/types";

type Props = {
  result: ThemeResult;
  onRegenerate: () => void;
  onReset: () => void;
};

const DIFFICULTY_LABELS: Record<number, { label: string; stars: string }> = {
  1: { label: "かんたん", stars: "★☆☆" },
  2: { label: "ふつう", stars: "★★☆" },
  3: { label: "むずかしい", stars: "★★★" },
};

export function ThemeResultCard({ result, onRegenerate, onReset }: Props) {
  const difficulty = DIFFICULTY_LABELS[result.difficulty] ?? DIFFICULTY_LABELS[2];

  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-bold text-accent">
        あなたにおすすめの自由研究！
      </h2>

      <div className="rounded-2xl border-2 border-card-border bg-card p-6 shadow-sm">
        <h3 className="mb-3 text-2xl font-bold text-foreground">
          {result.themeName}
        </h3>

        <div className="mb-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {difficulty.stars} {difficulty.label}
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {result.duration}
          </span>
        </div>

        <div className="space-y-4">
          <section>
            <h4 className="mb-1 font-bold text-foreground">概要</h4>
            <p className="text-muted">{result.summary}</p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-foreground">必要なもの</h4>
            <ul className="list-inside list-disc space-y-1 text-muted">
              {result.materials.map((material, i) => (
                <li key={i}>{material}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2 font-bold text-foreground">手順</h4>
            <ol className="space-y-2">
              {result.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg bg-amber-50 p-4">
            <h4 className="mb-1 font-bold text-accent">
              ワンポイントアドバイス
            </h4>
            <p className="text-amber-800">{result.tips}</p>
          </section>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onRegenerate}
          className="rounded-lg bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-hover"
        >
          別のテーマを提案
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-card-border px-6 py-3 font-bold text-muted transition-colors hover:bg-card"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
}
