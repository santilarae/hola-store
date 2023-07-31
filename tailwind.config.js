/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D6282B',
        secondary: '#FA9E40',
        light: '#FFFEFE',
        dark: '#2F2F2F',
        neutral: '#CCCCCC'
      }
    }
  },
  plugins: []
}
