/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'blg': '1070px',
        'md': '900px',
        'sm' : '750px',
        'l': '650px'
      },
    },
  },
  plugins: [],
}

