// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  themes: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // main brand blue
          hover: "#1D4ED8",
          light: "#DBEAFE",
        },
        secondary: {
          DEFAULT: "#FACC15", // yellow
          hover: "#EAB308",
        },
        text: {
          heading: "#0F172A",
          sub: "#1E293B",
          body: "#334155",
          muted: "#64748B",
        },
        surface: {
          base: "#F8FAFC",
          card: "#FFFFFF",
          alt: "#F1F5F9",
          border: "#E2E8F0",
        },
        status: {
          success: "#16A34A",
          error: "#DC2626",
          warning: "#F97316",
          info: "#0EA5E9",
        },
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches Vercel's expected output
  },
});
