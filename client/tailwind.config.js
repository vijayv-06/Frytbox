/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F2137',
          darkNavy: '#081426',
          deepBlue: '#0A192F',
          primary: '#1D4ED8',      // Professional Corporate Blue
          primaryHover: '#1E40AF',
          accent: '#2563EB',
          sky: '#0284C7',
          lightBlue: '#EFF6FF',
          white: '#FFFFFF',
          offWhite: '#F8FAFC',
          lightGrey: '#E2E8F0',
          darkText: '#0F172A',
          slate: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
