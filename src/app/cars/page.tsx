"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FilterType from "@/components/filterType";
import MenuCars from "@/components/menuCars";
import { LoadingPage } from "@/components/circularLoader";
import { CarsSkeleton } from "@/components/skeletons/CarsSkeleton";
import { motion } from "framer-motion";

function CarsPageContent() {
  const searchParams = useSearchParams();
  const [gamme, setGamme] = useState("All"); // Price range
  const [type, setType] = useState("All"); // Car type
  const [brand, setBrand] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Lire les paramètres de l'URL au chargement de la page
  useEffect(() => {
    const urlGamme = searchParams.get("gamme");
    const urlType = searchParams.get("carType");
    const urlBrand = searchParams.get("brand");
    const urlFuelType = searchParams.get("fuelType");
    const urlTransmission = searchParams.get("transmission");

    if (urlGamme) setGamme(urlGamme);
    if (urlType) setType(urlType);
    if (urlBrand) setBrand(urlBrand);
    if (urlFuelType) setFuelType(urlFuelType);
    if (urlTransmission) setTransmission(urlTransmission);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [searchParams]);

  if (isLoading) {
    return <CarsSkeleton />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <motion.h2 
        className="text-[24px] font-bold md:my-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Sélectionnez un groupe de véhicules
      </motion.h2>
        <FilterType
          selectedGamme={gamme}
          selectedType={type}
          selectedBrand={brand}
          selectedFuelType={fuelType}
          selectedTransmission={transmission}
          onChangeGamme={setGamme}
          onChangeType={setType}
          onChangeBrand={setBrand}
          onChangeFuelType={setFuelType}
          onChangeTransmission={setTransmission}
        />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <MenuCars filter={{ gamme, type, brand, fuelType, transmission }} />
      </motion.div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<LoadingPage text="Chargement des voitures..." />}>
      <CarsPageContent />
    </Suspense>
  );
}
