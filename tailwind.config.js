/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        'space-1': '0.25rem', // var(--space-1)
        'space-2': '0.5rem',  // var(--space-2)
        'space-3': '0.75rem', // var(--space-3)
        'space-4': '1rem',    // var(--space-4)
        'space-5': '1.5rem',  // var(--space-5)
        'space-6': '2rem',    // var(--space-6)
      },
      colors: {
        primary: '#FF6D00',        // var(--color-primary)
        'primary-hover': '#E65C00', // var(--color-primary-hover, darker shade)
        'on-primary': '#FFFFFF',   // var(--color-on-primary)
      },
    },
  },
  plugins: [],
};