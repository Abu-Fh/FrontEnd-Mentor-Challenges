/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./dist/*.{html,js}',
    './src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['"Poppins"',...defaultTheme.fontFamily.sans]
      },
      colors:{
        purple:{
          700:'hsl(248, 32%, 49%)',
          350:'hsl(246, 25%, 77%)'
        },
        red:{
          400:'hsl(0, 100%, 74%)',
        },
        green:{
          400:'hsl(154, 59%, 51%)',
        },
        gray:{
          900: 'hsl(249, 10%, 26%)',
        },
      },
    },
  },
  plugins: [],
}

