/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "sans": ['"DM Sans"',...defaultTheme.fontFamily.sans],
      },
      colors:{
        brown: {
          400: 'hsl(28, 10%, 53%)',
          950: 'hsl(25, 47%, 15%)',
        },
        red: {
          100: 'hsl(26, 66%, 93%)',
          500: 'hsl(10, 79%, 65%)',
        },
        blue: {
          300: 'hsl(186, 34%, 65%)',
        },
      }
    },
  },
  plugins: [],
}