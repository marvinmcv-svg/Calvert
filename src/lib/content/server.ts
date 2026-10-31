import "server-only";
import { readJson, writeJson } from "@/lib/storage";
import { applyOverrides, type Overrides } from "./registry";

export async function loadOverrides(): Promise<Overrides> {
  return readJson<Overrides>("content-overrides", {});
}

export async function saveOverrides(o: Overrides) {
  await writeJson("content-overrides", o);
}

/** Loads staff edits and merges them onto the live data objects (server side). */
export async function ensureContent(): Promise<Overrides> {
  const o = await loadOverrides();
  applyOverrides(o);
  return o;
}
