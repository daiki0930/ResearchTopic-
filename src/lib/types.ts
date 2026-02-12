export type GradeLevel =
  | "elementary-1"
  | "elementary-2"
  | "elementary-3"
  | "elementary-4"
  | "elementary-5"
  | "elementary-6"
  | "middle-1"
  | "middle-2"
  | "middle-3";

export type CategoryValue =
  | "science"
  | "social"
  | "craft"
  | "observation"
  | "cooking"
  | "it"
  | "math"
  | "art";

export type Grade = {
  value: GradeLevel;
  label: string;
  group: "elementary" | "middle";
};

export type Category = {
  value: CategoryValue;
  label: string;
  icon: string;
};

export type ThemeResult = {
  themeName: string;
  summary: string;
  difficulty: 1 | 2 | 3;
  duration: string;
  materials: string[];
  steps: string[];
  tips: string;
};

export type GenerateRequest = {
  grade: GradeLevel;
  category: CategoryValue;
  freeText: string;
};
