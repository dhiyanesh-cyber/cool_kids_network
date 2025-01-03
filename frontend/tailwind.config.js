// tailwind.config.js

import { nextui } from "@nextui-org/theme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{jsx,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'golden-gradient': 'linear-gradient(135deg, #5e00b3 0%, #a300b3 100%)',
      },
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
  plugins: [nextui(), addVariablesForColors],
}