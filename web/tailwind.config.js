import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: ["0px 0px 5px rgba(255,255, 255, 0.35)"],
        all: ["0px 0px 5px rgba(0,0, 0, 0.15)"],
      },
      colors: {
        "primary-green": "#158807",
        "primary-orange": "#FC8700",
        "primary-blue": "#012D37",
        "secondary-blue": "#034159",
        "tertiary-blue": "#CAF1FF",
        "AUIS-teal": "#0F4A57",
        "AUIS-dark-teal": "#07242F",
        "AUIS-light-teal": "#A0B9C0",
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
  }
};
