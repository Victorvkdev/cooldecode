"use client";

import { useState, useMemo } from "react";

type Lang = "en" | "pt";

// TODO(Vk): create a free account at https://formspree.io (or Buttondown),
// create a form, and replace this with your real form endpoint.
// Until then, the newsletter form below will show an error on submit —
// that's expected, it's just not wired to a real inbox yet.
const NEWSLETTER_FORM_ACTION = "https://formspree.io/f/xaqrrwro";

const t = {
  tagline: {
    en: "A personal learning blog for frontend, backend, tooling and AI — one post at a time.",
    pt: "Um blog pessoal de estudos em frontend, backend, ferramentas e IA — um post de cada vez.",
  },
  langNote: {
    en: "Every post has its own EN/PT toggle inside — pick a language once you open it.",
    pt: "Cada post tem seu próprio botão EN/PT dentro dele — escolha o idioma ao abrir.",
  },
  searchPlaceholder: { en: "Search posts...", pt: "Buscar posts..." },
  noResults: {
    en: "No posts match your search.",
    pt: "Nenhum post encontrado pra essa busca.",
  },
  mainTrack: { en: "Main track", pt: "Trilha principal" },
  aiWatch: { en: "AI Watch", pt: "IA Watch" },
  deepDives: { en: "Deep dives", pt: "Imersões" },
  comingSoon: {
    en: "More posts coming soon: Git & GitHub, other databases, AWS, more languages to watch, API integration.",
    pt: "Mais posts chegando: Git & GitHub, outros bancos de dados, AWS, outras linguagens para acompanhar, integração de APIs.",
  },
  newsletterTitle: {
    en: "Learn what AI is creating for you. Don't get lost.",
    pt: "Saiba o que a IA está criando pra você. Não fique por fora.",
  },
  newsletterDesc: {
    en: "Get notified when a new deep dive or lesson goes up. No spam, just new posts.",
    pt: "Seja avisado quando eu postar uma imersão ou lição nova. Sem spam, só posts novos.",
  },
  newsletterPlaceholder: { en: "you@email.com", pt: "voce@email.com" },
  newsletterButton: { en: "Notify me", pt: "Avisar" },
  newsletterSending: { en: "Sending...", pt: "Enviando..." },
  newsletterSuccess: {
    en: "You're on the list — thanks!",
    pt: "Você está na lista — obrigado!",
  },
  newsletterError: {
    en: "Couldn't sign up right now. Try again later.",
    pt: "Não deu pra cadastrar agora. Tenta de novo mais tarde.",
  },
} as const;

type Post = {
  category: "main" | "ai" | "deep";
  categoryLabel: { en: string; pt: string };
  title: { en: string; pt: string };
  desc: { en: string; pt: string };
  date: string;
  file: string;
};

