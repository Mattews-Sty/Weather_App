/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue,html}",
    ],
    theme: {
      extend: {
        colors: {
          darkblue: '#1E232C',
        },
        fontFamily: {
          urbanist: ['Urbanist', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  