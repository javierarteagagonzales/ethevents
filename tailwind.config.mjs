/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#030407',
        surface: {
          DEFAULT: 'rgba(13, 16, 23, 0.7)',
          2: 'rgba(22, 27, 34, 0.9)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          bright: 'rgba(255, 255, 255, 0.15)',
        },
        accent: {
          DEFAULT: '#627eea',
          2: '#8a9ff5',
          glow: 'rgba(98, 126, 234, 0.15)',
        },
        muted: '#94a3b8',
        success: '#10b981',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        pulse: 'pulse 2s infinite',
        shimmer: 'shimmer 4s linear infinite',
        spin: 'spin 0.8s linear infinite',
        'modal-fade': 'modalFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        shimmer: {
          to: { backgroundPosition: '200% center' },
        },
        modalFade: {
          from: { opacity: '0', transform: 'scale(0.95) translateY(30px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
