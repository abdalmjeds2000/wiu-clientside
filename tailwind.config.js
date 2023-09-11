/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#609966',
      secondary: '#889EAF',
      third: '#F3D5C0',
      ...require('tailwindcss/colors')
    }
  },
  plugins: [],
  corePlugins: {
    // preflight: false
  }
}

