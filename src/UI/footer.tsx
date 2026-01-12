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
                className="filter brightness-0 invert"
              />
            </div>
            <p className="text-white/80 mb-4 max-w-md">
              Eco Dida Car - Votre partenaire de confiance pour la location de voitures à Casablanca et dans tout le Maroc. 
              Trouvez la voiture parfaite pour tous vos besoins de déplacement au Maroc.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/Eco-Dida-Car-100078034831209" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
              <Image src="/icons/facebook.png" alt="Facebook" width={40} height={40} />
              </Link>
              <Link href="https://www.instagram.com/eco_dida_car?igsh=d3lxMHVlczg3aG03" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
              <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
              </Link>
              <Link href="https://www.tiktok.com/@ecodiidacar" className="text-white/70 hover:text-[#FF9E0C] transition-colors">
              <Image src="/icons/tik-tok.png" alt="Tik-Tok" width={40} height={40} />
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
                +212660-474127
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
