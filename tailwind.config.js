/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        darkBlue: "rgba(17, 25, 40, 0.5)",
        borderColor: "#dddddd35",
        lightGrey: "#a5a5a5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
