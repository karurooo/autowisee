/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Corrected file extensions
    './components/**/*.{js,ts,jsx,tsx}', // Corrected file extensions
  ],
  presets: [require('nativewind/preset')], // Corrected presets syntax
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#20B2AA',
        accent: '#FF6347',
        text_primary: '#000000',
        text_secondary: '#333333',
        error: '#FF0000',
        success: '#00FF00',
      },
    },
  },
  plugins: [], // Corrected plugins syntax
};
