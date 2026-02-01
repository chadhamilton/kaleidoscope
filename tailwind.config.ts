import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kaleidoscope Brand Colors
        'kc-blue': '#2ea3f2',        // Primary brand blue
        'kc-blue-dark': '#1a8fd8',   // Darker blue for hover
        'kc-blue-light': '#e8f4fd',  // Light blue background
        'kc-slate': '#333333',       // Dark text
        'kc-gray': '#666666',        // Body text
        'kc-mist': '#999999',        // Muted text
        'kc-cloud': '#e5e5e5',       // Borders
        'kc-pearl': '#f8f9fa',       // Light backgrounds
        'kc-white': '#ffffff',       // White
        // Accent colors
        'kc-success': '#28a745',     // Green for success
        'kc-warning': '#ffc107',     // Yellow for warnings
        'kc-error': '#dc3545',       // Red for errors
        'kc-info': '#17a2b8',        // Teal for info
      },
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'sans-serif'],
        heading: ['Open Sans', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
