import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex-1 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-accent">
              Cooldecode
            </span>
            <h1 className="font-[family-name:var(--font-heading)] font-extrabold text-3xl text-white mt-1">
              Sua área de estudos
            </h1>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <p className="text-foreground-dim text-sm">
            Logado como <strong className="text-white">{user.email}</strong>.
          </p>
          <p className="text-foreground-dim text-sm mt-3">
            Este é um placeholder da Fase 1 (fundação de autenticação). As
            próximas fases vão trazer o conteúdo real das trilhas, o
            progresso por módulo e — para contas de admin — o painel de
            liberação de lições.
          </p>
        </div>
      </div>
    </main>
  );
}
