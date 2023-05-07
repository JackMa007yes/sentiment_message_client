/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-text': '#76777e',
        'primary-bg': '#20232b',
        'primary-color': '#9c27b0',
        'icon-color': '#a9adb9'
      }
    }
  },
  plugins: []
};
