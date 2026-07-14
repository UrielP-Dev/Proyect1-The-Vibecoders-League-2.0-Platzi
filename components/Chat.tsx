"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  role: "assistant",
  content:
    "¡Qué onda! Soy el asistente de Don Goyo 🌽 Pregúntame por precios, horarios, o qué se te antoja.",
};

const SUGGESTIONS = [
  "¿A qué hora abren?",
  "¿Cuánto cuesta un esquite grande?",
  "¿Aceptan tarjeta?",
  "¿Hacen a domicilio?",
  "¿Dónde están?",
  "¿Abren los martes?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const fullHistory = [...messages, userMessage];
    const withoutWelcome =
      fullHistory[0]?.role === "assistant" ? fullHistory.slice(1) : fullHistory;
    const apiMessages = withoutWelcome.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errText = await response.text();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              errText ||
              "Ups, ando fallando tantito, intenta de nuevo o escríbenos al WhatsApp",
          },
        ]);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Ups, ando fallando tantito, intenta de nuevo o escríbenos al WhatsApp",
          },
        ]);
        return;
      }

      const decoder = new TextDecoder();
      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        const snapshot = assistantText;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: snapshot };
          return next;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ups, ando fallando tantito, intenta de nuevo o escríbenos al WhatsApp",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  const last = messages[messages.length - 1];
  const showTyping =
    isLoading &&
    (last?.role === "user" ||
      (last?.role === "assistant" && last.content === ""));

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="chat-messages flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6 lg:px-8">
        {messages.map((msg, i) => {
          if (
            msg.role === "assistant" &&
            msg.content === "" &&
            i === messages.length - 1 &&
            isLoading
          ) {
            return null;
          }
          return (
            <div
              key={`${i}-${msg.role}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div
                  aria-hidden
                  className="mr-3 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--elote)]/90 text-base"
                >
                  🌽
                </div>
              )}
              <div
                className={`max-w-[min(720px,85%)] px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "rounded-2xl rounded-br-sm bg-[var(--hoja)] text-white"
                    : "rounded-2xl rounded-bl-sm border border-[var(--elote)]/40 bg-white text-[var(--texto)]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        {showTyping && (
          <div className="flex justify-start">
            <div
              aria-hidden
              className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--elote)]/90 text-base"
            >
              🌽
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-[var(--elote)]/40 bg-white px-4 py-3.5 shadow-sm">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions shrink-0 px-5 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              disabled={isLoading}
              onClick={() => void sendMessage(q)}
              className="rounded-full border border-[var(--hoja)]/20 bg-[var(--crema)] px-3.5 py-1.5 text-xs text-[var(--texto)]/80 transition hover:border-[var(--hoja)]/40 hover:bg-[var(--elote)]/20 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="chat-input-bar flex shrink-0 gap-3 px-5 py-4 sm:px-6 lg:px-8"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-xl border border-[var(--hoja)]/25 bg-white px-4 py-3 text-sm text-[var(--texto)] outline-none transition placeholder:text-[var(--texto)]/35 focus:border-[var(--hoja)] focus:ring-2 focus:ring-[var(--elote)]/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="shrink-0 rounded-xl bg-[var(--chile)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
