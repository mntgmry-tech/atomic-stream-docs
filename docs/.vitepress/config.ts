import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  lang: 'en-US',
  title: 'AtomicStream',
  description: 'Documentation for AtomicStream x402 streams',
  cleanUrls: true,
  appearance: 'force-dark',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0b0d10' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap'
      }
    ]
  ],
  vite: {
    plugins: [llmstxt()]
  },
  themeConfig: {
    siteTitle: 'AtomicStream Docs',
    nav: [
      { text: 'Get Started', link: '/getting-started' },
      { text: 'x402', link: '/x402/overview' },
      { text: 'Streams', link: '/streams/' },
      { text: 'Examples', link: '/examples/' },
      {
        text: 'Coming Soon',
        items: [
          { text: 'Traditional API Streams', link: '/coming-soon/traditional-api' },
          { text: 'WatchTower', link: '/coming-soon/watchtower' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'Quickstart', link: '/getting-started' },
          { text: 'Examples', link: '/examples/' }
        ]
      },
      {
        text: 'x402',
        items: [
          { text: 'Overview', link: '/x402/overview' },
          { text: 'Connection Flow', link: '/x402/connection-flow' },
          { text: 'WebSocket Messages', link: '/x402/websocket-messages' },
          { text: 'Stream Options', link: '/x402/options' }
        ]
      },
      {
        text: 'Streams',
        items: [{ text: 'Catalog', link: '/streams/' }]
      },
      {
        text: 'Coming Soon',
        items: [
          { text: 'Traditional API Streams', link: '/coming-soon/traditional-api' },
          { text: 'WatchTower', link: '/coming-soon/watchtower' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mntgmry-tech/atomic-stream-examples' }
    ],
    footer: {
      message: 'AtomicStream x402 streams documentation.',
      copyright: 'Copyright © 2026 AtomicStream'
    }
  }
})
