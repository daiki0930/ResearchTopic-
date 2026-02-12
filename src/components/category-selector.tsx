"use client";

import { CATEGORIES } from "@/lib/constants";
import type { CategoryValue } from "@/lib/types";

type Props = {
  value: CategoryValue | null;
  onChange: (category: CategoryValue) => void;
};

export function CategorySelector({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-foreground">
        どんなジャンルに興味がある？
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange(category.value)}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-colors ${
              value === category.value
                ? "border-primary bg-blue-50 text-primary"
                : "border-card-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
