/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  safelist: [
    "bg-blue-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-orange-100",
    "bg-purple-100",
  ],

  plugins: [],
};
