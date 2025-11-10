/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // Look for .jsx files
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          500: '#10b981',
        },
      },
      dark: {
          bg: '#121212',        // Main background - pure dark
          'bg-alt': '#1a1a1a',  // Alternative background
          card: '#1e1e1e',      // Card/panel background
          border: '#2a2a2a',    // Border color
          text: '#e5e5e5',      // Primary text
          muted: '#a0a0a0',     // Muted/secondary text
        },
    },
  },
  plugins: [],
}