/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',    // Azul profundo
        secondary: '#DC2626',  // Vermelho
        accent: '#EA580C',     // Laranja
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Ativa dark mode com classe .dark no <html>
};
