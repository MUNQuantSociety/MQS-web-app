/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",  ],
  theme: {
    extend: {      
      fontFamily: {
        abril: ["Abril Fatface", "cursive"],
        alegreyaSans: ["Alegreya Sans SC", "sans-serif"],
        ancizar: ["Ancizar Sans", "sans-serif"],
        battambang: ["Battambang", "cursive"],
        exo2: ["Exo 2", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        josefin: ["Josefin Sans", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        robotomono: ["Roboto Mono", "monospace"],
        rubik: ["Rubik", "sans-serif"],
        worksans: ["Work Sans", "sans-serif"],
        alegreya: ["Alegreya", "serif"]
      },
          fontSize: {
        "xs": "clamp(0.5rem, 0.5vw, 1rem)",
        "sm": "clamp(1rem, 1.1vw, 2rem)",
        "base": "clamp(1rem, 1.25vw, 1rem)",
        "lg": "1.1vw",
        "xl": "clamp(1rem, 1.3vw, 1.6rem)",
        "2xl": "clamp(1.1rem, 1.8vw, 1.8rem)",
        "2.5xl": "clamp(1.1rem, 2vw, 2.1rem)",
        "3xl": "4vw",
        "3.5xl": "5.5vw",
        "4xl": "clamp(3rem, 7vw, 5rem)",
        "5xl": "10vw",
        "6xl": "12vw",
        "7xl": "14vw",
        "8xl": "16vw",
        "9xl": "18vw",
      },
      colors: {
        "primary": "#2c2c2c",
        "accentPink": "#e0586f",
        "accentGreen": "#326c62",
        "text": "#e6e6e6",
        "backgroundBG": "#212121",
        "turqoise": "#90D4C5",
        "tan": "#89897d",
    },
  },
  plugins: [],
}
}
