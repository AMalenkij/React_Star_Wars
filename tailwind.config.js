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
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}
