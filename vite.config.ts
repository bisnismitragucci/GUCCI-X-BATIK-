import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using '.' prevents issues with process.cwd() in some environments
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY to be replaced by the actual value during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  }
})