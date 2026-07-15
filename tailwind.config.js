/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-oak': 'var(--surface-oak)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'accent-gold': 'var(--accent-gold)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        '2xl': '1.25rem', // 20px
        '3xl': '1.5rem',  // 24px
      },
      boxShadow: {
        'warm': '0 20px 40px -15px rgba(47, 36, 29, 0.6)',
        'glow-green': '0 0 15px rgba(63, 107, 75, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      }
    },
  },
  plugins: [],
}