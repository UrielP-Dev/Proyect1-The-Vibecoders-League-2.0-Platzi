import { getDemoReply, streamDemoText } from "@/lib/demo-replies";

export const runtime = "nodejs";

const ERROR_MESSAGE =
  "Ups, ando fallando tantito, intenta de nuevo o escríbenos al WhatsApp";

const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return new Response(
        "Demasiados mensajes en poco tiempo. Espera un minutito e intenta de nuevo.",
        { status: 429 }
      );
    }

    const body = await request.json();
    const messages = body?.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Faltan mensajes en la petición.", { status: 400 });
    }

    const validMessages = messages.filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    );

    if (validMessages.length === 0) {
      return new Response("Faltan mensajes en la petición.", { status: 400 });
    }

    const lastUser = [...validMessages]
      .reverse()
      .find((m) => m.role === "user");

    if (!lastUser) {
      return new Response("Faltan mensajes en la petición.", { status: 400 });
    }

    const reply = getDemoReply(lastUser.content);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          await streamDemoText(reply, (chunk) => {
            controller.enqueue(encoder.encode(chunk));
          });
          controller.close();
        } catch {
          controller.enqueue(encoder.encode(ERROR_MESSAGE));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return new Response(ERROR_MESSAGE, { status: 500 });
  }
}
