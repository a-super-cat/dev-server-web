/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue"
  ],
  theme: {
    extend: {
      minHeight: {
        '64': '16rem',
      },
      minWidth: {
        '20': '5rem',
        '24': '6rem',
      },
      colors: {
        primary: {
          normal: '#3b82f6',
          light: '#409eff',
        }
      },
    },
  },
  plugins: [],
}

