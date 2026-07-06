import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#14aec2',
          hover: '#119ab0',
          soft: 'rgba(20, 174, 194, 0.14)',
        },
      },
      fontFamily: {
        sans: [
          'IBM Plex Sans',
          'IBM Plex Sans SC',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: ['IBM Plex Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 34px rgba(20, 174, 194, 0.24)',
        surface:
          '0 1px 2px rgba(0,0,0,0.26), 0 22px 80px -44px rgba(20,174,194,0.38)',
      },
    },
  },
  plugins: [],
};

export default config;
