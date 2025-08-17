/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {


        background: '#121212',
        surface: '#1e1e1e',
        primary: '#ffd66c',
        secondary: '#d8d8d8',
        onSurface: '#FFD369',
        onPrimary: '#e1e1e1',
        onSecondary: '#000000',


      }
    },
  },
  plugins: [],
}


