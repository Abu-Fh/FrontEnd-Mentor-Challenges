/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Manrope"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          100: "hsl(174, 77%, 80%)",
          400: "hsl(174, 86%, 45%)",
        },
        orange: {
          100: "hsl(0, 89%, 96%)",
          400: "hsl(15, 100%, 70%)",
        },
        indigo: {
          200: "hsl(226, 100%, 87%)",
        },
        slate: {
          50: "hsl(230, 100%, 99%)",
          200: "hsl(224, 65%, 95%)",
          300: "hsl(223, 50%, 87%)",
          400: "hsl(225, 20%, 60%)",
          800: "hsl(227, 35%, 25%)",
        },
      }
    },
  },
  plugins: [],
}