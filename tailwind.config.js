/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // تأكد من إضافة هذه السطر
    content: [
      './pages/**/*.{vue,js,ts,jsx,tsx}',
      './components/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  