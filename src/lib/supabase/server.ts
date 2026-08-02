import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente Supabase para uso em Server Components, Route Handlers e Server Actions.
// Precisa ser criado a cada requisição (não pode ser reaproveitado/global) porque
// lê os cookies da requisição atual para saber quem está logado.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll foi chamado a partir de um Server Component.
            // Pode ser ignorado se houver middleware atualizando a sessão.
          }
        },
      },
    }
  );
}
