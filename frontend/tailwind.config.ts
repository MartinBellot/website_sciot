import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8d4932',
          dark: '#6b3a28',
          darker: '#4d2a1c',
          light: '#a85640',
        },
        secondary: {
          DEFAULT: '#6caab9',
          dark: '#4d97aa',
          light: '#89bec8',
        },
        accent: '#b88a68',
        cream: '#f5ebe0',
      },
      fontFamily: {
        jost: ['var(--font-jost)', 'Jost', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
