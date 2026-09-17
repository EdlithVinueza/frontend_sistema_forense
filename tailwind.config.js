/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-container': '#131b2e',
        secondary: '#006c49',
        'secondary-container': '#6cf8bb',
        surface: '#f7f9fb',
        outline: '#e0e3e5',
      },
      fontFamily: {
        heading: ['Geist', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
