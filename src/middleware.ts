// Fase 1 tinha login/signup com Supabase e este middleware protegia rotas.
// Decisão do Vk (2026-07-27): esta primeira versão pública do Cooldecode não
// terá contas de usuário nem progresso individual — é um hub de conteúdo
// aberto, tipo blog. O middleware fica desativado (passthrough) para não
// depender de variáveis de ambiente do Supabase em produção. O código de
// autenticação em src/lib/supabase/ continua no repositório, só não está em
// uso, para o caso de essa decisão mudar no futuro.
import { NextResponse, type NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
