/* eslint-disable no-undef */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('assets/hero.jpg')",
      },
      colors: {
        primary: "#E0E7FF", // Navbar background
        accent: "#4F46E5", // Button background
        hover: "#6366F1", // Button hover state
        background: "#F9FAFB", // Page background
        textPrimary: "#111827", // Dark text
        textSecondary: "#6B7280", // Muted text
        border: "#E5E7EB", // Light gray borders
        subtleBg: "#EDE9FE", // Light lavender background
        cta: "#F59E0B", // Highlighted elements
      },
      lineClamp: {
        15: "15",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
