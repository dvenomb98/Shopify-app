const BREAKPOINTS = require("./config/breakpoints.js");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
    colors: {
      primary: {
        amber: "#FF865E",
        purple: "#9B5DE5",
        black: "#171717",
        white: "#fafafa",
        pink: "#F15BB5",
        yellow: "#FEE440",
        pinklight: "#ffd0d5",
      },
      neutral: {
        bluedark: "#0086B3",
        blue: "#00BBF9",
        bluelight: "#7DDEFF",
        bluelight2: "#DAF6FF",
        cyan: "#00F5D4",
        overlay: "#171717",
        gray: "#4b5563",
        graylight: "#d1d5db",
        graylight3: "#f3f4f6",
        red: "#dc2626",
        redlight: "#fecaca",
        green: "#16a34a",
        greenlight: "#dcfce7",
      },
    },
    screens: {
      sm: { max: `${BREAKPOINTS.SM.MAX}px` },
      md: { max: `${BREAKPOINTS.MD.MAX}px`, min: `${BREAKPOINTS.MD.MIN}px` },
      lg: `${BREAKPOINTS.LG.MIN}px`,
      fullhd: `${BREAKPOINTS.FULLHD.MIN}px`,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...fontFamily.sans],
      },
      fontSize: {
        small: "0.85rem",
        base: "1rem",
        h4: "1.25rem",
        h3: "1.5rem",
        h2: "1.875rem",
        h1: "2.25rem",
        header: "4rem",
      },
      height: {
        heroBanner: "600px",
        articleBannerMobile: "176px",
        articleBanner: "232px",
      },
      boxShadow: {
        image: "0px 8px 24px rgba(0, 0, 0, 0.2)",
      },
    },
    plugins: [
      require("@tailwindcss/typography")
    ],
  },
};
