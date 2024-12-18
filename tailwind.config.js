/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        darkLight: "#"
      },
      fontFamily: {
        BrandFont: ["Poppins","sans-serif"]
      }
    },
    container: {
      center: true
    },
  },
  plugins: [],
}

