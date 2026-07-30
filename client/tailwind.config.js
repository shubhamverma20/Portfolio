/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // cyan-500
          600: '#0284c7',
          700: '#0369a1',
        },
        dark: {
          bg: '#030712', // slate-950/gray-950
          card: 'rgba(17, 24, 39, 0.45)', // translucent dark gray
          border: 'rgba(255, 255, 255, 0.08)', // ultra-thin border
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
