// End-to-end QA: node tests/qa.mjs [baseUrl]
// Checks every route in both languages at 390/768/1440px for console errors,
// broken images, horizontal scroll and an h1; then exercises the inquiry API,
// the assistant and the admin edit/save/reset cycle.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(`${process.env.NODE_PATH ?? ""}/playwright`); }
const { chromium } = pw;

const BASE = process.argv[2] ?? "http://localhost:3000";
const PATHS = [
  "", "/about", "/about/history", "/about/leadership", "/about/accreditation", "/about/safeguarding",
  "/academics", "/academics/early-childhood", "/academics/elementary", "/academics/middle-school", "/academics/high-school",
  "/academics/learning-services", "/academics/counseling", "/academics/university-counseling", "/academics/libraries",
  "/admissions", "/admissions/visit", "/admissions/transfer-guide",
  "/student-life", "/student-life/campus", "/student-life/athletics", "/student-life/arts", "/student-life/activities", "/student-life/service",
  "/news", "/news/admissions-2027-28-open", "/news/70-years-of-acs", "/community", "/community/parents", "/community/alumni",
  "/careers", "/contact", "/legal", "/this-page-does-not-exist",
];
const WIDTHS = [390, 768, 1440];
const problems = [];
const browser = await chromium.launch();

async function checkRun(lang, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const p of PATHS) {
    const url = `${BASE}/${lang}${p}`;
    const errs = [];
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
    page.on("console", (m) => m.type() === "error" && !/404/.test(m.text()) && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push(String(e)));
    const res = await page.goto(url, { waitUntil: "load" });
    const expect404 = p.includes("does-not-exist");
    if (!res || (res.status() !== 200 && !(expect404 && res.status() === 404))) problems.push(`${url} status ${res?.status()}`);
    const info = await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 900) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 15)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
      const imgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
      return { h1: document.querySelectorAll("h1").length, lang: document.documentElement.lang, hscroll: document.documentElement.scrollWidth > window.innerWidth + 1, broken: imgs };
    });
    if (info.h1 !== 1) problems.push(`${url} @${w}: ${info.h1} h1 elements`);
    if (info.lang !== lang) problems.push(`${url}: html lang=${info.lang}`);
    if (info.hscroll) problems.push(`${url} @${w}: horizontal scroll`);
    if (info.broken.length) problems.push(`${url} @${w}: broken images ${info.broken.join(", ")}`);
    if (errs.length) problems.push(`${url} @${w}: console ${errs.slice(0, 2).join(" | ")}`);
  }
  await ctx.close();
  console.log(`checked ${lang} @${w}`);
}
await Promise.all(["en", "es"].flatMap((lang) => WIDTHS.map((w) => checkRun(lang, w))));

// Inquiry API
const ok = { type: "inquiry", parentName: "QA Parent", email: "qa@example.com", childGrade: "KG4", preferredLanguage: "es", consent: true, website: "", lang: "es" };
const post = (b) => fetch(`${BASE}/api/inquiries`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 200)}` }, body: JSON.stringify(b) });
let r = await post(ok); if (r.status !== 201) problems.push(`inquiry valid -> ${r.status}`);
r = await post({ ...ok, email: "nope" }); if (r.status !== 400) problems.push(`inquiry invalid -> ${r.status}`);
r = await post({ ...ok, website: "spam.example" }); if (r.status !== 201) problems.push(`inquiry honeypot -> ${r.status}`);

// Assistant (offline or online)
r = await fetch(`${BASE}/api/kantuta`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang: "es", messages: [{ role: "user", content: "¿Cuál es el horario?" }] }) });
const answer = await r.text();
if (r.status !== 200 || !/8:15/.test(answer)) problems.push(`kantuta -> ${r.status} ${answer.slice(0, 80)}`);
console.log(`kantuta (${r.headers.get("x-kantuta-mode")}):`, answer.slice(0, 120));

// Inquiry form in the browser (validation + success)
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/en/admissions#inquire`, { waitUntil: "networkidle" });
  await page.click("form button[type=submit]");
  if (!(await page.locator("#parentName-error").isVisible())) problems.push("form: no inline validation error");
  await page.fill("#parentName", "Browser Parent");
  await page.fill("#email", "browser@example.com");
  await page.fill("#childGrade", "Grade 3");
  await page.check("input[name=consent]");
  await page.click("form button[type=submit]");
  await page.waitForSelector("[role=status]", { timeout: 10000 }).catch(() => problems.push("form: no success state"));
  // Keyboard: palette opens with Ctrl+K
  await page.keyboard.press("Control+k");
  if (!(await page.locator("[cmdk-input]").isVisible())) problems.push("palette: Ctrl+K did not open");
  await page.close();
}

// Admin cycle
if (process.env.ADMIN_USERNAME) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${BASE}/admin/login`);
  await page.fill("input[name=username]", process.env.ADMIN_USERNAME);
  await page.fill("input[name=password]", process.env.ADMIN_PASSWORD);
  await page.click("button");
  await page.waitForURL(`${BASE}/admin`);
  const res = await page.evaluate(async () => {
    const h = { "content-type": "application/json" };
    const bad = await fetch("/api/admin/content", { method: "PUT", headers: h, body: JSON.stringify({ id: "home.copy", value: {} }) });
    const good = await fetch("/api/admin/content", { method: "PUT", headers: h, body: JSON.stringify({ id: "events", value: [] }) });
    const reset = await fetch("/api/admin/content", { method: "DELETE", headers: h, body: JSON.stringify({ id: "events" }) });
    return [bad.status, good.status, reset.status].join(",");
  });
  if (res !== "400,200,200") problems.push(`admin bad/save/reset -> ${res}`);
  await page.click("text=Inquiries");
  await page.waitForURL(`${BASE}/admin/inquiries`);
  if (!(await page.locator("text=Browser Parent").first().isVisible())) problems.push("admin: inquiry not listed");
  await ctx.close();
}

await browser.close();
console.log(problems.length ? `\n${problems.length} problems:\n- ${problems.join("\n- ")}` : "\nAll checks passed.");
process.exit(problems.length ? 1 : 0);
