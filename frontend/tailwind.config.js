/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
        fontFamily: {
        savate: ['Savate', 'sans-serif'],
        oooh: ['"Oooh Baby"', 'cursive'],
        serif: ['Quattrocento', 'serif'],
        sans: ['Manrope', 'sans-serif'],
    },
  },
},
  plugins: [],
}

