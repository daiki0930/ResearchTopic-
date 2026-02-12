"use client";

import { LoginButton } from "./login-button";

export function Header() {
  return (
    <header className="border-b border-card-border bg-card px-4 py-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <h1 className="text-xl font-bold text-primary">
          自由研究テーマ提案
        </h1>
        <LoginButton />
      </div>
    </header>
  );
}
