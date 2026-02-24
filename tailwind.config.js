module.exports = {
  content: ['./index.html', './test.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Fraunces"', 'ui-serif', 'serif']
      },
      colors: {
        ink: '#0f172a',
        ocean: '#0e7490',
        ember: '#d97706',
        slate: {
          950: '#020617'
        }
      }
    }
  },
  plugins: []
};
