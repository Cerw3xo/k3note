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
                'k3-blue': '#063f6f',
                'k3-green': '#00BC97',
                'k3-violet': '#A072B5',
                'font-prim': '#111827',
                'font-sec': '#6b7280'
            }
        },
    },
    plugins: [],
}