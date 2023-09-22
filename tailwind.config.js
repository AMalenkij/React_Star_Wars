/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: 'var(--color-gold )',
        gray: 'var(--color-gray-dark)',
        knob_base: 'var(--color-knob-light-blue)',
        knob_elevation: 'var(--color-knob-elevation)',
      },
      boxShadow: {
        iner: 'inset 0 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'inner-100':
          'inset var(--shadow-light-100) var(--color-light-shadow), inset var(--shadow-dark-100) var(--color-dark-shadow)',
        'drop-300':
          'var(--shadow-dark-300) var(--color-dark-shadow), var(--shadow-light-300) var(--color-light-shadow)',
        'drop-400':
          'var(--shadow-dark-400) var(--color-dark-shadow), var(--shadow-light-400) var(--color-light-shadow)',
        border:
          'inset var(--shadow-border-light) var(--color-light-shadow), inset var(--shadow-border-dark) var(--color-shadow), var(--shadow-border-light) var(--color-light-shadow), var(--shadow-border-dark) var(--color-shadow)',
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}
