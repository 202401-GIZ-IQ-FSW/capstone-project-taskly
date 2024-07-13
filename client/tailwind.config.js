/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        lato: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'diagonal-split': 'linear-gradient(135deg, #1e293b 50%, #1e40af 50%)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        lato: ['Lato', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'primary-blue': '#1B93FF',
        primary: '#9CCBBB',
        'primary-light': '#B8E3D2',
        'primary-dark': '#7DAE9C',
        'accent-light': '#F4DDBC',
        'accent-dark': '#5E8D7A',
        'custom-black': '#181717',
        'custom-teal': ' #149c90',
        'custom-gray': '#eee',
        'custom-black': '#181717',
        'custom-teal': ' #149c90',
        'custom-gray': '#eee'
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
};
