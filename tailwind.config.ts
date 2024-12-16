import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      white: "var(--white)",
      black: "var(--black)",
      gray: {
        100: "#f2f4f8",
        300: "#cfdbea",
        500: "#9FACBD",
        800: "#2d3034",
      },
    },
    screens: {
      desktop: "1920px",
      // => @media (min-width: 1920px) { ... }

      tablet: "744px",
      // => @media (min-width: 744px) { ... }

      mobile: "375px",
      // => @media (min-width: 375px) { ... }
    },
    extend: {
      fontSize: {
        "3xl": [
          "3.2rem",
          {
            lineHeight: "4.2rem",
          },
        ],
        "2xl": [
          "2.4rem",
          {
            lineHeight: "3.2rem",
          },
        ],
        xl: [
          "2rem",
          {
            lineHeight: "3.2rem",
          },
        ],
        "2lg": [
          "1.8rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        lg: [
          "1.6rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        md: [
          "1.4rem",
          {
            lineHeight: "2.4rem",
          },
        ],
        sm: ["1.3rem", { lineHeight: "2.2rem" }],
        xs: ["1.2rem", { lineHeight: "2rem" }],
        "xs-tight": [
          "1.2rem",
          {
            lineHeight: "1.8rem",
          },
        ],
      },
      fontWeight: {
        regular: "var(--regular)",
        medium: "var(--medium)",
        semiBold: "var(--semi-bold)",
        bold: "var(--bold)",
      },
    },
  },
  plugins: [],
} satisfies Config;
