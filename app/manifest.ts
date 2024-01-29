import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tablesucker',
    short_name: 'Tablesucker',
    description: 'See who sucks at tablesoccer',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
