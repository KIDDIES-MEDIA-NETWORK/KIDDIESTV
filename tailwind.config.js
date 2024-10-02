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
      },
      fontFamily: {
        schoolbell: ['"Schoolbell"', "sans-serif"],
        gloria: ['"Gloria Hallelujah"', "sans-serif"],
        nunito: ['"nunito"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
