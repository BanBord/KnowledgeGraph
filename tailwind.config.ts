import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:      '#0d0d0d',   // Haupt-Canvas-Hintergrund (fast schwarz)
        surface:     '#1a1a1a',   // Panels, Sidebar, Cards
        surface2:    '#252525',   // Karten-Hover, erhöhte Elemente
        border:      '#333333',   // Dezente Trennlinien
        accent:      '#7c6af7',   // Lila-Akzent (Obsidian-Lila) — aktive Nodes
        accent2:     '#4f9cf9',   // Blau für Links/Connections
        nodeDefault: '#1e1e1e',   // Normaler Node-Hintergrund
        text:        '#e8e8e8',   // Primärer Text
        textMuted:   '#888888',   // Nebentext, Labels
        textDim:     '#555555',   // Sehr dezenter Text
        tagDefault:  '#2a2a3e',   // Default Tag-Hintergrund
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
