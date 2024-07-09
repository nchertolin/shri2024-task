import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: 'https://nchertolin.github.io/shri2024-task/',
})
