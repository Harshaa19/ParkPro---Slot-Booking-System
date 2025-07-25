import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme: {
  extend: {
    animation: {
      'slide-in-left': 'slide-in-left 0.3s ease-out',
    },
    keyframes: {
      'slide-in-left': {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' },
      },
    },
  },
},
  plugins: [
    react(),
    tailwindcss(),
    
  ],
})