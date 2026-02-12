"use client";

import { GRADES } from "@/lib/constants";
import type { GradeLevel } from "@/lib/types";

type Props = {
  value: GradeLevel | null;
  onChange: (grade: GradeLevel) => void;
};

export function GradeSelector({ value, onChange }: Props) {
  const elementary = GRADES.filter((g) => g.group === "elementary");
  const middle = GRADES.filter((g) => g.group === "middle");

  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-foreground">
        あなたの学年は？
      </label>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted">小学生</p>
        <div className="flex flex-wrap gap-2">
          {elementary.map((grade) => (
            <button
              key={grade.value}
              type="button"
              onClick={() => onChange(grade.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                value === grade.value
                  ? "border-primary bg-primary text-white"
                  : "border-card-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-muted">中学生</p>
        <div className="flex flex-wrap gap-2">
          {middle.map((grade) => (
            <button
              key={grade.value}
              type="button"
              onClick={() => onChange(grade.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                value === grade.value
                  ? "border-primary bg-primary text-white"
                  : "border-card-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
