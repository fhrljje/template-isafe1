/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Red - from logo
        primary: {
          400: '#EF4444',
          500: '#E63946',
          600: '#DB0212',
          700: '#B80210',
        },
        // Dark Blue - from logo
        darkblue: {
          600: '#002A5B',
          700: '#001F42',
          800: '#001535',
          900: '#000D24',
          950: '#000816',
        },
        // Keep slate for cards
        slate: {
          850: '#0a1628',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #001F42 1px, transparent 1px), linear-gradient(to bottom, #001F42 1px, transparent 1px)",
      }
    }
  },
  plugins: [],
}