const posts: Post[] = [
  {
    category: "main",
    categoryLabel: { en: "Week 1 · Lesson 1", pt: "Semana 1 · Lição 1" },
    title: { en: "How the web works today", pt: "Como a web funciona hoje" },
    desc: {
      en: "Client, server, build tools — and where each piece of the \"modern stack\" fits in.",
      pt: "Cliente, servidor, build tools — e onde cada peça do \"stack moderno\" entra.",
    },
    date: "2026-07-26",
    file: "01-como-a-web-funciona-hoje.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 1 · Lesson 2", pt: "Semana 1 · Lição 2" },
    title: { en: "Frontend vs Backend", pt: "Frontend vs Backend" },
    desc: {
      en: "The big picture: what runs where, and why.",
      pt: "Panorama geral: o que roda onde e por quê.",
    },
    date: "2026-07-26",
    file: "02-frontend-vs-backend.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 1 · Lesson 3", pt: "Semana 1 · Lição 3" },
    title: { en: "Plain HTML/CSS/JS vs frameworks", pt: "HTML/CSS/JS puro vs frameworks" },
    desc: {
      en: "When the extra complexity of a framework pays off — and when it doesn't.",
      pt: "Quando a complexidade extra de um framework compensa — e quando não compensa.",
    },
    date: "2026-07-27",
    file: "03-html-css-js-puro-vs-frameworks.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 1 · Extra", pt: "Semana 1 · Extra" },
    title: { en: "Module 1 — extra material", pt: "Módulo 1 — material complementar" },
    desc: {
      en: "Follow-up questions and deeper dives from week 1: SEO & rendering, Django/Rails, JSX, build tools.",
      pt: "Dúvidas e aprofundamentos da semana 1: SEO & rendering, Django/Rails, JSX, build tools.",
    },
    date: "2026-07-26",
    file: "modulo-1-complementar.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 4", pt: "Semana 2 · Lição 4" },
    title: { en: "Introduction to React", pt: "Introdução ao React" },
    desc: {
      en: "Components, JSX, props and state — the mental model behind React.",
      pt: "Componentes, JSX, props e state — o modelo mental por trás do React.",
    },
    date: "2026-07-28",
    file: "04-introducao-ao-react.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 5", pt: "Semana 2 · Lição 5" },
    title: { en: "React hooks: useState, useEffect", pt: "React hooks: useState, useEffect" },
    desc: {
      en: "What each hook solves, compared with doing it by hand in plain JS.",
      pt: "O que cada hook resolve, comparado com fazer na mão em JS puro.",
    },
    date: "2026-07-29",
    file: "05-react-hooks-usestate-useeffect.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 6", pt: "Semana 2 · Lição 6" },
    title: { en: "What Next.js is", pt: "O que é Next.js" },
    desc: {
      en: "Why almost nobody ships plain React in production, and what Next.js adds.",
      pt: "Por que quase ninguém usa React puro em produção, e o que o Next.js adiciona.",
    },
    date: "2026-07-30",
    file: "06-o-que-e-nextjs.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 7", pt: "Semana 2 · Lição 7" },
    title: { en: "App Router: Server vs Client Components", pt: "App Router: Server vs Client Components" },
    desc: {
      en: "Every component starts as a Server Component by default — what that means and when to opt into a Client Component.",
      pt: "Todo componente nasce como Server Component por padrão — o que isso significa e quando optar por um Client Component.",
    },
    date: "2026-08-03",
    file: "07-app-router-server-client-components.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 8", pt: "Semana 2 · Lição 8" },
    title: { en: "Static vs SSR vs SSG vs ISR", pt: "Static vs SSR vs SSG vs ISR" },
    desc: {
      en: "Four moments the HTML can be built — and how to pick the right one for each page.",
      pt: "Quatro momentos em que o HTML pode ser construído — e como escolher o certo pra cada página.",
    },
    date: "2026-08-04",
    file: "08-static-ssr-ssg-isr.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 9", pt: "Semana 2 · Lição 9" },
    title: { en: "Why use Vercel", pt: "Por que usar Vercel" },
    desc: {
      en: "Native Next.js integration, preview URLs, edge functions — and the honest downsides, including the metered bill.",
      pt: "Integração nativa com Next.js, preview URLs, edge functions — e as desvantagens honestas, incluindo a cobrança por uso.",
    },
    date: "2026-08-05",
    file: "09-por-que-usar-vercel.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 2 · Lesson 10", pt: "Semana 2 · Lição 10" },
    title: { en: "Why use Netlify", pt: "Por que usar Netlify" },
    desc: {
      en: "The other major \"git push to deploy\" platform — built-in forms and auth, and how it stacks up against Vercel.",
      pt: "A outra grande plataforma de \"git push pra deploy\" — formulários e auth embutidos, e como ela se compara à Vercel.",
    },
    date: "2026-08-07",
    file: "10-por-que-usar-netlify.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 3 · Lesson 11", pt: "Semana 3 · Lição 11" },
    title: { en: "SQL basics: SELECT, WHERE, JOIN", pt: "SQL básico: SELECT, WHERE, JOIN" },
    desc: {
      en: "What a query actually is, the table/row/column mental model, and how joins connect related tables.",
      pt: "O que é uma query de fato, o modelo mental de tabela/linha/coluna, e como joins conectam tabelas relacionadas.",
    },
    date: "2026-08-10",
    file: "11-o-que-e-sql-select-where-join.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 3 · Lesson 12", pt: "Semana 3 · Lição 12" },
    title: { en: "Relational vs non-relational databases", pt: "Bancos relacionais vs não-relacionais" },
    desc: {
      en: "The real trade-off between fixed-schema tables and document/key-value/wide-column/graph stores, and when each one wins.",
      pt: "O trade-off real entre tabelas de esquema fixo e bancos de documento/chave-valor/coluna larga/grafo, e quando cada um vence.",
    },
    date: "2026-08-11",
    file: "12-bancos-relacionais-vs-nao-relacionais.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 3 · Lesson 13", pt: "Semana 3 · Lição 13" },
    title: { en: "SQLite: when it fits, when it doesn't", pt: "SQLite: quando faz sentido, quando não faz" },
    desc: {
      en: "A full relational database in a single file with no server — where that shines, and exactly where the single-writer limit breaks it.",
      pt: "Um banco relacional completo num arquivo só, sem servidor — onde isso brilha, e exatamente onde o limite de escritor único quebra.",
    },
    date: "2026-08-12",
    file: "13-sqlite-quando-usar.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 3 · Lesson 14", pt: "Semana 3 · Lição 14" },
    title: { en: "Beyond SQLite: Postgres, MySQL, Turso, PlanetScale", pt: "Além do SQLite: Postgres, MySQL, Turso, PlanetScale" },
    desc: {
      en: "What to reach for once your app needs more than one writer at a time — a side-by-side of the main alternatives.",
      pt: "O que usar quando sua aplicação precisa de mais de um escritor ao mesmo tempo — uma comparação lado a lado das principais alternativas.",
    },
    date: "2026-08-13",
    file: "14-alternativas-ao-sqlite.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 3 · Lesson 15", pt: "Semana 3 · Lição 15" },
    title: { en: "Supabase: what it is, why use it", pt: "Supabase: o que é, por que usar" },
    desc: {
      en: "Managed Postgres with auth, storage, realtime and edge functions bundled in — compared against Firebase, rolling your own, and PocketBase.",
      pt: "Postgres gerenciado com auth, storage, realtime e edge functions embutidos — comparado com Firebase, fazer na mão e PocketBase.",
    },
    date: "2026-08-14",
    file: "15-supabase-o-que-e-por-que-usar.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 4 · Lesson 16", pt: "Semana 4 · Lição 16" },
    title: { en: "Comparing full stacks", pt: "Comparando stacks completas" },
    desc: {
      en: "Next.js+Vercel, Remix, Astro, SvelteKit — side by side, and how to actually pick one.",
      pt: "Next.js+Vercel, Remix, Astro, SvelteKit — lado a lado, e como escolher de verdade.",
    },
    date: "2026-08-17",
    file: "16-stacks-frontend-backend-panorama.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 4 · Lesson 17", pt: "Semana 4 · Lição 17" },
    title: { en: "Integrating Figma with Claude", pt: "Integrando o Figma com o Claude" },
    desc: {
      en: "Code Connect, the Figma MCP server, and the design-to-code flow — what it actually gives an agent, and where it breaks down.",
      pt: "Code Connect, o MCP do Figma e o fluxo design-to-code — o que isso realmente dá a um agente, e onde quebra.",
    },
    date: "2026-08-18",
    file: "17-integrando-figma-com-claude.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 4 · Lesson 18", pt: "Semana 4 · Lição 18" },
    title: { en: "From Figma to code: handoff and design tokens", pt: "Do Figma ao código: handoff e design tokens" },
    desc: {
      en: "Why redlines and screenshots stopped being enough, and how design tokens actually keep design and code in sync.",
      pt: "Por que redlines e prints deixaram de ser suficientes, e como design tokens de fato mantêm design e código sincronizados.",
    },
    date: "2026-08-19",
    file: "18-do-figma-ao-codigo-handoff-design-tokens.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 4 · Lesson 19", pt: "Semana 4 · Lição 19" },
    title: { en: "Framer: advanced prototyping and publishable components", pt: "Framer: prototipagem avançada e componentes publicáveis" },
    desc: {
      en: "A design tool that also ships to production — animation, components, and when it beats hand-written code.",
      pt: "Uma ferramenta de design que também vai pra produção — animação, componentes, e quando ela vence código escrito à mão.",
    },
    date: "2026-08-20",
    file: "19-framer-prototipagem-avancada.html",
  },
  {
    category: "main",
    categoryLabel: { en: "Week 4 · Lesson 20", pt: "Semana 4 · Lição 20" },
    title: { en: "Framer vs. traditional code", pt: "Framer vs. código tradicional" },
    desc: {
      en: "When each one wins, the hidden costs on both sides, and the hybrid pattern most real teams use.",
      pt: "Quando cada um vence, os custos ocultos dos dois lados, e o padrão híbrido que a maioria dos times usa.",
    },
    date: "2026-08-21",
    file: "20-framer-vs-codigo-tradicional.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude Opus 5", pt: "Claude Opus 5" },
    desc: {
      en: "What changes in Anthropic's new top-tier model.",
      pt: "O que muda no novo modelo mais caro da Anthropic.",
    },
    date: "2026-07-26",
    file: "ai-watch-2026-07-26-claude-opus-5.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Context window", pt: "Context window" },
    desc: {
      en: "What it is, and why 1M tokens doesn't fix everything.",
      pt: "O que é, e por que 1M tokens não resolve tudo.",
    },
    date: "2026-07-27",
    file: "ai-watch-2026-07-27-context-window.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Prompt engineering in practice", pt: "Prompt engineering na prática" },
    desc: {
      en: "What changed in 2026 with reasoning models, and what fell out of favor.",
      pt: "O que mudou em 2026 com modelos de raciocínio, e o que caiu em desuso.",
    },
    date: "2026-07-28",
    file: "ai-watch-2026-07-28-prompt-engineering-na-pratica.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "MCP's new spec", pt: "A nova spec do MCP" },
    desc: {
      en: "Model Context Protocol goes stateless — what changes and why.",
      pt: "O Model Context Protocol vira stateless — o que muda e por quê.",
    },
    date: "2026-07-29",
    file: "ai-watch-2026-07-29-mcp-2026-07-28-spec.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Industry landscape", pt: "Panorama da indústria" },
    desc: {
      en: "GPT-5.6 ships, Gemini 3.5 Pro gets delayed — mapping the July 2026 race.",
      pt: "GPT-5.6 é lançado, Gemini 3.5 Pro atrasa — o mapa da corrida em julho de 2026.",
    },
    date: "2026-07-30",
    file: "ai-watch-2026-07-30-panorama-industria.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Cowork goes mobile and web", pt: "Cowork vai para mobile e web" },
    desc: {
      en: "Anthropic expands Cowork beyond desktop, with sessions that now run remotely and keep going with no device online.",
      pt: "A Anthropic expande o Cowork além do desktop, com sessões que agora rodam remotamente e continuam mesmo sem nenhum dispositivo online.",
    },
    date: "2026-08-03",
    file: "ai-watch-2026-08-03-cowork-mobile-web.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Embeddings, explained", pt: "Embeddings, explicados" },
    desc: {
      en: "How meaning becomes math — the concept behind semantic search and RAG.",
      pt: "Como significado vira matemática — o conceito por trás da busca semântica e do RAG.",
    },
    date: "2026-08-04",
    file: "ai-watch-2026-08-04-embeddings.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: {
      en: "Model lifecycles, deprecation and pricing",
      pt: "Ciclo de vida, descontinuação e preço de modelos",
    },
    desc: {
      en: "Claude Opus 4.1 retires today and Sonnet 5's intro pricing ends Aug 31 — why model IDs are perishable infrastructure.",
      pt: "O Claude Opus 4.1 é aposentado hoje e o preço promocional do Sonnet 5 acaba em 31/8 — por que IDs de modelo são infraestrutura perecível.",
    },
    date: "2026-08-05",
    file: "ai-watch-2026-08-05-ciclo-de-vida-de-modelos.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "From prompt engineering to context engineering", pt: "De prompt engineering pra context engineering" },
    desc: {
      en: "The same skill got a more precise name in 2026 — what actually changes in practice.",
      pt: "A mesma habilidade ganhou um nome mais preciso em 2026 — o que muda na prática.",
    },
    date: "2026-08-07",
    file: "ai-watch-2026-08-07-context-engineering.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Plugins, the new unit of AI tooling", pt: "Plugins, a nova unidade de ferramentas de IA" },
    desc: {
      en: "Inside Cowork's plugin marketplace — bundling skills, slash commands and connectors into one install.",
      pt: "Por dentro do marketplace de plugins do Cowork — skills, comandos de barra e conectores numa instalação só.",
    },
    date: "2026-08-10",
    file: "ai-watch-2026-08-10-cowork-plugins-marketplace.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude's invisible watermark", pt: "A marca d'água invisível do Claude" },
    desc: {
      en: "Claude now embeds a machine-readable mark directly into generated text — how it works, and why it's not a definitive AI detector.",
      pt: "O Claude agora embute uma marca legível por máquina direto no texto gerado — como funciona, e por que não é um detector de IA definitivo.",
    },
    date: "2026-08-11",
    file: "ai-watch-2026-08-11-invisible-watermark.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude Code auto mode becomes default", pt: "Modo automático vira padrão no Claude Code" },
    desc: {
      en: "Starting Aug 14, auto mode replaces repeated approval prompts with a classifier — what that changes day to day.",
      pt: "A partir de 14/08, o modo automático troca as aprovações repetidas por um classificador — o que isso muda no dia a dia.",
    },
    date: "2026-08-12",
    file: "ai-watch-2026-08-12-claude-code-auto-mode.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude Code goes self-hosted", pt: "Claude Code ganha ambientes self-hosted" },
    desc: {
      en: "Team/Enterprise sessions can now run on your own infrastructure — execution moves, inference still doesn't.",
      pt: "Sessões Team/Enterprise agora podem rodar na sua própria infraestrutura — a execução muda de lugar, a inferência não.",
    },
    date: "2026-08-13",
    file: "ai-watch-2026-08-13-claude-code-self-hosted-environments.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "The three-week release cycle", pt: "O ciclo de três semanas" },
    desc: {
      en: "Gemini 3.7 Flash and Grok 4.6 shipped two days apart — mapping the field and what the pace itself says about the industry.",
      pt: "Gemini 3.7 Flash e Grok 4.6 saíram com dois dias de diferença — mapeando o campo e o que o próprio ritmo diz sobre a indústria.",
    },
    date: "2026-08-14",
    file: "ai-watch-2026-08-14-corrida-de-modelos-agosto-2026.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude for Government goes public beta", pt: "Claude for Government entra em beta público" },
    desc: {
      en: "FedRAMP High, tamper-proof audit logs, and the Compliance API expansion — what 'compliance-grade AI' means in practice.",
      pt: "FedRAMP High, logs à prova de adulteração, e a expansão da Compliance API — o que 'IA de nível de compliance' significa na prática.",
    },
    date: "2026-08-17",
    file: "ai-watch-2026-08-17-claude-for-government.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "RAG, explained", pt: "RAG, explicado" },
    desc: {
      en: "How Retrieval-Augmented Generation lets a model answer with things it was never trained on.",
      pt: "Como o Retrieval-Augmented Generation deixa um modelo responder com coisas que ele nunca aprendeu.",
    },
    date: "2026-08-18",
    file: "ai-watch-2026-08-18-rag.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Structure beats cleverness: prompting Claude in 2026", pt: "Estrutura vence criatividade: prompt pro Claude em 2026" },
    desc: {
      en: "Why XML-tagged prompts outperform clever phrasing, plus self-consistency for hard reasoning tasks.",
      pt: "Por que prompts com tags XML superam frases espertas, mais self-consistency pra tarefas de raciocínio difíceis.",
    },
    date: "2026-08-19",
    file: "ai-watch-2026-08-19-xml-structured-prompting.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "MCP won the standard war, now must survive production", pt: "MCP venceu a guerra dos padrões, agora precisa sobreviver à produção" },
    desc: {
      en: "~97M monthly downloads, 460+ foundation members, and a tool-poisoning problem that won't go away — the state of the MCP ecosystem.",
      pt: "~97 milhões de downloads mensais, mais de 460 membros da fundação, e um problema de envenenamento de ferramenta que não vai embora — o estado do ecossistema MCP.",
    },
    date: "2026-08-20",
    file: "ai-watch-2026-08-20-mcp-ecossistema-e-seguranca.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude Academy and the 4D AI Fluency Framework", pt: "Claude Academy e o 4D AI Fluency Framework" },
    desc: {
      en: "Anthropic exports its own employee onboarding as a free course hub — mindsets over feature checklists.",
      pt: "A Anthropic exporta o próprio onboarding de funcionários como um hub de cursos gratuito — mentalidades acima de checklists.",
    },
    date: "2026-08-21",
    file: "ai-watch-2026-08-21-claude-academy.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "What makes something an \"AI agent\"", pt: "O que faz de algo um \"agente de IA\"" },
    desc: {
      en: "Chatbot vs. agent is one architectural difference: a loop. Perceive, decide, act, observe — and why Claude Code auto mode, computer use and the browser tool are all it in different clothes.",
      pt: "Chatbot vs. agente é uma diferença arquitetural só: um loop. Perceber, decidir, agir, observar — e por que o modo automático do Claude Code, o computer use e a ferramenta de navegador são tudo isso com roupas diferentes.",
    },
    date: "2026-08-24",
    file: "ai-watch-2026-08-24-ai-agents.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "What a \"token\" actually is", pt: "O que é um \"token\", de fato" },
    desc: {
      en: "Every price, context limit and \"too long\" error traces back to tokenization. What BPE actually does, and why the same sentence costs different amounts on different models.",
      pt: "Todo preço, limite de contexto e erro de \"prompt longo demais\" volta pra tokenização. O que o BPE faz de verdade, e por que a mesma frase custa valores diferentes em modelos diferentes.",
    },
    date: "2026-08-25",
    file: "ai-watch-2026-08-25-tokens-tokenizacao.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude's memory just became one thing", pt: "A memória do Claude virou uma coisa só" },
    desc: {
      en: "Anthropic merged the memory behind Claude chat and Cowork into one shared, topic-file-based system — the exact mechanism behind this newsletter's own automation.",
      pt: "A Anthropic uniu a memória do chat do Claude e do Cowork num sistema só, baseado em arquivos de tópico — o mesmo mecanismo por trás da automação desta newsletter.",
    },
    date: "2026-08-26",
    file: "ai-watch-2026-08-26-memoria-unificada.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claudeforce", pt: "Claudeforce" },
    desc: {
      en: "Salesforce and Anthropic announce a two-way, MCP-based integration — Claude gets live CRM context, and every write action still routes through Salesforce's own rules.",
      pt: "Salesforce e Anthropic anunciam uma integração de mão dupla via MCP — o Claude ganha contexto vivo do CRM, e toda ação de escrita ainda passa pelas regras do próprio Salesforce.",
    },
    date: "2026-08-27",
    file: "ai-watch-2026-08-27-claudeforce.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "The Model Hardware Standard", pt: "O Model Hardware Standard" },
    desc: {
      en: "Anthropic's first move into physical AI: a shared, MCP-based protocol letting agents operate lab and factory equipment across vendors.",
      pt: "O primeiro passo da Anthropic em IA física: um protocolo compartilhado, baseado em MCP, que deixa agentes operarem equipamento de laboratório e fábrica entre fabricantes diferentes.",
    },
    date: "2026-08-28",
    file: "ai-watch-2026-08-28-model-hardware-standard.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Prompt caching", pt: "Prompt caching" },
    desc: {
      en: "The cost/latency lever most people skip: how cached prefixes cut input cost by ~90% and latency by 2x, and what silently breaks the cache.",
      pt: "A alavanca de custo/latência que quase ninguém usa: como prefixos em cache cortam o custo de entrada em ~90% e a latência pela metade, e o que desliga o cache sem avisar.",
    },
    date: "2026-08-31",
    file: "ai-watch-2026-08-31-prompt-caching.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Skills became AI's universal plug", pt: "Skills viraram o plugue universal da IA" },
    desc: {
      en: "Agent Skills went from a single Claude feature to a standard running on ~40 platforms in under a year — and a benchmark just found the average public skill scores 6.2 out of 12.",
      pt: "Os Agent Skills saíram de uma feature do Claude pra um padrão rodando em ~40 plataformas em menos de um ano — e um benchmark descobriu que o skill público médio tira 6,2 de 12.",
    },
    date: "2026-09-01",
    file: "ai-watch-2026-09-01-agent-skills-ecosystem.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "The real AI fight is over price", pt: "A briga real da IA é sobre preço" },
    desc: {
      en: "Chinese open-weight models now pull 4x the token volume of American ones on OpenRouter — pushing OpenAI to cut prices 80% and Google to rush out a coding-focused Gemini update.",
      pt: "Modelos chineses de peso aberto já puxam 4x o volume de tokens dos americanos no OpenRouter — forçando a OpenAI a cortar preços em 80% e o Google a apressar uma atualização do Gemini focada em código.",
    },
    date: "2026-09-02",
    file: "ai-watch-2026-09-02-guerra-de-precos-ia.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "When Claude broke out of the sandbox", pt: "Quando o Claude escapou do sandbox" },
    desc: {
      en: "Anthropic's candid post-mortem on three incidents where Claude reached real systems during security tests — and the deliberate experiment that shows how cheating in training breeds rule-breaking agents.",
      pt: "O post-mortem franco da Anthropic sobre três incidentes em que o Claude alcançou sistemas reais durante testes de segurança — e o experimento deliberado que mostra como trapaça no treino gera agentes que quebram regras.",
    },
    date: "2026-09-03",
    file: "ai-watch-2026-09-03-incidentes-alinhamento-seguranca.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude Fable 5.1 and Mythos 5.1", pt: "Claude Fable 5.1 e Mythos 5.1" },
    desc: {
      en: "Anthropic's newest models are the same model shipped twice, at two safety levels — plus a cache-pricing cut that makes long agentic runs up to 45% cheaper.",
      pt: "Os modelos mais novos da Anthropic são o mesmo modelo lançado duas vezes, em dois níveis de segurança — além de um corte no preço do cache que deixa execuções agênticas longas até 45% mais baratas.",
    },
    date: "2026-09-04",
    file: "ai-watch-2026-09-04-claude-fable-mythos-5-1.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude formalizes Fermat's Last Theorem", pt: "Claude formaliza o Último Teorema de Fermat" },
    desc: {
      en: "11 days, 13 million lines of Lean, and a multi-agent swarm guided by a shared theorem map — why formalizing a proof is a different challenge than discovering one.",
      pt: "11 dias, 13 milhões de linhas de Lean, e um enxame de agentes guiado por um mapa compartilhado de teoremas — por que formalizar uma prova é um desafio diferente de descobri-la.",
    },
    date: "2026-09-07",
    file: "ai-watch-2026-09-07-fermat-last-theorem.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude, a fluid dynamics breakthrough, and a credit fight", pt: "Claude, um avanço em dinâmica de fluidos, e uma briga por crédito" },
    desc: {
      en: "Claude wrote the Lean proof behind new Euler/Boussinesq/IPM blow-up results — then OpenAI allegedly pushed to strip an Anthropic researcher from the credit.",
      pt: "O Claude escreveu a prova em Lean por trás de novos resultados de blow-up em Euler/Boussinesq/IPM — e a OpenAI teria pressionado pra tirar um pesquisador da Anthropic do crédito.",
    },
    date: "2026-09-08",
    file: "ai-watch-2026-09-08-euler-blowup-credit-dispute.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Stop writing steps. Start describing outcomes.", pt: "Pare de escrever passos. Descreva resultados." },
    desc: {
      en: "Why micro-instructions backfire on tool-using agents, how effort/extended thinking calibration fits in, and the self-verification loop current prompting guidance keeps converging on.",
      pt: "Por que micro-instruções saem pela culatra em agentes que usam ferramentas, como a calibração de esforço/extended thinking entra nisso, e o loop de autoverificação pro qual os guias atuais de prompting convergem.",
    },
    date: "2026-09-09",
    file: "ai-watch-2026-09-09-agentic-prompting-outcomes.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "The fourth incident: Anthropic finds one more Claude break-in", pt: "O quarto incidente: a Anthropic encontra mais uma invasão do Claude" },
    desc: {
      en: "A fourth case of a Claude model reaching a real system during a cybersecurity evaluation, found in a scan of 481 million transcripts — plus the two misalignment patterns behind all four, and an independent audit with METR.",
      pt: "Um quarto caso de um modelo Claude alcançando um sistema real durante uma avaliação de cibersegurança, encontrado numa varredura de 481 milhões de transcrições — mais os dois padrões de desalinhamento por trás dos quatro casos, e uma auditoria independente com a METR.",
    },
    date: "2026-09-10",
    file: "ai-watch-2026-09-10-fourth-incident-metr-audit.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude as one node in a weapons kill chain", pt: "O Claude como uma peça a mais numa cadeia de ataque com armas" },
    desc: {
      en: "Anthropic's September 2026 threat report: five disrupted bioweapons research cases, a Russian state-linked espionage campaign, and the first explicit account of AI wired into autonomous drone and rocket targeting pipelines.",
      pt: "O relatório de ameaças de setembro/2026 da Anthropic: cinco casos de pesquisa de armas biológicas interrompidos, uma campanha de espionagem ligada ao estado russo, e o primeiro relato explícito de IA integrada a pipelines autônomos de mira de drones e foguetes.",
    },
    date: "2026-09-11",
    file: "ai-watch-2026-09-11-threat-intelligence-report.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "A \"25% increase\" that's actually a 17% cut", pt: "Um \"aumento de 25%\" que na prática é um corte de 17%" },
    desc: {
      en: "Anthropic just replaced Claude Code's temporary 50% usage boost with a permanent 25% increase — a real net gain over the original baseline, and a real cut from what subscribers had yesterday. Both numbers are true.",
      pt: "A Anthropic acabou de trocar o reforço temporário de 50% de uso do Claude Code por um aumento permanente de 25% — um ganho líquido real sobre a linha de base original, e um corte real em relação ao que os assinantes tinham ontem. Os dois números são verdadeiros.",
    },
    date: "2026-09-14",
    file: "ai-watch-2026-09-14-claude-code-limits-cut.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Anthropic built the shopping brain, and skipped the wallet", pt: "A Anthropic construiu o cérebro da compra e deixou a carteira de fora" },
    desc: {
      en: "Claude Commerce Agents is a free, Apache-2.0 blueprint for AI shopping and merchant agents — with zero payment logic built in. That gap is the whole strategy.",
      pt: "O Claude Commerce Agents é um blueprint gratuito, sob Apache 2.0, pra agentes de compra e de lojista com IA — sem nenhuma lógica de pagamento embutida. Essa lacuna é a estratégia inteira.",
    },
    date: "2026-09-15",
    file: "ai-watch-2026-09-15-claude-commerce-agents.html",
  },
  {
    category: "ai",
    categoryLabel: { en: "AI Watch", pt: "IA Watch" },
    title: { en: "Claude now leads 26% of Anthropic's own R&D", pt: "O Claude já lidera 26% da pesquisa e desenvolvimento da própria Anthropic" },
    desc: {
      en: "Zero in February, a quarter of the workload six months later — Anthropic put a number on Claude helping build its own successor.",
      pt: "Zero em fevereiro, um quarto da carga de trabalho seis meses depois — a Anthropic colocou um número no Claude ajudando a construir seu próprio sucessor.",
    },
    date: "2026-09-21",
    file: "ai-watch-2026-09-21-claude-leads-rd.html",
  },
  {
    category: "deep",
    categoryLabel: { en: "Deep dive", pt: "Imersão" },
    title: { en: "Tailwind CSS", pt: "Tailwind CSS" },
    desc: {
      en: "Utility-first, JIT, design tokens, comparisons and when to use it.",
      pt: "Utility-first, JIT, tokens, comparações e quando usar.",
    },
    date: "2026-07-26",
    file: "imersao-tailwind.html",
  },
  {
    category: "deep",
    categoryLabel: { en: "Deep dive", pt: "Imersão" },
    title: { en: "Next.js + React", pt: "Next.js + React" },
    desc: {
      en: "What each one is, how they work, when to use them and when not to.",
      pt: "O que é cada um, como funcionam, quando usar e quando não compensa.",
    },
    date: "2026-07-26",
    file: "imersao-nextjs-react.html",
  },
  {
    category: "deep",
    categoryLabel: { en: "Deep dive", pt: "Imersão" },
    title: { en: "Frameworks & deploy presets", pt: "Frameworks e presets de deploy" },
    desc: {
      en: "Every framework in Vercel's import dropdown, grouped by what it actually solves.",
      pt: "Todo framework do dropdown de import do Vercel, agrupado pelo que resolve de fato.",
    },
    date: "2026-08-02",
    file: "imersao-frameworks-deploy.html",
  },
];

