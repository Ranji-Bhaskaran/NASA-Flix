/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'title-pulse': 'pulse-glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 0 10px #dc2626)',
          },
          '50%': {
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 0px #dc2626)',
          },
        },
      },
    },
  },
  plugins: [],
};
