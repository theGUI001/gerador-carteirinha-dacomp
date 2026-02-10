/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dacomp-yellow': '#FFDE59',
        'dacomp-orange': '#FFB859',
        'dacomp-orange-dark': '#D88F22',
        'dacomp-gray-dark': '#303030',
        'dacomp-gray': '#A5A5A5',
        'dacomp-gray-light': '#F6F6ED',
      },
    },
  },
  plugins: [],
}
