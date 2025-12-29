This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Configuration Vercel Blob Storage

Pour que l'upload d'images fonctionne, vous devez configurer Vercel Blob Storage :

### Sur Vercel (Production)

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Storage** > **Create Database** > **Blob**
4. Créez un nouveau store Blob
5. Vercel créera automatiquement la variable d'environnement `BLOB_READ_WRITE_TOKEN`

### En développement local

1. Obtenez votre token depuis le dashboard Vercel :
   - Allez dans **Settings** > **Environment Variables**
   - Copiez la valeur de `BLOB_READ_WRITE_TOKEN`
2. Créez un fichier `.env.local` à la racine du projet :
   ```
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-secret-key"
   ```

**Note :** Le token `BLOB_READ_WRITE_TOKEN` est automatiquement injecté par Vercel en production. Vous n'avez besoin de le configurer manuellement que pour le développement local.

### Configuration des domaines d'images

Si vous utilisez Vercel Blob Storage pour les images, vous devez ajouter le domaine de votre store blob dans `next.config.ts`. Chaque store blob a un sous-domaine unique (ex: `6xyeaqmmm5mbixtv.public.blob.vercel-storage.com`).

Pour ajouter un nouveau domaine blob :

1. Ouvrez `next.config.ts`
2. Ajoutez le domaine dans `remotePatterns` :
   ```typescript
   {
     protocol: 'https',
     hostname: 'votre-sous-domaine.public.blob.vercel-storage.com',
   }
   ```

**Note :** Si vous avez plusieurs stores blob avec des sous-domaines différents, vous pouvez désactiver l'optimisation des images en ajoutant `unoptimized: true` dans la configuration `images` de `next.config.ts`.
