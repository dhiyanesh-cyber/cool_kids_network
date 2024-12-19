/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{jsx,js}"
  ],
  theme: {
    extend: {
      colors: {
        'cool-blue': '#257180',
        'cool-blue-dark': '#1c5964',
        'cool-green': '#10B981',
        'cool-gray': '#6B7280',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}