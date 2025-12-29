import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5937E0] text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={100}
                height={6}
              />
            </div>
            <p className="text-white/80 mb-4 max-w-md">
              Eco Dida Car - Votre partenaire de confiance pour la location de voitures à Casablanca et dans tout le Maroc. 
              Trouvez la voiture parfaite pour tous vos besoins de déplacement au Maroc.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781H6.721c-.537 0-.97.433-.97.97v8.958c0 .537.433.97.97.97h9.558c.537 0 .97-.433.97-.97V8.177c0-.537-.433-.97-.97-.97z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-[#FF9E0C] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-white/80 hover:text-[#FF9E0C] transition-colors">
                  Nos vehicules
                </Link>
              </li>
              <li>
                <Link href="/About" className="text-white/80 hover:text-[#FF9E0C] transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-white/80 hover:text-[#FF9E0C] transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF9E0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg> 
                +212701041884
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF9E0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ecodidacar@gmail.com
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-[#FF9E0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Casablanca, Maroc<br />Boulevard 2 Mars, Casablanca 20000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2025 <Link href="https://elmeskini.site/">DevUnes</Link>. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] text-sm transition-colors">
                Conditions d&apos;utilisation
              </Link>
              <Link href="#" className="text-white/70 hover:text-[#FF9E0C] text-sm transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
