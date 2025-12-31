"use client";
import { useEffect, useState } from "react";
import CarCard from "@/components/carCard";
import { CarCardSkeleton } from "@/components/skeletonLoader";
import { motion } from "framer-motion";
import { useCarContext } from "@/lib/hooks/useCarContext";
import EmptyState from "@/components/EmptyState";

// Define the props for the component
interface MenuCarsProps {
  filter: {
    gamme: string;
    type: string;
    brand: string;
    fuelType?: string;
    transmission?: string;
  };
  excludeId?: string; // ID de la voiture à exclure
  limit?: number; // Nombre maximum de voitures à afficher
}

export default function MenuCars({ filter, excludeId, limit }: MenuCarsProps) {
  const { cars, isLoading, refreshCars } = useCarContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const filters = {
          gamme: filter.gamme,
          carType: filter.type,
          brand: filter.brand,
          fuelType: filter.fuelType,
          transmission: filter.transmission,
          limit: limit,
        };
        
        await refreshCars(filters);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Network error occurred");
      }
    };

    fetchCars();
  }, [filter, excludeId, limit, refreshCars]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6 my-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Filtrer les voitures pour exclure celle spécifiée
  const filteredCars = excludeId 
    ? cars.filter((car) => car.id !== excludeId)
    : cars;

  // Afficher l'état vide si aucune voiture n'est trouvée
  if (filteredCars.length === 0) {
    return (
      <div className="w-full">
        <EmptyState
          title="Aucune voiture trouvée"
          message={
            excludeId
              ? "Il n'y a pas d'autres voitures de ce type disponibles pour le moment."
              : "Aucune voiture ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou consultez toutes nos voitures disponibles."
          }
          showResetButton={!excludeId}
          resetButtonText="Voir toutes les voitures"
          resetButtonHref="/cars"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-6 my-6">
      {filteredCars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <CarCard {...car} />
        </motion.div>
      ))}
    </div>
  );
}
