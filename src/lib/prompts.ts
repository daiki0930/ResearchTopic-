import { GRADE_LABELS, CATEGORY_LABELS } from "./constants";
import type { GradeLevel, CategoryValue } from "./types";

export function buildSystemPrompt(): string {
  return `あなたは小中学生の自由研究のテーマを提案する専門家です。
以下のルールに従ってください：

1. 対象学年に合った難易度と語彙で提案すること
2. 安全に実施できるテーマのみ提案すること（火や刃物を使う場合は保護者の同伴を明記）
3. 特別な機材や高価な材料を必要としないテーマを優先すること
4. 家庭にあるものや100円ショップで買えるもので実施できるテーマが望ましい
5. 子どもが「やってみたい！」と思えるような、わくわくする提案にすること
6. 回答は必ず以下のJSON形式のみで出力すること。JSON以外のテキストは含めないこと：

{
  "themeName": "テーマ名",
  "summary": "概要（2-3文で説明）",
  "difficulty": 1から3の数値（1:かんたん, 2:ふつう, 3:むずかしい）,
  "duration": "所要時間の目安（例: 約2時間、1日〜3日）",
  "materials": ["材料1", "材料2", "材料3"],
  "steps": ["手順1", "手順2", "手順3"],
  "tips": "ワンポイントアドバイス"
}`;
}

export function buildUserPrompt(
  grade: GradeLevel,
  category: CategoryValue,
  freeText: string
): string {
  const gradeLabel = GRADE_LABELS[grade] ?? grade;
  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const interest = freeText.trim() || "特になし";

  return `学年: ${gradeLabel}
カテゴリ: ${categoryLabel}
興味・好きなこと: ${interest}

上記の条件に合った自由研究のテーマを1つ提案してください。`;
}
