"use client";

import { useCallback, useEffect, useState } from "react";
import ChatShell from "@/components/ChatShell";
import Footer from "@/components/Footer";
import MenuPanel from "@/components/MenuPanel";
import MenuShell from "@/components/MenuShell";
import WhatsAppLink from "@/components/WhatsAppLink";

type ModalPhase = "closed" | "opening" | "open" | "closing";

function getModalCloseMs(): number {
  if (typeof window === "undefined") return 150;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--modal-close-dur"
  );
  return parseFloat(raw) || 150;
}

export default function Home() {
  const [menuPhase, setMenuPhase] = useState<ModalPhase>("closed");

  const menuOpen = menuPhase === "open" || menuPhase === "opening";
  const menuMounted = menuPhase !== "closed";

  useEffect(() => {
    if (menuPhase !== "opening") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuPhase("open"));
    });
    return () => cancelAnimationFrame(id);
  }, [menuPhase]);

  const openMenu = useCallback(() => setMenuPhase("opening"), []);

  const closeMenu = useCallback(() => {
    setMenuPhase((prev) => {
      if (prev === "closed" || prev === "closing") return prev;
      return "closing";
    });
  }, []);

  useEffect(() => {
    if (menuPhase !== "closing") return;
    const closeMs = getModalCloseMs();
    const t = window.setTimeout(() => setMenuPhase("closed"), closeMs);
    return () => window.clearTimeout(t);
  }, [menuPhase]);

  useEffect(() => {
    if (!menuMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuMounted, closeMenu]);

  const modalClass =
    menuPhase === "open"
      ? "is-open"
      : menuPhase === "closing"
        ? "is-closing"
        : "";

  return (
    <>
      <header className="site-header shrink-0 border-b border-[var(--elote)]/30">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <div className="min-w-0">
            <h1 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight text-[var(--texto)] sm:text-3xl">
              Elotitos <span aria-hidden>🌽</span>
            </h1>
            <p className="mt-0.5 truncate text-sm text-[var(--texto)]/60">
              Del comal a tu antojo, desde 2008 · Toluca
            </p>
          </div>
          <WhatsAppLink
            variant="button"
            label="Pedir por WhatsApp"
            className="hidden sm:inline-flex"
          />
        </div>
      </header>

      <main className="dashboard-main mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-stretch lg:gap-6 lg:px-10 lg:pb-5 lg:pt-[4.25rem]">
        <div className="lg:hidden">
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="flex w-full items-center justify-between rounded-xl border border-[var(--hoja)]/20 bg-white px-4 py-3 text-sm font-semibold text-[var(--hoja)] shadow-sm transition hover:bg-[var(--crema)]"
          >
            <span>Ver menú y precios</span>
            <span aria-hidden>▾</span>
          </button>
        </div>

        {menuMounted && (
          <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
            <button
              type="button"
              aria-label="Cerrar menú"
              className={`t-modal-backdrop absolute inset-0 bg-[var(--texto)]/40 ${modalClass}`}
              onClick={closeMenu}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex max-h-[88vh] justify-center p-4">
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menú y precios"
                  className={`t-modal pointer-events-auto flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl ${modalClass}`}
                >
                  <div className="flex items-center justify-between border-b border-[var(--elote)]/25 px-5 py-3.5">
                    <h2 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--hoja)]">
                      Menú
                    </h2>
                    <button
                      type="button"
                      onClick={closeMenu}
                      className="text-sm font-medium text-[var(--texto)]/60 hover:text-[var(--texto)]"
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="max-h-[75vh] overflow-y-auto p-5">
                    <MenuPanel />
                  </div>
                </div>
            </div>
          </div>
        )}

        <aside className="hidden shrink-0 lg:block lg:w-[min(420px,32%)]">
          <MenuShell panelClassName="overflow-y-auto p-6" />
        </aside>

        <ChatShell />
      </main>

      <Footer />
    </>
  );
}
