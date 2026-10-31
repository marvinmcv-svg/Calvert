import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/assistant/knowledge";
import { offlineAnswer } from "@/lib/assistant/offline";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  lang: z.enum(["en", "es"]),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1500) }))
    .min(1)
    .max(30),
});

const SYSTEM = buildSystemPrompt();

function textStream(text: string) {
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8", "x-kantuta-mode": "offline" } });
}

export async function POST(req: Request) {
  if (!rateLimit(`kantuta:${clientIp(req)}`, 30, 10 * 60 * 1000)) {
    return new Response("Too many messages. Please wait a few minutes.", { status: 429 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return new Response("Invalid request", { status: 400 });
  const { lang } = parsed.data;

  // Keep the last 12 turns, starting with a user turn.
  let history = parsed.data.messages.slice(-12);
  while (history.length && history[0].role !== "user") history = history.slice(1);
  const last = history[history.length - 1];
  if (!last || last.role !== "user") return new Response("Invalid request", { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) return textStream(offlineAnswer(last.content, lang));

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      try {
        const stream = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 2000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
          messages: history,
        } as unknown as Parameters<typeof client.beta.messages.stream>[0]);
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sent = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" || !sent) {
          controller.enqueue(encoder.encode((sent ? "\n\n" : "") + offlineAnswer(last.content, lang)));
        }
      } catch (err) {
        console.error("kantuta error", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        if (!sent) controller.enqueue(encoder.encode(offlineAnswer(last.content, lang)));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-kantuta-mode": "online" } });
}
