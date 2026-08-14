import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // expose both the original kebab-case name and a camelCase alias,
      // so JSX can write styles.statusRow for a .status-row class
      localsConvention: 'camelCase',
    },
  },
})