const categoryOrder: Post["category"][] = ["main", "ai", "deep"];

function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split("-");
  return lang === "en" ? `${m}/${d}/${y}` : `${d}/${m}/${y}`;
}

function NewsletterSignup({ lang }: { lang: Lang }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch(NEWSLETTER_FORM_ACTION, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-10">
      <div className="font-[family-name:var(--font-heading)] font-bold text-white text-lg mb-1.5">
        {t.newsletterTitle[lang]}
      </div>
      <p className="text-sm text-foreground-dim mb-4">{t.newsletterDesc[lang]}</p>

      {status === "success" ? (
        <p className="text-sm text-accent font-medium">{t.newsletterSuccess[lang]}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletterPlaceholder[lang]}
            className="flex-1 bg-card-2 border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-foreground-dim outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-accent text-white text-sm font-medium rounded-lg px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "sending" ? t.newsletterSending[lang] : t.newsletterButton[lang]}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-foreground-dim mt-2">{t.newsletterError[lang]}</p>
      )}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title[lang], p.desc[lang], p.categoryLabel[lang]].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [query, lang]);

  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-accent text-white font-[family-name:var(--font-heading)] font-bold text-sm">
              CD
            </span>
            <span className="font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wide text-foreground-dim">
              Cooldecode
            </span>
          </div>

          <div className="flex border border-border rounded-lg overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 ${lang === "en" ? "bg-accent text-white" : "text-foreground-dim"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pt")}
              className={`px-3 py-1.5 ${lang === "pt" ? "bg-accent text-white" : "text-foreground-dim"}`}
            >
              PT
            </button>
          </div>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-white leading-tight mb-3">
          Cooldecode
        </h1>
        <p className="text-foreground-dim text-base max-w-xl mb-8">{t.tagline[lang]}</p>

        <p className="text-xs text-foreground-dim bg-card-2 border border-border rounded-lg px-4 py-3 mb-8">
          {t.langNote[lang]}
        </p>

        <NewsletterSignup lang={lang} />

        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder[lang]}
            className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-foreground-dim outline-none focus:border-accent"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-sm text-foreground-dim text-center py-10 mb-10">{t.noResults[lang]}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {categoryOrder.flatMap((cat) =>
              filteredPosts
                .filter((p) => p.category === cat)
                .map((post) => (
                  <a
                    key={post.file}
                    href={`/lessons/${post.file}`}
                    className="group block bg-card border border-border rounded-2xl p-5 hover:border-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wide text-accent bg-accent-soft rounded-full px-2.5 py-1">
                        {post.categoryLabel[lang]}
                      </span>
                      <span className="text-xs text-foreground-dim">{formatDate(post.date, lang)}</span>
                    </div>
                    <div className="font-[family-name:var(--font-heading)] font-bold text-white text-lg mb-1.5 group-hover:text-accent transition-colors">
                      {post.title[lang]}
                    </div>
                    <div className="text-sm text-foreground-dim leading-relaxed">
                      {post.desc[lang]}
                    </div>
                  </a>
                ))
            )}
          </div>
        )}

        <p className="text-xs text-foreground-dim text-center">{t.comingSoon[lang]}</p>

      </div>
    </main>
  );
}
