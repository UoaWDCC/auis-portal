import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {
      colors: {
        "primary-green": "#158807",
        "primary-orange": "#FC8700",
        "primary-blue": "#012D37",
        "secondary-blue": "#034159",
        "tertiary-blue" : "#CAF1FF",
      },
      fontFamily: {
        sans: ["Montserrat"],
        body: ["Open Sans"],
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes.light,
          accent: "#087df1",
        },
        dark: {
          ...themes.dark,
          accent: "#087df1",
        },
      },
    ],
  },
};
