"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2, RotateCcw, Save, LogOut, Inbox, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type CollectionView = { id: string; label: string; group: string; value: unknown; edited: boolean };
type PhotoOpt = { key: string; src: string; alt: string };

const isPair = (v: unknown): v is { en: string; es: string } =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 2 && typeof (v as Record<string, unknown>).en === "string" && typeof (v as Record<string, unknown>).es === "string";

const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

/** Blank copy of a value, used as the template for new list items. */
function blank(v: Json): Json {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return null;
}

const input = "block w-full min-h-11 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-forest-800/15 outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

function Field({ name, value, onChange, photos }: { name: string; value: Json; onChange: (v: Json) => void; photos: PhotoOpt[] }) {
  if (isPair(value)) {
    const long = value.en.length > 70 || value.es.length > 70;
    return (
      <fieldset className="rounded-2xl bg-cream/60 p-3">
        <legend className="px-1 text-xs font-bold uppercase tracking-wider text-forest-800">{label(name)}</legend>
        <div className="grid gap-2 md:grid-cols-2">
          {(["en", "es"] as const).map((lang) => (
            <label key={lang} className="block text-xs font-semibold text-mist">
              {lang === "en" ? "English" : "Español"}
              {long ? (
                <textarea rows={3} lang={lang} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} className={cn(input, "mt-1")} />
              ) : (
                <input lang={lang} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} className={cn(input, "mt-1")} />
              )}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  if (typeof value === "string") {
    if (name === "photo" || /photo$/i.test(name)) {
      const p = photos.find((x) => x.key === value);
      return (
        <label className="block text-xs font-bold uppercase tracking-wider text-forest-800">
          {label(name)}
          <div className="mt-1 flex items-center gap-3">
            {p && <Image src={p.src} alt={p.alt} width={64} height={48} className="h-12 w-16 rounded-lg object-cover" />}
            <select value={value} onChange={(e) => onChange(e.target.value)} className={input}>
              {photos.map((x) => <option key={x.key} value={x.key}>{x.key}</option>)}
            </select>
          </div>
        </label>
      );
    }
    return (
      <label className="block text-xs font-bold uppercase tracking-wider text-forest-800">
        {label(name)}
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cn(input, "mt-1 font-normal normal-case tracking-normal")} />
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <label className="block text-xs font-bold uppercase tracking-wider text-forest-800">
        {label(name)}
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={cn(input, "mt-1")} />
      </label>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {label(name)}
      </label>
    );
  }
  if (Array.isArray(value)) {
    const move = (i: number, d: number) => {
      const next = [...value];
      const [x] = next.splice(i, 1);
      next.splice(i + d, 0, x);
      onChange(next);
    };
    return (
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-forest-800">{label(name)} ({value.length})</p>
        {value.map((item, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-forest-800/10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-mist">#{i + 1}</span>
              <div className="flex gap-1">
                <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-cream disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                <button type="button" aria-label="Move down" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-cream disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                <button type="button" aria-label="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))} className="grid h-9 w-9 place-items-center rounded-lg text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <Field name={`${name} item`} value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} photos={photos} />
          </div>
        ))}
        {value.length > 0 && (
          <button type="button" onClick={() => onChange([...value, blank(value[0])])} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-forest-800 ring-1 ring-forest-800/20 hover:bg-white">
            <Plus className="h-4 w-4" /> Add item
          </button>
        )}
      </div>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([k, v]) => (
          <Field key={k} name={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} photos={photos} />
        ))}
      </div>
    );
  }
  return null;
}

