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
        'deep-space': '#0a0e1a',
        'dark-purple': '#1a1a2e',
        'neon-cyan': '#00D4FF',
        'neon-magenta': '#FF00FF',
        'electric-blue': '#00FFFF',
        'neon-green': '#00FF41',
        'steel-blue': '#16213e',
        'pure-white': '#FFFFFF',
        'light-gray': '#B8B8B8',
        'dark-gray': '#4A4A4A',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px currentColor' },
          '50%': { boxShadow: '0 0 40px currentColor, 0 0 60px currentColor' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
