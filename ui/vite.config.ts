import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [react()],
  resolve: {
    alias: [
    {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
    },
  ]
}
})
