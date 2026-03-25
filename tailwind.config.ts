import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Klassenwechsel via .dark auf <html> steuert das Theme
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark-Mode Werte (Standard)
        canvas:      '#0d0d0d',
        surface:     '#1a1a1a',
        surface2:    '#252525',
        border:      '#333333',
        accent:      '#7c6af7',
        accent2:     '#4f9cf9',
        nodeDefault: '#1e1e1e',
        text:        '#e8e8e8',
        textMuted:   '#888888',
        textDim:     '#555555',
        tagDefault:  '#2a2a3e',
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
