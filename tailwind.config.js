/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // <- ini penting, pastikan semua file HTML tercakup
    "./src/**/*.{js,ts,jsx,tsx}", // kalau kamu punya folder src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
