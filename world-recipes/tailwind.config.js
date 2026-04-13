/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#ea580c',
        'orange-light': '#f97316',
        'orange-bg': '#fff7ed',
      },
    },
  },
  plugins: [],
}