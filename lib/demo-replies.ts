/**
 * Respuestas simuladas sin Claude (modo demo).
 */

type Rule = {
  match: RegExp;
  reply: string;
};

const WHATSAPP =
  "Si quieres confirmar, escríbenos al WhatsApp 722-123-4567.";

const RULES: Rule[] = [
  {
    match: /hola|qué onda|buen[oa]s|saludos/i,
    reply:
      "¡Qué onda! Aquí andamos con elotitos calientitos. Pregúntame por precios, horarios o lo que se te antoje 🌽",
  },
  {
    match: /martes/i,
    reply:
      "Los martes el puesto fijo en Toluca está cerrado: ese día estamos en el tianguis de Metepec de 10:00 am a 6:00 pm.",
  },
  {
    match: /hora|abren|cierran|horario|abierto/i,
    reply:
      "En el puesto fijo (Centro de Toluca): lunes a viernes 5:00 pm a 10:30 pm; sábados y domingos 1:00 pm a 11:00 pm. Los martes no abrimos ahí: estamos en el tianguis de Metepec de 10 am a 6 pm.",
  },
  {
    match: /esquite\s*xl|mat[oó]n|24\s*oz/i,
    reply: 'El esquite XL de 24 oz ("el matón") va en $75. ¿Se te antojó?',
  },
  {
    match: /esquite\s*grande|16\s*oz/i,
    reply: "El esquite grande (16 oz) cuesta $50.",
  },
  {
    match: /esquite\s*chico|12\s*oz/i,
    reply: "El esquite chico (12 oz) está en $35.",
  },
  {
    match: /tu[eé]tano/i,
    reply:
      "El esquite con tuétano va en $65. También puedes pedir tuétano de extra por $10.",
  },
  {
    match: /combo/i,
    reply: "El combo del día (esquite grande + agua fresca) cuesta $65.",
  },
  {
    match: /asado|brasas/i,
    reply: "El elote asado a las brasas va en $45.",
  },
  {
    match: /preparado/i,
    reply:
      "El elote preparado (mayonesa, queso, chile y limón) cuesta $40.",
  },
  {
    match: /elote\s*entero|vaso|palito/i,
    reply: "El elote entero (en vaso o con palito) cuesta $35.",
  },
  {
    match: /agua|jamaica|horchata|tamarindo/i,
    reply:
      "Las aguas frescas (jamaica, horchata o tamarindo) van en $20 c/u.",
  },
  {
    match: /extra|queso|crema|chile/i,
    reply:
      "Cada extra (queso, crema, chile o tuétano) cuesta $10. El chile puede ser en polvo (Tajín), líquido (Valentina o Búfalo), o sin picante.",
  },
  {
    match: /men[uú]|precio|cu[aá]nto|cuesta|vale|lista/i,
    reply:
      "Te dejo lo principal: elote entero $35, preparado $40, asado $45; esquite chico $35, grande $50, XL $75; con tuétano $65; combo $65; aguas $20; extras $10. El menú completo está a la izquierda.",
  },
  {
    match: /tarjeta|d[eé]bito|efectivo|pago|spei|mercado\s*pago|clabe|american|amex/i,
    reply:
      "Aceptamos efectivo, tarjeta de débito con terminal, SPEI/CLABE y Mercado Pago (QR). No aceptamos American Express.",
  },
  {
    match: /domicilio|rappi|didi|entrega|delivery/i,
    reply:
      "A domicilio solo por Rappi y DiDi Food, en un radio de unos 3 km del centro de Toluca. Para llevar sí, sin problema.",
  },
  {
    match: /olla|fiesta|evento|litros/i,
    reply:
      "Para fiestas armamos ollas de esquite con 1 día de anticipación: 5 litros $600 y 10 litros $1,100. Escríbenos al WhatsApp 722-123-4567.",
  },
  {
    match: /d[oó]nde|ubicaci[oó]n|direcci[oó]n|quedan|puesto|toluca|portales/i,
    reply:
      "Estamos en la esquina de Av. Miguel Hidalgo y Nicolás Bravo, Centro de Toluca (frente a los portales). Fundado en 2008 por Antonio Perez.",
  },
  {
    match: /whatsapp|contacto|pedido|instagram|facebook/i,
    reply:
      "WhatsApp para pedidos: 722-123-4567. En Instagram y Facebook nos encuentras como @elotesdongoyo.",
  },
  {
    match: /vegano|vegetariano|l[aá]cteo|sin\s*queso/i,
    reply:
      "Todo el menú es vegetariano. Si lo quieres vegano, pídelo sin queso ni crema (sin lácteos). El queso puede ser cotija o amarillo.",
  },
  {
    match: /picante|enchiloso|taj[ií]n|valentina/i,
    reply:
      'Los niveles de picante: sin picante, poquito, normal, o "a la mexicana" (bien enchiloso). Chile en polvo (Tajín), líquido (Valentina o Búfalo), o sin picante.',
  },
  {
    match: /ba[nñ]o/i,
    reply: "En el puesto no hay baño para clientes, te lo comento pa' que lo sepas.",
  },
];

const UNKNOWN = `Ese dato no lo tengo en mi información del puesto. ${WHATSAPP}`;

const OUT_OF_SCOPE =
  /taco|burrito|pizza|hamburguesa|bitcoin|crypto|criptomoneda|d[oó]lar|uber\s*eats|paypal|apple\s*pay|env[ií]o\s*gratis|descuento|promoci[oó]n|cup[oó]n|empleo|vacante|mayoreo|franquicia/i;

export function getDemoReply(userText: string): string {
  const text = userText.trim();
  if (!text) {
    return "¿Me repites la pregunta? Así te ayudo mejor.";
  }

  if (OUT_OF_SCOPE.test(text)) {
    return UNKNOWN;
  }

  for (const rule of RULES) {
    if (rule.match.test(text)) {
      return rule.reply;
    }
  }

  return UNKNOWN;
}

export async function streamDemoText(
  text: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  const chunkSize = 3;
  for (let i = 0; i < text.length; i += chunkSize) {
    onChunk(text.slice(i, i + chunkSize));
    await new Promise((r) => setTimeout(r, 12));
  }
}
