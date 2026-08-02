"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="flex-1 flex items-center justify-center px-6 py-16 text-center">
        <div className="max-w-sm">
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-2xl text-white mb-3">
            Confirme seu e-mail
          </h1>
          <p className="text-foreground-dim text-sm">
            Enviamos um link de confirmação para <strong className="text-white">{email}</strong>.
            Depois de confirmar, você já pode entrar.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] bg-accent text-white font-[family-name:var(--font-heading)] font-extrabold text-base mb-4">
            CD
          </span>
          <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-2xl text-white">
            Criar conta no Cooldecode
          </h1>
          <p className="text-foreground-dim text-sm mt-2">
            Comece sua trilha de estudos em tecnologia.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-dim">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              placeholder="voce@email.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground-dim">
              Senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              placeholder="mínimo 6 caracteres"
            />
          </div>

          {error && (
            <p className="text-accent text-xs bg-accent-soft rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white rounded-lg py-2.5 text-sm font-medium mt-2 disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground-dim mt-6">
          Já tem conta?{" "}
          <Link href="/login" className="text-accent">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
