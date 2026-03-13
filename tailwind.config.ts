import type { Config } from 'tailwindcss';

/** Couleurs liées au thème système (jour/nuit) via CSS variables */
const appColors = {
  background: 'var(--background)',
  surface: 'var(--surface)',
  surfaceElevated: 'var(--surface-elevated)',
  muted: 'var(--muted)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  text: 'var(--foreground)',
  'text-secondary': 'var(--text-secondary)',
  'text-tertiary': 'var(--text-tertiary)',
  border: 'var(--border)',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: appColors,
      fontFamily: {
        ethnocen: ['Ethnocen', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.6', boxShadow: '0 0 20px var(--tw-shadow-color)' },
          '100%': { opacity: '1', boxShadow: '0 0 30px var(--tw-shadow-color)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px var(--primary-glow)',
        'glow-primary-lg': '0 0 40px var(--primary-glow)',
        'glow-secondary': '0 0 20px rgba(80, 20, 160, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
