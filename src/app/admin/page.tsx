import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { REGISTRY, getDefault } from "@/lib/content/registry";
import { loadOverrides } from "@/lib/content/server";
import { MEDIA } from "@/data/media";
import { Editor } from "@/components/admin/editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const overrides = await loadOverrides();
  const collections = REGISTRY.map((c) => ({
    id: c.id,
    label: c.label.en,
    group: c.group.en,
    value: c.id in overrides ? overrides[c.id] : getDefault(c.id),
    edited: c.id in overrides,
  }));
  const photos = Object.entries(MEDIA).map(([key, p]) => ({ key, src: p.src, alt: p.alt.en }));
  return <Editor collections={collections} photos={photos} />;
}
