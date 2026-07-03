/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#020308',
        surface: {
          DEFAULT: 'rgba(10, 12, 20, 0.75)',
          2: 'rgba(18, 22, 34, 0.9)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.07)',
          bright: 'rgba(255, 255, 255, 0.14)',
        },
        accent: {
          DEFAULT: '#627eea',
          2: '#8a9ff5',
          glow: 'rgba(98, 126, 234, 0.18)',
          'glow-strong': 'rgba(98, 126, 234, 0.35)',
        },
        muted: '#7b8db0',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        content: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
        }
      },
      boxShadow: {
        'neon': '0 0 20px var(--tw-shadow-color)',
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
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
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.4s ease',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(98,126,234,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(98,126,234,0.6), 0 0 80px rgba(98,126,234,0.2)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
