/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0b1c2d',
          dark: '#061018',
          light: '#152a40',
        },
        ivory: '#f8f9fb',
        charcoal: '#1a1a1a',
        accent: {
          gold: '#c5a54d',
        },
        border: {
          muted: '#e5e7eb',
        },
        // Backward compatibility for admin and unused components
        primary: {
          blue: '#0b1c2d',
          dark: '#061018',
          light: '#152a40',
        },
        cyber: {
          black: '#1a1a1a',
          gray: '#0b1c2d',
          lightgray: '#f8f9fb',
        },
      },
      boxShadow: {
        soft: '0 4px 20px rgba(11, 28, 45, 0.06)',
        card: '0 1px 3px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
