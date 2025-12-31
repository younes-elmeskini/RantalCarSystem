"use client";
import React, { useState } from "react";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import { X, Filter, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface FilterTypeProps {
  selectedGamme: string;
  selectedType: string;
  selectedBrand: string;
  selectedFuelType: string;
  selectedTransmission: string;
  onChangeGamme: (value: string) => void;
  onChangeType: (value: string) => void;
  onChangeBrand: (value: string) => void;
  onChangeFuelType: (valur: string) => void;
  onChangeTransmission: (value: string) => void;
}

export default function FilterType({
  selectedGamme,
  selectedType,
  selectedBrand,
  selectedFuelType,
  selectedTransmission,
  onChangeGamme,
  onChangeType,
  onChangeBrand,
  onChangeFuelType,
  onChangeTransmission,
}: FilterTypeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    onChangeGamme("All");
    onChangeType("All");
    onChangeBrand("All");
    onChangeFuelType("All");
    onChangeTransmission("All");
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = 
    selectedGamme !== "All" ||
    selectedType !== "All" ||
    selectedBrand !== "All" ||
    selectedFuelType !== "All" ||
    selectedTransmission !== "All";

  return (
    <div className="px-4 w-full mb-6">
      {/* Bouton Toggle pour Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-[55px] h-[55px] flex items-center justify-center bg-gradient-to-r from-[#5937E0] to-[#7c5dfa] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
          {hasActiveFilters && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </motion.button>
      </div>

      {/* Menu de filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'} 
          md:translate-y-0 md:opacity-100 md:pointer-events-auto
          fixed md:relative
          bottom-0 md:bottom-auto
          left-0 md:left-auto
          right-0 md:right-auto
          bg-white
          shadow-2xl md:shadow-xl
          rounded-t-3xl md:rounded-2xl
          p-6 md:p-6
          z-40
          transition-all duration-300 ease-in-out
          w-full 
          md:max-w-7xl
          md:mx-auto
          md:bg-gradient-to-br md:from-blue-50 md:via-purple-50 md:to-indigo-50
          border-t-4 md:border-t-0 border-[#5937E0]
        `}
      >
            {/* Header avec titre et bouton reset */}
            <div className="flex justify-between items-center mb-6 md:mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#5937E0]" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  Filtrer les voitures
                </h3>
              </div>
              {hasActiveFilters && (
                <motion.button
                  onClick={resetFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </motion.button>
              )}
            </div>

            {/* Grille de filtres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4">
              {/* Gamme */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5937E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gamme de prix
                </label>
                <select
                  value={selectedGamme}
                  onChange={(e) => onChangeGamme(e.target.value)}
                  className="w-full p-3 px-4 border-2 border-gray-200 rounded-xl cursor-pointer bg-white hover:border-[#5937E0] hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:border-[#5937E0] shadow-sm"
                >
                  <option value="All">Toutes les gammes</option>
                  {Object.values(PriceRange).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Type */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5937E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Type de véhicule
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => onChangeType(e.target.value)}
                  className="w-full p-3 px-4 border-2 border-gray-200 rounded-xl cursor-pointer bg-white hover:border-[#5937E0] hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:border-[#5937E0] shadow-sm"
                >
                  <option value="All">Tous les types</option>
                  {Object.values(CarType).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Marque */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5937E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Marque
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => onChangeBrand(e.target.value)}
                  className="w-full p-3 px-4 border-2 border-gray-200 rounded-xl cursor-pointer bg-white hover:border-[#5937E0] hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:border-[#5937E0] shadow-sm"
                >
                  <option value="All">Toutes les marques</option>
                  {Object.values(Brand).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Carburant */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5937E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Type de carburant
                </label>
                <select
                  value={selectedFuelType}
                  onChange={(e) => onChangeFuelType(e.target.value)}
                  className="w-full p-3 px-4 border-2 border-gray-200 rounded-xl cursor-pointer bg-white hover:border-[#5937E0] hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:border-[#5937E0] shadow-sm"
                >
                  <option value="All">Tous les types</option>
                  {Object.values(FuelType).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Transmission */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-2"
              >
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5937E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Transmission
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => onChangeTransmission(e.target.value)}
                  className="w-full p-3 px-4 border-2 border-gray-200 rounded-xl cursor-pointer bg-white hover:border-[#5937E0] hover:bg-purple-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5937E0] focus:border-[#5937E0] shadow-sm"
                >
                  <option value="All">Toutes</option>
                  {Object.values(Transmission).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Badge de filtres actifs (mobile) */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="md:hidden mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-2">
                  {selectedGamme !== "All" && (
                    <span className="px-3 py-1 bg-[#5937E0] text-white text-xs rounded-full">
                      Gamme: {selectedGamme}
                    </span>
                  )}
                  {selectedType !== "All" && (
                    <span className="px-3 py-1 bg-[#5937E0] text-white text-xs rounded-full">
                      Type: {selectedType}
                    </span>
                  )}
                  {selectedBrand !== "All" && (
                    <span className="px-3 py-1 bg-[#5937E0] text-white text-xs rounded-full">
                      Marque: {selectedBrand}
                    </span>
                  )}
                  {selectedFuelType !== "All" && (
                    <span className="px-3 py-1 bg-[#5937E0] text-white text-xs rounded-full">
                      Carburant: {selectedFuelType}
                    </span>
                  )}
                  {selectedTransmission !== "All" && (
                    <span className="px-3 py-1 bg-[#5937E0] text-white text-xs rounded-full">
                      Transmission: {selectedTransmission}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
      </motion.div>
    </div>
  );
}
