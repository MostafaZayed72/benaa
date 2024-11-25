/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // تأكد من إضافة هذا السطر
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
