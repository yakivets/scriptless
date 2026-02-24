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
   git clone https://github.com/yourusername/npc-ai.git
   cd npc-ai
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
npc-ai/
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
- Left sidebar with NPC configuration:
  - Name input
  - Occupation dropdown
  - Personality sliders (Friendliness, Intelligence, Humor)
  - Dialogue style radio buttons
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
- Copy-to-clipboard functionality

### Pricing (`/pricing`)
- Three-tier pricing table
- Feature comparison
- FAQ section

## 🎨 Design System

### Colors
- **Background**: Dark Navy (`#0a0e1a`)
- **Primary**: Cyan (`#06b6d4`)
- **Accent**: Purple (`#a855f7`)
- **Gradients**: Cyan to Purple

### Effects
- Glassmorphism cards with backdrop blur
- Smooth hover animations
- Gradient text and borders
- Glow effects on hover

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

```bash
npm run build
```

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder or connect your Git repository

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# API Configuration (for future backend integration)
NEXT_PUBLIC_API_URL=https://api.scriptless.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Vercel](https://vercel.com) for the amazing deployment platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

Made with ❤️ for game developers everywhere

**[Live Demo](https://scriptless.ai)** | **[Documentation](https://docs.scriptless.ai)** | **[Discord](https://discord.gg/scriptless)**
