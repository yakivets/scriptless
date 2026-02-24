import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Use current directory as root so Next.js doesn't infer repo root when multiple lockfiles exist
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
