/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary-dark": "var(--very-dark-magenta)",
        "primary-accent": "var(--soft-pink)",
        "neutral-gray": "var(--dark-grayish-magenta)",
        "neutral-light": "var(--light-grayish-magenta)",
      },
      fontFamily:{
        "sans": ['"League Spartan"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}


