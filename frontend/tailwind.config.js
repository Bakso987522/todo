/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  plugins: [
    require("tailwindcss-animate"),
  ],
  theme: {
    extend: {},
  }
}

