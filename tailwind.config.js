/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      xs: "450px",
      sm: "656px",
      ...defaultTheme.screens,
    },
    gridTemplateColumns: {
      productsGrid: "repeat(auto-fit, minmax(250px, 1fr));",
      1: "repeat(1, minmax(0, 1fr));",
      2: "repeat(2, minmax(0, 1fr));",
      3: "repeat(3, minmax(0, 1fr));",
      4: "repeat(4, minmax(0, 1fr));",
    },
    // boxShadow: {
    //   mainShadow: "1px 1px 6px #d0d0d0  ,-1px -1px 6px #f0f0f0",
    // },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("children", "&>*");
    }),
  ],
};
