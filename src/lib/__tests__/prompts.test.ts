import { describe, it, expect } from "vitest";
import { buildSystemPrompt, buildUserPrompt } from "../prompts";

describe("buildSystemPrompt", () => {
  it("JSON形式の指定を含むこと", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("themeName");
    expect(prompt).toContain("summary");
    expect(prompt).toContain("difficulty");
    expect(prompt).toContain("materials");
    expect(prompt).toContain("steps");
    expect(prompt).toContain("tips");
  });

  it("安全性に関する指示を含むこと", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("安全");
  });
});

describe("buildUserPrompt", () => {
  it("学年とカテゴリのラベルが含まれること", () => {
    const prompt = buildUserPrompt("elementary-3", "science", "");
    expect(prompt).toContain("小学3年");
    expect(prompt).toContain("理科・実験");
  });

  it("自由テキストが含まれること", () => {
    const prompt = buildUserPrompt("middle-1", "craft", "ロボットを作りたい");
    expect(prompt).toContain("ロボットを作りたい");
  });

  it("自由テキストが空の場合、「特になし」になること", () => {
    const prompt = buildUserPrompt("elementary-1", "observation", "");
    expect(prompt).toContain("特になし");
  });

  it("空白のみの自由テキストも「特になし」になること", () => {
    const prompt = buildUserPrompt("elementary-1", "observation", "   ");
    expect(prompt).toContain("特になし");
  });
});
