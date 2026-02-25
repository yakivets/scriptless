# Scriptless - AI-Powered NPC Marketplace

> Build Intelligent NPCs in Minutes. No coding required.

![Scriptless](https://img.shields.io/badge/Scriptless-AI%20NPCs-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

Scriptless is a modern SaaS platform for game developers to create AI-powered NPCs with dynamic conversations. Build unique characters with customizable personalities, integrate them into Unity, Unreal Engine, or any game using our REST API.

## ✨ Features

- **🎭 NPC Builder Dashboard** - Visual personality configuration with real-time chat preview
- **💬 Dynamic Conversations** - AI-powered NPCs that respond naturally to player input
- **🎮 Easy Integration** - SDKs for Unity, Unreal Engine, and REST API
- **📊 Analytics Dashboard** - Track API usage and NPC performance
- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **📱 Fully Responsive** - Works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yakivets/scriptless.git
   cd scriptless
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── builder/           # NPC Builder Dashboard
│   │   ├── my-npcs/           # My NPCs management
│   │   ├── docs/              # Documentation
│   │   └── pricing/           # Pricing page
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── store.ts           # Zustand state management
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
├── unity/                      # Paste-ready Unity C# scripts
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📄 Pages

### Landing Page (`/`)
- Hero section with animated background
- Features grid
- Demo video placeholder
- Pricing overview
- Trust indicators

### NPC Builder (`/builder`)
- Left sidebar with NPC configuration (name, occupation, personality, dialogue style, game knowledge)
- Right panel with live chat preview
- Save NPC and Generate API Key buttons

### My NPCs (`/my-npcs`)
- Grid of created NPCs with stats
- Edit, delete, and manage API keys
- Usage analytics per NPC

### Documentation (`/docs`)
- Tabbed code examples (Unity, Unreal, REST API)
- Quickstart guide
- API reference
- Paste-ready Unity scripts

### Pricing (`/pricing`)
- Three-tier pricing table
- Feature comparison
- FAQ section

## 🚀 Deployment

### Vercel (Recommended)

The app is at the **repo root**. Leave **Root Directory** empty in Vercel (or use `.`).

1. Push your code to GitHub and import the repository on [Vercel](https://vercel.com).
2. **Framework Preset**: set to **Next.js** (not "Other").
3. Deploy. No need to set a subfolder.

```bash
npm run build
```

### Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder or connect your Git repository

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` for local development. On Vercel, add variables in Project Settings → Environment Variables.

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Note

If an **`npc-ai`** folder still exists (leftover from the move), you can delete it after closing any running dev servers and terminals: some files in `npc-ai/node_modules` may be locked. The app now runs from the repo root.

## Remotes (Git)

This repo is pushed to **GitHub** (`origin`) and **GitLab** (`gitlab`). Do not push `main` to GitLab; use the `web-app-dev` branch there. See `.githooks/pre-push`.

---

Made with ❤️ for game developers everywhere
