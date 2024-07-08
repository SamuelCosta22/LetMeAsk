/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    boxShadow: {
      'new': '0 2px 12px -15px rgba(0, 0, 0, 0.04)',
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}