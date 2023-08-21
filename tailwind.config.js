/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        8: "repeat(8, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
