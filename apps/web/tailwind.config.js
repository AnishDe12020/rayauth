/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02050D",
        "gradient-1": "#45A0F5",
        "gradient-2": "#26E3C2",
      },
    },
    fontFamily: {
      ksans: ["'Kumbh Sans', sans-serif"],
    },
  },
  plugins: [],
};
