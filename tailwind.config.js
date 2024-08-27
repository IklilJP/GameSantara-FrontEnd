/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorBorder: "#FFFFFF33",
        black: "#1d232a",
        softBlack: "#282D34",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["dark"],
  },
};
