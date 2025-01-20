/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'constellation': {
          dark: '#1a1b2e',
          light: '#e2e8f0',
          accent: '#8b5cf6',
        },
        'cosmic': {
          pink: {
            light: '#ff80bf',
            DEFAULT: '#ff3399',
            dark: '#cc0066'
          },
          purple: {
            light: '#b794f4',
            DEFAULT: '#805ad5',
            dark: '#553c9a'
          },
          indigo: {
            light: '#7f9cf5',
            DEFAULT: '#5a67d8',
            dark: '#434190'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
