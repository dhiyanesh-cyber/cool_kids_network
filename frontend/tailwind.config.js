// tailwind.config.js

import { nextui } from "@nextui-org/theme";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{jsx,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a', // Very dark background
        'dark-card': '#121212', // Dark card color
        'dark-text': '#e5e5e5', // Light text color for contrast
        'dark-border': '#1f1f1f', // Border color for dark mode
        'dark-hover': '#8c8c8c', // Hover color for dark mode
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}