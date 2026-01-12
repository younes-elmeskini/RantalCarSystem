import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/UI/navbar";
import Footer from "@/UI/footer";
import PageTransition from "@/components/animations/PageTransition";
import { CarProvider } from "@/lib/hooks/useCarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Dida Car - Location de Voitures à Casablanca, Maroc | Location Voiture Maroc",
  description: "Eco Dida Car : Location de voitures à Casablanca et dans tout le Maroc. Large gamme de véhicules disponibles, tarifs compétitifs, réservation en ligne facile. Service de location de voiture professionnel au Maroc.",
  keywords: [
    "location voiture casablanca",
    "location voiture maroc",
    "eco dida car",
    "location de voiture casablanca",
    "location de voiture maroc",
    "louer voiture casablanca",
    "louer voiture maroc",
    "location auto casablanca",
    "location auto maroc",
    "rent a car casablanca",
    "rent a car maroc",
    "voiture de location casablanca",
    "agence location voiture maroc"
  ],
  authors: [{ name: "Eco Dida Car" }],
  creator: "Eco Dida Car",
  publisher: "Eco Dida Car",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ecodidacar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Eco Dida Car - Location de Voitures à Casablanca, Maroc",
    description: "Location de voitures à Casablanca et dans tout le Maroc. Large gamme de véhicules disponibles, tarifs compétitifs, réservation en ligne facile.",
    url: 'https://ecodidacar.vercel.app',
    siteName: "Eco Dida Car",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Eco Dida Car - Location de voitures Casablanca Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Dida Car - Location de Voitures à Casablanca, Maroc",
    description: "Location de voitures à Casablanca et dans tout le Maroc. Large gamme de véhicules disponibles.",
    images: ["/images/Hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/icon.png", 
  },
};

// Structured Data JSON-LD pour le SEO
function getStructuredData() {
  const siteUrl = "https://ecodidacar.vercel.app/";
  return {
    "@context": "https://schema.org",
    "@type": "CarRental",
    "name": "Eco Dida Car",
    "description": "Location de voitures à Casablanca et dans tout le Maroc",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "image": `${siteUrl}/images/Hero.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Casablanca",
      "addressCountry": "MA",
      "addressRegion": "Casablanca-Settat"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.570229",
      "longitude": "-7.621388"
    },
    "telephone": "+212 660 474 127",
    "email": "ecodidacar@gmail.com",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Maroc"
    },
    "sameAs": [
      "https://www.facebook.com/Eco-Dida-Car-100078034831209",
      "https://www.instagram.com/eco_dida_car?igsh=d3lxMHVlczg3aG03",
      "https://www.tiktok.com/@ecodiidacar"
    ]
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CarProvider>
          <Navbar />
          <main className="min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </CarProvider>
      </body>
    </html>
  );
}
