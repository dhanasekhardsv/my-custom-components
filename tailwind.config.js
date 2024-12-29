/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gray': 'radial-gradient(circle, rgb(148, 163, 184), transparent)',
      },
    },
  },
  plugins: [],
}