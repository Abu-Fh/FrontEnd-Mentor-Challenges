/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./dist/index.html",
    "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        pink:{
          400: 'hsl(0, 36%, 70%)',
        }
      },
      fontFamily: {
        'sans': ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
