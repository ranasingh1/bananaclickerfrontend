/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bananaYellow: {
          light: '#FFF8D4',
          DEFAULT: '#FFE135',
          dark: '#E6C200',
        },
      }
    },
  },
  plugins: [],
};
