import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.ASTRO_BASE ?? '/'

export default defineConfig({
  site: 'https://nadia.luczak.org',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
