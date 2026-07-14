import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/527221234567";
const WHATSAPP_NUMBER = "722-123-4567";

type WhatsAppLinkProps = {
  variant?: "button" | "link";
  className?: string;
  label?: string;
};

export default function WhatsAppLink({
  variant = "link",
  className = "",
  label,
}: WhatsAppLinkProps) {
  const text = label ?? WHATSAPP_NUMBER;

  if (variant === "button") {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 ${className}`}
      >
        <FaWhatsapp className="text-lg" aria-hidden />
        {text}
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] transition hover:text-[#1da851] ${className}`}
    >
      <FaWhatsapp className="text-base" aria-hidden />
      <span>{text}</span>
    </a>
  );
}
