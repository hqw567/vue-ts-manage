/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.vue', './src/components/**/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
