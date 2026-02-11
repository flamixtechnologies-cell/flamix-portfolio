import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use rgb() with <alpha-value> so Tailwind opacity modifiers (e.g. bg-*/70, from-*/15) work correctly.
        background: "rgb(26 26 29 / <alpha-value>)",
        foreground: "rgb(245 245 245 / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(122 28 172 / <alpha-value>)",
          50: "#f5e8fc",
          100: "#ebd3f8",
          200: "#d7a7f1",
          300: "#c37aea",
          400: "#af4ee3",
          500: "#7A1CAC",
          600: "#62168a",
          700: "#4a1168",
          800: "#310c45",
          900: "#2E073F",
        },
        secondary: {
          DEFAULT: "rgb(173 73 225 / <alpha-value>)",
          50: "#f5e8fc",
          100: "#ebd3f8",
          200: "#d7a7f1",
          300: "#c37aea",
          400: "#AD49E1",
          500: "#8b3ab4",
          600: "#6a2c87",
          700: "#491d5a",
          800: "#270f2e",
          900: "#2E073F",
        },
        tertiary: "rgb(46 7 63 / <alpha-value>)",
        accent: "rgb(235 211 248 / <alpha-value>)",
        muted: "rgb(42 42 45 / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter-tight)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "\"Helvetica Neue\"",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "var(--font-clash-display)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "\"Helvetica Neue\"",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "\"SF Mono\"",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(122, 28, 172, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(122, 28, 172, 0.5)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;

