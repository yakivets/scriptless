import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scriptless - Build Intelligent NPCs in Minutes",
  description: "AI-powered NPC characters for Unity, Unreal, and more. No coding required. Create dynamic conversations with intelligent game characters.",
  keywords: ["NPC", "AI", "game development", "Unity", "Unreal Engine", "game characters", "AI dialogue", "Scriptless"],
  authors: [{ name: "Scriptless Team" }],
  openGraph: {
    title: "Scriptless - Build Intelligent NPCs in Minutes",
    description: "AI-powered NPC characters for Unity, Unreal, and more. No coding required.",
    type: "website",
    url: "https://scriptless.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptless - Build Intelligent NPCs in Minutes",
    description: "AI-powered NPC characters for Unity, Unreal, and more. No coding required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0e1a]`}
      >
        <TooltipProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
