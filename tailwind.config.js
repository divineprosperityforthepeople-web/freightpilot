/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf3',
          100: '#c5d1e0',
          200: '#9fb3cc',
          300: '#7995b8',
          400: '#5c7ea8',
          500: '#0F2D52',
          600: '#0d2647',
          700: '#0a1f3b',
          800: '#08182f',
          900: '#05101f',
        },
        secondary: {
          50: '#e3f0fd',
          100: '#b8d9fa',
          200: '#8ac0f7',
          300: '#5ca7f4',
          400: '#3a93f1',
          500: '#1E88E5',
          600: '#1a7ac8',
          700: '#1568a7',
          800: '#105686',
          900: '#0a3d5e',
        },
        accent: {
          50: '#e6f9ed',
          100: '#c2f0d3',
          200: '#99e6b7',
          300: '#70dc9b',
          400: '#52d486',
          500: '#34A853',
          600: '#2d9648',
          700: '#247f3c',
          800: '#1b6830',
          900: '#0f4b20',
        },
        bg: {
          light: '#F8FAFC',
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};