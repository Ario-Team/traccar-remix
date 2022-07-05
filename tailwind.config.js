/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "unalink-blue": "#0072BC",
        "unalink-white": "#FFF",
        "unalink-blue-light": "#0072BC",
      },
      fontFamily: {
        poppins: ["Poppins", "Arial", "sans-serif"],
        notoSans: ["Noto Sans Arabic", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
