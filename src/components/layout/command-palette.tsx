"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, CornerDownLeft, MessageCircle, Search } from "lucide-react";
import { buildSearchIndex } from "@/data/search-index";
import { UI } from "@/data/dictionary";
import { useLang } from "@/lib/lang-context";
import { isExternal } from "@/lib/utils";
import { plain } from "@/components/ui/txt";
import { openAssistant } from "@/components/assistant/events";

export function CommandPalette() {
  const { tr, href, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const items = useMemo(() => buildSearchIndex(), []);
  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    items.forEach((i) => {
      const g = tr(i.group);
      map.set(g, [...(map.get(g) ?? []), i]);
    });
    return [...map.entries()];
  }, [items, tr]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("acs:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("acs:open-search", onOpen);
    };
  }, []);

  const go = (target: string) => {
    setOpen(false);
    if (isExternal(target)) window.open(target, "_blank", "noopener,noreferrer");
    else router.push(href(target));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-forest-950/50 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content
          className="fixed left-1/2 top-[10vh] z-[90] w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.5rem] bg-white shadow-2xl ring-1 ring-forest-800/10"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{tr(UI.search)}</Dialog.Title>
          <Command label={tr(UI.search)} loop>
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search aria-hidden className="h-5 w-5 text-mist" />
              <Command.Input
                autoFocus
                placeholder={tr(UI.searchPlaceholder)}
                className="h-16 w-full bg-transparent text-base text-charcoal outline-none placeholder:text-mist"
              />
              <kbd className="hidden rounded-md bg-cream px-2 py-1 text-xs text-mist sm:block">Esc</kbd>
            </div>
            <Command.List className="max-h-[60vh] overflow-y-auto p-2" aria-live="polite">
              <Command.Empty className="p-6 text-center text-sm text-mist">{tr(UI.noResults)}</Command.Empty>
              <Command.Group heading={tr(UI.askAssistant)} className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-cougar-700">
                <Command.Item
                  value={`ask kantuta assistant pregunta ${lang}`}
                  onSelect={() => {
                    setOpen(false);
                    openAssistant();
                  }}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 data-[selected=true]:bg-cream"
                >
                  <MessageCircle aria-hidden className="h-4 w-4 text-gold-600" />
                  <span className="font-semibold text-forest-900">{tr(UI.askAssistant)}</span>
                </Command.Item>
              </Command.Group>
              {groups.map(([group, list]) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-cougar-700"
                >
                  {list.map((item) => (
                    <Command.Item
                      key={`${item.href}-${item.title.en}`}
                      value={`${tr(item.title)} ${item.hint ? plain(tr(item.hint)) : ""} ${item.keywords ?? ""} ${item.href}`}
                      onSelect={() => go(item.href)}
                      className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 data-[selected=true]:bg-cream"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-forest-900">{tr(item.title)}</span>
                        {item.hint && <span className="block truncate text-sm text-mist">{plain(tr(item.hint))}</span>}
                      </span>
                      {isExternal(item.href) ? (
                        <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-mist" />
                      ) : (
                        <CornerDownLeft aria-hidden className="h-4 w-4 shrink-0 text-mist opacity-0 group-data-[selected=true]:opacity-100" />
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
