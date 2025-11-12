
# Fashion MetaTag Generator

An AI-powered assistant to generate structured metadata for fashion product images. Upload a fashion image, add a brand or title, and generate:

- `<meta>` description tags
- Schema.org JSON-LD for SEO
- Image metadata (IPTC/XMP-style)

Built with **Next.js**, **TailwindCSS**, and powered by **OpenAI API**.

## ✨ Features
- Upload product image and preview it instantly
- Optional brand or product title input
- One-click generation of structured metadata
- Export as `.txt` or send to API
- Dark mode by default with toggle to light mode

## 🧱 Tech Stack
- React + Next.js
- TailwindCSS for UI styling
- Axios for HTTP
- OpenAI Chat API (via `/api/generate` route)

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## 🔐 Environment Variables
Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_key_here
```

## 🚀 Deployment
Deploy on [Vercel](https://vercel.com) for best performance. Set `OPENAI_API_KEY` in the Vercel dashboard under project → settings → environment variables.

## 📄 License
MIT — free for commercial and personal use.
