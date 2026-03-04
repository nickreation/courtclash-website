import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f12',
        surface: '#1c1c1e',
        muted: '#2c2c2e',
        primary: '#0a84ff',
        text: '#ffffff',
        'text-secondary': '#8e8e93',
      },
    },
  },
  plugins: [],
};

export default config;
