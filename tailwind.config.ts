import type { Config } from "tailwindcss";
const {fontFamily} = require('tailwindcss/defaultTheme')
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
         primary:"#026057",
         secondary:"#F2C641",
         'dark-primary':'rgba(29, 78, 216,0)',
         light:"rgba(17,24,39,.7)",
         tertiary:{
          dark:"#5b21b6",
          light:"#7c3aed",
          disable:'#8b5cf6',
         },
         'light-shadow':'rgba(31,41,55,.4)',
      },
      fontFamily:{
        poppins:['var(--font-poppins)',...fontFamily.sans]
      }
  },
},
darkMode:"class",
  plugins: [],
};
export default config;
