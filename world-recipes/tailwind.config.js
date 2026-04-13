/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#ff5601',
        'orange-light': '#ff9560',
        'orange-bg': '#fff3e6',
      },
    },
  },
  plugins: [],
}