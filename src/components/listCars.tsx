import React, { useEffect, useState } from "react";
import CarCardAdmin from "./carCardAdmin";
import { CarCardSkeleton } from "./skeletonLoader";
import { useCarContext } from "@/lib/hooks/useCarContext";
import EmptyState from "./EmptyState";

type ListCarsProps = {
  filter?: string;
};

export default function ListCars({ filter }: ListCarsProps) {
  const { cars, isLoading, refreshCars } = useCarContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryFilter = filter || params.get("filter") || "";

        const filters = {
          gamme: queryFilter,
        };
        
        await refreshCars(filters);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    fetchCars();
  }, [filter, refreshCars]);

  if (isLoading) {
    return (
      <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-8 pr-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (cars.length === 0) {
    return (
      <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 transition-colors duration-200">
        <div className="p-4">
          <EmptyState
            title="Aucune voiture disponible"
            message="Il n'y a actuellement aucune voiture dans votre catalogue. Commencez par ajouter votre première voiture."
            showResetButton={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 transition-colors duration-200">
      <div className="space-y-8 p-4">
        {cars.map((car) => (
          <CarCardAdmin key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}