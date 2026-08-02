# Cooldecode — App

Hub público de estudos do Cooldecode, em Next.js. Decisão de 2026-07-27: esta
primeira versão é um site aberto, tipo blog — sem contas de usuário, sem
login e sem progresso individual. Qualquer pessoa com o link vê todo o
conteúdo disponível.

Idioma: inglês é o padrão da interface, com um toggle EN/PT no topo da
página. O conteúdo das lições em si (os arquivos HTML em `public/lessons/`)
ainda está só em português — a tradução para inglês é um passo pendente.

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Não é necessário
configurar nada além disso — não há dependência de banco de dados nesta
versão.

## O que já funciona

- `/` — hub principal: trilha, IA Watch, imersões e backlog planejado, com
  toggle de idioma (EN/PT) na interface.
- `public/lessons/*.html` — as lições em si, servidas como páginas estáticas
  (o mesmo conteúdo que já existia em `lessons/` no projeto principal).

## O que existe no código mas está inativo

As páginas `/login`, `/signup`, `/dashboard` e os clientes Supabase em
`src/lib/supabase/` foram criados numa fase anterior (quando a ideia era ter
contas de usuário) e continuam no repositório, mas não estão linkadas de
lugar nenhum nem protegidas por middleware — ficaram aqui só para o caso de
essa decisão mudar no futuro. `src/middleware.ts` está em modo passthrough
(não faz nada) para o site não depender de variáveis de ambiente do
Supabase.

## Pendências conhecidas

- Traduzir o conteúdo das lições para inglês (hoje só em português),
  mantendo o toggle EN/PT em cada página.
- `npm run build` apresentou um erro de ambiente ("Bus error") no sandbox
  usado para desenvolver isso — provavelmente uma incompatibilidade do
  binário nativo do Next 16 com a virtualização ARM64 do sandbox, não
  necessariamente um bug no código. Vale confirmar rodando `npm run build`
  numa máquina real antes do deploy.
- Publicar (Vercel, Netlify ou GitHub Pages com export estático).

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) v4
