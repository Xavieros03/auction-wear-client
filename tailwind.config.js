/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        black: '#000',
        gold: '#FFD700',
        darkgray: '#333',
        orange: '#FFA500',
      },
      colors: {
        darkgray: '#333333',
        black: '#000',
        gold: '#FFD700',
        orange: '#FFA500', 
      },
    },
  },
  plugins: [],
}
