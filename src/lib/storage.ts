import { promises as fs } from "fs";
import path from "path";

/**
 * JSON storage: Vercel Blob in production (when BLOB_READ_WRITE_TOKEN is set),
 * .data/*.json in local development.
 */
const PREFIX = "acs-calvert";
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    if (useBlob()) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: `${PREFIX}/${name}.json`, limit: 1 });
      if (!blobs[0]) return fallback;
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      return res.ok ? ((await res.json()) as T) : fallback;
    }
    const file = path.join(process.cwd(), ".data", `${name}.json`);
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(name: string, data: unknown): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    await put(`${PREFIX}/${name}.json`, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${name}.json`), body, "utf8");
}
