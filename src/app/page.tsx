"use client";

import { useSession } from "next-auth/react";
import { Header } from "@/components/header";
import { ThemeForm } from "@/components/theme-form";
import { LoginButton } from "@/components/login-button";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        {status === "loading" && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {status === "unauthenticated" && (
          <div className="flex flex-col items-center gap-6 py-16">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                自由研究テーマ提案
              </h2>
              <p className="text-muted">
                AIがあなたにぴったりの自由研究テーマを提案します。
                <br />
                ログインして始めましょう！
              </p>
            </div>
            <LoginButton />
          </div>
        )}

        {status === "authenticated" && session && <ThemeForm />}
      </main>
    </div>
  );
}
