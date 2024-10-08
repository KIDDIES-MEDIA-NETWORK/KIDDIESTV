/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#386299",
        gradfrom: "#9736AD",
        gradto: "#3281FF",
        orange: "#F77B11",
        secondary: "#FFB28A",
      },
      fontFamily: {
        schoolbell: ['"Schoolbell"', "sans-serif"],
        gloria: ['"Gloria Hallelujah"', "sans-serif"],
        nunito: ['"nunito"', "sans-serif"],
        modak:['"Modak"', 'sans-serif'],
        lucky:['"Luckiest Guy"', 'sans-serif'],
        sniglet:['"Sniglet"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
