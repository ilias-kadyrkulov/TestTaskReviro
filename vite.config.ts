import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
            'process.env.WEATHER_API_URL': JSON.stringify(env.WEATHER_API_URL),
            'process.env.FORECAST_API_URL': JSON.stringify(
                env.FORECAST_API_URL
            ),
            'process.env.GEO_API_URL': JSON.stringify(env.GEO_API_URL),
            'process.env.ICON_API_URL': JSON.stringify(env.ICON_API_URL)
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@': '/src'
            }
        }
    }
})
