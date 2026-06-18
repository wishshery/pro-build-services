import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages project sites the app is served from /<repo-name>/.
// Set base to './' so assets resolve correctly on Pages AND Vercel/local.
// If you rename the repo you do NOT need to change anything here.
export default defineConfig({
  plugins: [react()],
  base: './',
})
