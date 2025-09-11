/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#16a34a", dark: "#22c55e" },
        night: "#0b0f0e"
      },
      boxShadow: {
        glow: "0 0 30px rgba(34,197,94,0.35)"
      }
    },
  },
  plugins: [],
}
