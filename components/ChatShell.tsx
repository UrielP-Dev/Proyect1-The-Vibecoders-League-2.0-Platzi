import Image from "next/image";
import Chat from "@/components/Chat";

export default function ChatShell() {
  return (
    <div className="dashboard-panel chat-column relative min-w-0 flex-1">
      <Image
        src="/elote-mascot.png"
        alt="Don Goyo, mascota de Elotitos"
        width={176}
        height={176}
        priority
        className="chat-mascot pointer-events-none absolute left-1/2 z-50 h-[5.75rem] w-auto -translate-x-1/2 drop-shadow-[0_10px_20px_rgba(42,42,42,0.2)] sm:h-[6.25rem]"
      />

      <section className="panel panel-chat flex h-full min-h-0 flex-col overflow-hidden">
        <div className="chat-panel-header shrink-0 border-b border-[var(--elote)]/25 bg-white px-5 pb-4 pt-7 sm:px-6 sm:pt-8 lg:px-8">
          <h2 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--hoja)]">
            Pregúntale a Don Goyo
          </h2>
          <p className="mt-0.5 text-sm text-[var(--texto)]/50">
            Precios, horarios y lo que se te antoje
          </p>
        </div>

        <div className="min-h-0 flex-1">
          <Chat />
        </div>
      </section>
    </div>
  );
}
