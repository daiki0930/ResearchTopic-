import type { Grade, Category } from "./types";

export const GRADES: Grade[] = [
  { value: "elementary-1", label: "小学1年", group: "elementary" },
  { value: "elementary-2", label: "小学2年", group: "elementary" },
  { value: "elementary-3", label: "小学3年", group: "elementary" },
  { value: "elementary-4", label: "小学4年", group: "elementary" },
  { value: "elementary-5", label: "小学5年", group: "elementary" },
  { value: "elementary-6", label: "小学6年", group: "elementary" },
  { value: "middle-1", label: "中学1年", group: "middle" },
  { value: "middle-2", label: "中学2年", group: "middle" },
  { value: "middle-3", label: "中学3年", group: "middle" },
];

export const CATEGORIES: Category[] = [
  { value: "science", label: "理科・実験", icon: "🔬" },
  { value: "social", label: "社会・調べ学習", icon: "🌍" },
  { value: "craft", label: "工作", icon: "✂️" },
  { value: "observation", label: "観察", icon: "🔍" },
  { value: "cooking", label: "料理", icon: "🍳" },
  { value: "it", label: "IT・プログラミング", icon: "💻" },
  { value: "math", label: "算数・数学", icon: "📐" },
  { value: "art", label: "音楽・芸術", icon: "🎨" },
];

export const GRADE_LABELS: Record<string, string> = Object.fromEntries(
  GRADES.map((g) => [g.value, g.label])
);

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label])
);

export const FREE_TEXT_MAX_LENGTH = 200;
