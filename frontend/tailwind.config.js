/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{html,js,ts,jsx,tsx}",  // Include all files in frontend
    "./src/**/*.{html,js,ts,jsx,tsx}",      // Keep src folder if it has other files
  ],
  theme: {
    extend: {
      colors: {
        "variable-collection-black": "var(--variable-collection-black)",
        "variable-collection-blue": "var(--variable-collection-blue)",
        "variable-collection-teal": "var(--variable-collection-teal)",
        "gv": "var(--color-gv)",
        "gte": "var(--color-gte)",
        "gta": "var(--color-gta)",
      },
      fontFamily:{
        kalam: ['Kalam', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        lato:['Lato','sans-serif'],
        raleway:['Raleway','sans-serif']
      }
    },
  },
  plugins: [],
};