import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NUESTRA | The Street is Ours',
    short_name: 'NUESTRA',
    description: 'Premium streetwear brand born at the intersection of football, culture, and community.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#722F37',
    orientation: 'portrait-primary',
    categories: ['shopping', 'fashion', 'sports'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      // TODO: Add more icon sizes when available
      // {
      //   src: '/icons/icon-192x192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icons/icon-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
    ],
  }
}
