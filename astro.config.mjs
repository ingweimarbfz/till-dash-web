import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Dirección pública del sitio (canónicas, sitemap y Open Graph). Se define en SITE_URL al publicar.
const site = process.env.SITE_URL || 'https://till-dash-web.vercel.app'

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })]
})
