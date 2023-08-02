/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-mono": ["Roboto Mono", "monospace"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "voyage-green": "#36413F",
        "voyage-grey": "#D9D9D9",
        "voyage-black": "#2D2D2D",
        "voyage-white": "#F8F8F8",
      },
    },
  },
  plugins: [],
};
