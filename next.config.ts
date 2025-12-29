import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '6xyeaqmmm5mbixtv.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'blob.vercel-storage.com',
      },
      // Pattern pour accepter tous les sous-domaines public.blob.vercel-storage.com
      // Note: Next.js ne supporte pas les wildcards, donc chaque sous-domaine doit être ajouté manuellement
      // ou utilisez unoptimized: true pour les images blob
    ],
    // Si vous avez plusieurs stores blob avec des sous-domaines différents,
    // vous pouvez désactiver l'optimisation pour les images blob :
    // unoptimized: true,
  },
}

export default nextConfig