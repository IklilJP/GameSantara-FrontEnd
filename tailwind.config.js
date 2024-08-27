/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderBottom: "#FFFFFF33",
        black: "#1d232a",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["dark"],
  },
};
