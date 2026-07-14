import WhatsAppLink from "@/components/WhatsAppLink";

const MENU_ITEMS = [
  { name: "Elote entero", detail: "vaso o palito", price: "$35" },
  { name: "Elote preparado", detail: "mayo, queso, chile y limón", price: "$40" },
  { name: "Elote asado", detail: "a las brasas", price: "$45" },
  { name: "Esquite chico", detail: "12 oz", price: "$35" },
  { name: "Esquite grande", detail: "16 oz", price: "$50" },
  { name: "Esquite XL", detail: '"el matón" · 24 oz', price: "$75" },
  { name: "Esquite con tuétano", detail: null, price: "$65" },
  { name: "Combo del día", detail: "esquite grande + agua", price: "$65" },
  { name: "Aguas frescas", detail: "jamaica, horchata o tamarindo", price: "$20" },
  { name: "Extras", detail: "queso, crema, chile o tuétano", price: "$10" },
];

const HOURS = [
  { day: "Lun – Vie", hours: "5:00 pm – 10:30 pm" },
  { day: "Sáb – Dom", hours: "1:00 pm – 11:00 pm" },
  { day: "Martes", hours: "Tianguis Metepec · 10 am – 6 pm" },
];

export default function MenuPanel() {
  return (
    <div className="flex h-full flex-col gap-6">
      <section>
        <h2 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--hoja)]">
          Menú
        </h2>
        <ul className="mt-3 grid gap-x-6 gap-y-0 xl:grid-cols-2">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.name}
              className="menu-row flex items-baseline justify-between gap-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--texto)]">
                  {item.name}
                </p>
                {item.detail && (
                  <p className="text-xs text-[var(--texto)]/45">{item.detail}</p>
                )}
              </div>
              <span className="shrink-0 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-[var(--chile)]">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 border-t border-[var(--hoja)]/10 pt-5 sm:grid-cols-2 xl:grid-cols-1">
        <section>
          <h2 className="font-[family-name:var(--font-fredoka)] text-base font-semibold text-[var(--hoja)]">
            Horarios
          </h2>
          <ul className="mt-2.5 space-y-1.5">
            {HOURS.map((row) => (
              <li
                key={row.day}
                className="flex justify-between gap-2 text-sm text-[var(--texto)]"
              >
                <span className="font-medium">{row.day}</span>
                <span className="text-right text-[var(--texto)]/60">
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-xs leading-relaxed text-[var(--texto)]/45">
            Av. Miguel Hidalgo y Nicolás Bravo, Centro de Toluca.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-fredoka)] text-base font-semibold text-[var(--hoja)]">
            Pago y pedidos
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--texto)]/70">
            Efectivo · Débito · SPEI · Mercado Pago
          </p>
          <p className="mt-1 text-sm text-[var(--texto)]/70">
            Domicilio: Rappi y DiDi Food (~3 km)
          </p>
          <WhatsAppLink className="mt-3" />
        </section>
      </div>
    </div>
  );
}
