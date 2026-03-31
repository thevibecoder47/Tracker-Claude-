import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'cursive'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          blue: '#4F8CFF',
          pink: '#FF7EB3',
          purple: '#A78BFA',
          cyan: '#22D3EE',
          green: '#34D399',
          orange: '#FB923C',
          yellow: '#FBBF24',
        },
      },
      backdropBlur: { card: '16px' },
      borderRadius: { card: '20px' },
      boxShadow: {
        card: '0 8px 32px rgba(15,23,42,0.08)',
        'card-dark': '0 8px 32px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(79,140,255,0.3)',
      },
      animation: {
        'count-up': 'countUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
