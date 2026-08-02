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
