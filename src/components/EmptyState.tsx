"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  message?: string;
  showResetButton?: boolean;
  resetButtonText?: string;
  resetButtonHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "Aucune voiture trouvée",
  message = "Désolé, nous n'avons trouvé aucune voiture correspondant à vos critères de recherche.",
  showResetButton = true,
  resetButtonText = "Voir toutes les voitures",
  resetButtonHref = "/cars",
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Icône */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        {icon || (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </motion.div>

      {/* Titre */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-600 max-w-md mb-8 text-sm md:text-base"
      >
        {message}
      </motion.p>

      {/* Bouton d'action */}
      {showResetButton && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href={resetButtonHref}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5937E0] to-[#7c5dfa] text-white px-6 py-3 rounded-[12px] font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {resetButtonText}
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

