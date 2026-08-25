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
        'sans': ['"Space Mono"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          400: 'hsl(172, 67%, 45%)',
          900: 'hsl(183, 100%, 15%)',
        },
        gray: {
          50: 'hsl(189, 47%, 97%)',
          200: 'hsl(185, 41%, 84%)',
          400: 'hsl(184, 14%, 56%)',
          500: 'hsl(186, 14%, 43%)',
        },
      },
    },
    plugins: [],
  }
}