# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

小中学生向けのAI自由研究課題提案アプリ。Next.js App Routerで構築し、Vercel AI SDKのストリーミングを通じてClaude 3.5 Haikuで研究テーマを生成する。

## コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド
- `npm run lint` — ESLint実行
- `npx vitest` — 全テスト実行
- `npx vitest src/lib/__tests__/prompts.test.ts` — 単一テストファイル実行

## アーキテクチャ

**技術スタック:** Next.js 16 (App Router) / React 19 / TypeScript 5 / Tailwind CSS v4 / NextAuth v5 beta / Vercel AI SDK

**パスエイリアス:** `@/*` は `./src/*` にマッピング

### ディレクトリ構成

- `src/app/` — Next.js App Routerのページ及びAPIルート
- `src/components/` — クライアントコンポーネント（全て `"use client"` 指定）
- `src/hooks/` — カスタムReactフック
- `src/lib/` — 共有ロジック（認証、プロンプト、型定義、定数）
- `src/lib/__tests__/` — Vitestテストファイル

### リクエストフロー

1. NextAuth（Google/GitHub OAuth）でユーザー認証 → `src/lib/auth.ts`
2. `ThemeForm` で学年・カテゴリ・自由テキスト（任意）を選択
3. `/api/generate` にPOSTリクエスト → `src/app/api/generate/route.ts`
4. サーバーが `@ai-sdk/anthropic` 経由でClaude 3.5 Haikuを呼び出し、レスポンスをストリーミング
5. クライアントフック `useThemeGeneration` がストリーミングされたJSONを `ThemeResult` にパース

### 主要パターン

- **AIレスポンスのストリーミング:** `/api/generate` はVercel AI SDKの `streamText()` を使用。クライアント側でストリーミングテキストからJSONをパースし、リトライロジック（最大2回、指数バックオフ）を備える
- **Tailwind v4インラインテーマ:** 設定ファイルではなく `globals.css` で `@theme inline` を使ってカスタムCSS変数を定義
- **UIテキストは全て日本語**

## 環境変数

`.env.local` に以下を設定:
- `ANTHROPIC_API_KEY` — Claude APIキー
- `NEXTAUTH_SECRET` — NextAuthシークレット
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth認証情報
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — GitHub OAuth認証情報
