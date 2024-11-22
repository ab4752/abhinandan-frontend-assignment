module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode class
  theme: {
    extend: {},
    screens: {
      sm: '640px', // small devices
      md: '768px', // medium devices
      lg: '1024px', // large devices
      xl: '1280px', // extra-large devices
      '2xl': '1536px', // 2x extra-large
    },
  },
  plugins: [],
};
