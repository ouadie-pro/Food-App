/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#ff9560',
          dark: '#ff5601',
          light: '#fff3e6',
        },
      },
    },
  },
  plugins: [],
}
