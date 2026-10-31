"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";
import { LLink } from "@/components/ui/llink";

type Msg = { role: "user" | "assistant"; content: string };

const COPY = {
  title: { en: "Kantuta", es: "Kantuta" },
  subtitle: { en: "ACS virtual receptionist", es: "Recepcionista virtual de ACS" },
  greeting: {
    en: "Hi, I'm Kantuta, the ACS virtual receptionist. Ask me about admissions, programs, campus or school life.",
    es: "Hola, soy Kantuta, la recepcionista virtual de ACS. Pregúntame sobre admisiones, programas, el campus o la vida escolar.",
  },
  placeholder: { en: "Ask a question…", es: "Escribe tu pregunta…" },
  send: { en: "Send", es: "Enviar" },
  open: { en: "Ask Kantuta, our virtual receptionist", es: "Pregúntale a Kantuta, nuestra recepcionista virtual" },
  close: { en: "Close chat", es: "Cerrar chat" },
  disclaimer: {
    en: "AI answers from verified school information. For decisions, our staff has the last word.",
    es: "Respuestas con IA basadas en información verificada. Para decisiones, nuestro personal tiene la última palabra.",
  },
  error: { en: "Something went wrong. Please call +591 2 279 2302.", es: "Algo salió mal. Llama al +591 2 279 2302." },
  suggestions: {
    en: ["How do we apply?", "Does my child need English?", "What are the school hours?", "Can we book a tour?"],
    es: ["¿Cómo postulamos?", "¿Mi hijo necesita inglés?", "¿Cuál es el horario?", "¿Podemos agendar una visita?"],
  },
};

/** Turns on-site paths, emails, phone numbers and URLs in a reply into links. */
function Linkified({ text }: { text: string }) {
  const re = /(https?:\/\/[^\s)]+|\/[a-z][a-z0-9\-/#]*|[\w.+-]+@[\w-]+\.[\w.]+|\+591[\d\s]{8,13}\d)/gi;
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    const raw = m[0].replace(/[.,]$/, "");
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const cls = "font-semibold text-forest-700 underline decoration-gold-500 underline-offset-2";
    if (raw.includes("@")) out.push(<a key={i} href={`mailto:${raw}`} className={cls}>{raw}</a>);
    else if (raw.startsWith("+")) out.push(<a key={i} href={`tel:${raw.replace(/\s/g, "")}`} className={cls}>{raw}</a>);
    else out.push(<LLink key={i} href={raw} className={cls}>{raw}</LLink>);
    last = i + raw.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function Kantuta() {
  const { lang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) setInput(prompt);
    };
    window.addEventListener("acs:open-assistant", onOpen);
    return () => window.removeEventListener("acs:open-assistant", onOpen);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function send(text: string) {
    const q = text.trim().slice(0, 1500);
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/kantuta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setMsgs([...next, { role: "assistant", content: tr(COPY.error) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={tr(COPY.open)}
        aria-expanded={open}
        className={cn(
          "pressable fixed bottom-24 right-4 z-40 flex items-center gap-2.5 rounded-full bg-forest-800 py-1.5 pl-1.5 pr-4 text-white shadow-soft md:bottom-6 md:right-6",
          open && "pointer-events-none opacity-0",
        )}
      >
        <span className="relative">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-paper ring-2 ring-gold-400 animate-breathe">
            <Image src="/brand/acs-mark-512.png" alt="" width={64} height={64} className="h-8 w-8" />
          </span>
          <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-cougar-500 ring-2 ring-forest-800" />
        </span>
        <span className="hidden text-sm font-semibold sm:block">{tr({ en: "Ask Kantuta", es: "Pregúntale a Kantuta" })}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={tr(COPY.title)}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] flex max-h-[min(40rem,calc(100svh-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] bg-paper shadow-2xl ring-1 ring-forest-800/10 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[25rem]"
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          >
            <div className="flex items-center gap-3 bg-forest-800 px-4 py-3.5 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-paper ring-2 ring-gold-400">
                <Image src="/brand/acs-mark-512.png" alt="" width={64} height={64} className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg leading-tight">{tr(COPY.title)}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/75">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-cougar-300" />
                  {tr(COPY.subtitle)}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={tr(COPY.close)} className="pressable grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <Bubble role="assistant">{tr(COPY.greeting)}</Bubble>
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {COPY.suggestions[lang].map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="pressable min-h-11 rounded-full bg-white px-3.5 py-2 text-left text-sm font-medium text-forest-800 ring-1 ring-forest-800/15 hover:bg-cream">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.content ? (
                    m.role === "assistant" ? <Linkified text={m.content} /> : m.content
                  ) : (
                    <span className="inline-flex gap-1" aria-label="…">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-forest-400" style={{ animationDelay: `${d * 120}ms` }} />
                      ))}
                    </span>
                  )}
                </Bubble>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border bg-white p-3"
            >
              <div className="flex items-end gap-2">
                <label htmlFor="kantuta-input" className="sr-only">{tr(COPY.placeholder)}</label>
                <textarea
                  id="kantuta-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={1500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={tr(COPY.placeholder)}
                  className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl bg-cream px-4 py-3 text-[0.95rem] outline-none placeholder:text-mist focus-visible:ring-2 focus-visible:ring-gold-500"
                />
                <button type="submit" disabled={busy || !input.trim()} aria-label={tr(COPY.send)} className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-forest-900 disabled:opacity-50">
                  <ArrowUp aria-hidden className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 px-1 text-[0.7rem] leading-snug text-mist">{tr(COPY.disclaimer)}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: Msg["role"]; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[0.93rem] leading-relaxed",
          role === "user" ? "rounded-br-md bg-forest-800 text-white" : "rounded-bl-md bg-white text-charcoal ring-1 ring-forest-800/8",
        )}
      >
        {children}
      </div>
    </div>
  );
}
