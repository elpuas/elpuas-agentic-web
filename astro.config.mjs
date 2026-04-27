// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
	site: 'https://elpuas.com',
	output: 'server',
	adapter: netlify(),
	integrations: [mdx(), sitemap()],
})
