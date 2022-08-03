module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        128: '32rem',
        90: '90%'
      },
      width: {
        13: '12.625rem'
      },
      margin: {
        66: '0.375rem',
        22: '22rem'
      },
      inset: {
        18: '4.75rem',
        30: '7.25rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    '~plugins/vue-js-modal.js',
    require('@tailwindcss/forms')
  ]
}
