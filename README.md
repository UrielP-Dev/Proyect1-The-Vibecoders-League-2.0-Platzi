# Elotitos — Virtual Assistant for Toluca's Favorite Corn Stand

**Proyect1 · The Vibecoders League 2.0 — Platzi**

Meet **Don Goyo**, the friendly face of **Elotitos** — a beloved street corn stand in Toluca, Mexico, serving locals since 2008. This project brings that same warm, neighborhood energy online: a beautiful single-page web app where customers can browse the full menu and chat with an intelligent assistant that knows everything about the business — prices, hours, payment options, delivery, and more.

Built with care for real people who just want a straight answer before they head out for an esquite.

---

## Why this project matters

Small food businesses run on trust, speed, and good vibes. Customers shouldn't have to dig through scattered posts or wait on hold just to ask *"¿a qué hora abren?"* or *"¿cuánto cuesta el esquite XL?"*

**Elotitos** puts the menu and a smart assistant in one place — mobile-friendly, fast, and ready to deploy. It's the kind of tool every neighborhood spot deserves.

If this resonates with you — if you've ever craved street food at 9 pm and wished the info was one tap away — **we'd love your support.** Every vote for **The Vibecoders League 2.0** at Platzi helps us keep building projects that celebrate Mexican culture and help real businesses shine.

Thank you for stopping by. 🌽

---

## Features

- **Interactive menu panel** — Full catalog with prices, extras, combos, and party orders
- **AI-powered chat assistant** — Ask about hours, menu items, payments, delivery, and policies in natural Spanish
- **Streaming responses** — Smooth, real-time replies for a natural conversation feel
- **Suggested questions** — Quick chips to get started (hours, prices, card payments, delivery)
- **WhatsApp integration** — Direct links when customers want to place an order
- **Don Goyo mascot** — Charming brand character that makes the experience feel human
- **Responsive design** — Polished layout on desktop and mobile, with an animated menu drawer on small screens
- **Production-ready** — Optimized for Vercel with rate limiting and error handling

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Icons | react-icons |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

### Run locally

```bash
git clone https://github.com/UrielP-Dev/Proyect1-The-Vibecoders-League-2.0-Platzi.git
cd Proyect1-The-Vibecoders-League-2.0-Platzi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Try asking:

- *¿A qué hora abren?*
- *¿Cuánto cuesta un esquite grande?*
- *¿Aceptan tarjeta?*
- *¿Hacen a domicilio?*

### Production build

```bash
npm run build
npm start
```

---

## Deploy on Vercel

The fastest way to go live:

1. Push this repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Deploy — no extra configuration required

Or use the Vercel CLI:

```bash
npx vercel
```

Your site will be live in minutes.

---

## Project structure

```
├── app/
│   ├── api/chat/       # Chat API with streaming
│   ├── page.tsx        # Main dashboard (menu + chat)
│   ├── layout.tsx      # Root layout and fonts
│   └── globals.css     # Brand colors and styles
├── components/
│   ├── Chat.tsx        # Chat UI with suggestions
│   ├── ChatShell.tsx   # Chat panel + Don Goyo mascot
│   ├── MenuPanel.tsx   # Full menu content
│   ├── MenuShell.tsx   # Menu container
│   ├── WhatsAppLink.tsx
│   └── Footer.tsx
├── lib/
│   └── system-prompt.ts  # Business knowledge base
└── public/
    └── elote-mascot.png  # Don Goyo
```

---

## About Elotitos

- **Location:** Corner of Av. Miguel Hidalgo & Nicolás Bravo, Centro de Toluca
- **Founded:** 2008 by Antonio Perez
- **Specialty:** Elotes, esquites, aguas frescas — from the comal to your craving
- **Tuesday note:** Fixed stand is closed; find them at the Metepec tianguis (10:00 AM – 6:00 PM)

---

## Support us

This project was crafted with heart for **The Vibecoders League 2.0 — Platzi**.

We believe technology should feel close to home — useful, honest, and full of personality. If **Elotitos** made you smile or reminded you of your favorite corner stand, **please consider voting for our team.** Your support fuels more projects like this one.

---

## License

This project was built as part of The Vibecoders League 2.0 at Platzi. Feel free to explore, learn, and get inspired.

Made with 🌽 in Toluca.
