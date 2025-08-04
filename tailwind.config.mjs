/** @type {import('tailwindcss').Config} */
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
        'k3-red': '#cc071e',
        'k3-blue': '#0346F2',
        'k3-green': '#00D455',
        'k3-violet': '#A072B5',
        'font-prim': '#1A1E2C',
        'font-sec': '#8E94A7'
      }
    },
  },
  plugins: [],
}


