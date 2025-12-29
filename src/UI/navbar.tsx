"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Navlinks } from "@/lib/constantes";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Pages où la navbar ne doit pas être affichée
  const hideNavbarPages = ['/auth/login', '/auth/register'];
  const shouldHideNavbar = hideNavbarPages.includes(pathname);

  // Calculer les liens à afficher AVANT les return conditionnels
  const linksToRender = React.useMemo(
    () => Navlinks.filter((l) => isAuthenticated || l.label !== "Gestion"),
    [isAuthenticated]
  );

  // Debug temporaire
  console.log("Navbar - isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  // Si on doit cacher la navbar, ne rien afficher
  if (shouldHideNavbar) {
    return null;
  }

  // Si on charge encore l'état d'authentification, afficher une navbar basique
  if (isLoading) {
    return (
      <div className="text-interface flex justify-between py-4 md:px-[80px] px-4 items-center relative">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={22} height={25} />
          <h2>ECO DIDA</h2>
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      
      // Déclencher l'événement de changement d'authentification
      window.dispatchEvent(new CustomEvent('auth-changed'));
      
      // Rediriger vers la page de connexion
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  return (
    <div className="text-interface flex justify-between py-4 md:px-[80px] px-4 items-center relative">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Image src="/images/logo.png" alt="Logo" width={122} height={25} className="w-[100px] md:w-[120px]" />
      </motion.div>

      <motion.button
        className="sm:hidden block z-20"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <motion.svg
          width="32"
          height="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </motion.svg>
      </motion.button>

      <div className="md:flex hidden  items-center gap-4">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flexCenter md:gap-[30px] md:flex hidden "
        >
          {linksToRender.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative group cursor-pointer "
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className="hover:text-[#5937E0] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Bouton de déconnexion pour les utilisateurs connectés */}
        {isAuthenticated && (
          <motion.button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Déconnexion
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-6 bg-white absolute top-full left-0 w-full py-6 px-8 z-10 sm:hidden"
          >
            {linksToRender.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-[#5937E0] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
            
            {/* Bouton de déconnexion dans le menu mobile */}
            {isAuthenticated && (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: linksToRender.length * 0.1 }}
                className="relative group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="hover:text-red-500 transition-colors duration-300 text-left w-full"
                  >
                    Déconnexion
                  </button>
                </motion.div>
              </motion.li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
