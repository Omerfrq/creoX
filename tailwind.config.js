/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02FAE4',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        sigmarOne: ['var(--font-sigmar)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