export function Editor({ collections, photos }: { collections: CollectionView[]; photos: PhotoOpt[] }) {
  const router = useRouter();
  const [items, setItems] = useState(collections);
  const [active, setActive] = useState(collections[0]?.id);
  const [draft, setDraft] = useState<Json>(collections[0]?.value as Json);
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState<"content" | "photos">("content");
  const current = items.find((c) => c.id === active);
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(current?.value), [draft, current]);
  const groups = useMemo(() => [...new Set(items.map((c) => c.group))], [items]);

  const select = (id: string) => {
    if (dirty && !confirm("Discard unsaved changes?")) return;
    const c = items.find((x) => x.id === id);
    setActive(id);
    setDraft(c?.value as Json);
    setStatus("");
  };

  async function save() {
    setStatus("Saving…");
    const res = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: active, value: draft }) });
    if (res.ok) {
      setItems((all) => all.map((c) => (c.id === active ? { ...c, value: draft, edited: true } : c)));
      setStatus("Saved. The live site updates within a few seconds.");
    } else setStatus(res.status === 401 ? "Your session expired. Sign in again." : "Could not save. Check the fields and try again.");
  }

  async function reset() {
    if (!confirm("Reset this section to its original content?")) return;
    const res = await fetch("/api/admin/content", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: active }) });
    if (res.ok) {
      const { value } = (await res.json()) as { value: Json };
      setItems((all) => all.map((c) => (c.id === active ? { ...c, value, edited: false } : c)));
      setDraft(value);
      setStatus("Reset to default.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[18rem_1fr]">
      <aside className="border-r border-forest-800/10 bg-forest-900 p-5 text-white">
        <div className="flex items-center gap-2">
          <Image src="/brand/acs-mark-white-512.png" alt="" width={36} height={36} />
          <p className="font-display text-xl">ACS Staff</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-white/10 p-1 text-sm font-semibold">
          {(["content", "photos"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={cn("min-h-10 rounded-lg capitalize", tab === t && "bg-white text-forest-900")}>{t}</button>
          ))}
        </div>
        {tab === "content" && (
          <nav aria-label="Collections" className="mt-6 space-y-5">
            {groups.map((g) => (
              <div key={g}>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-300">{g}</p>
                <ul className="mt-2 space-y-1">
                  {items.filter((c) => c.group === g).map((c) => (
                    <li key={c.id}>
                      <button type="button" onClick={() => select(c.id)} aria-current={c.id === active} className={cn("flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-left text-sm hover:bg-white/10", c.id === active && "bg-white/15 font-semibold")}>
                        {c.label}
                        {c.edited && <span className="h-2 w-2 rounded-full bg-gold-400" title="Edited" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}
        <div className="mt-8 space-y-2 border-t border-white/10 pt-5 text-sm">
          <Link href="/admin/inquiries" className="flex min-h-10 items-center gap-2 rounded-lg px-3 hover:bg-white/10"><Inbox className="h-4 w-4" /> Inquiries</Link>
          <a href="/en" target="_blank" className="flex min-h-10 items-center gap-2 rounded-lg px-3 hover:bg-white/10"><ExternalLink className="h-4 w-4" /> View site</a>
          <button type="button" onClick={logout} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 hover:bg-white/10"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </aside>

      <main className="p-5 sm:p-10">
        {tab === "photos" ? (
          <div>
            <h1 className="text-4xl text-forest-900">Photo library</h1>
            <p className="mt-2 max-w-2xl text-mist">Every photo on the site, by key. Choose a key in any &ldquo;photo&rdquo; field to swap an image. To add new photos, place them in <code>public/images/acs/</code> and register them in <code>src/data/media.ts</code> with English and Spanish alt text.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {photos.map((p) => (
                <li key={p.key} className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest-800/8">
                  <div className="relative aspect-[4/3]"><Image src={p.src} alt={p.alt} fill sizes="20rem" className="object-cover" /></div>
                  <div className="p-3"><p className="font-mono text-xs font-semibold">{p.key}</p><p className="mt-1 line-clamp-2 text-xs text-mist">{p.alt}</p></div>
                </li>
              ))}
            </ul>
          </div>
        ) : current ? (
          <div className="mx-auto max-w-4xl">
            <div className="sticky top-0 z-10 -mx-5 flex flex-wrap items-center justify-between gap-3 bg-cream/95 px-5 py-4 backdrop-blur sm:-mx-10 sm:px-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cougar-700">{current.group}</p>
                <h1 className="text-3xl text-forest-900">{current.label}</h1>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={reset} disabled={!current.edited} className={buttonClass("outline", "sm")}><RotateCcw className="h-4 w-4" /> Reset</button>
                <button type="button" onClick={save} disabled={!dirty} className={buttonClass("gold", "sm")}><Save className="h-4 w-4" /> Save</button>
              </div>
            </div>
            <p aria-live="polite" className="min-h-6 text-sm font-medium text-forest-800">{status}</p>
            <p className="mb-6 text-sm text-mist">Text inside <code>[[CONFIRM: …]]</code> shows as a flag on the site until it is replaced with confirmed information.</p>
            <Field name={current.label} value={draft} onChange={setDraft} photos={photos} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
