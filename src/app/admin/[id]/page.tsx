"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import CarDetais from "@/components/carDetaisAdmin";
import { PageSkeleton } from "@/components/skeletonLoader";
import { LoadingCard, LoadingButton } from "@/components/circularLoader";
import { useCarContext, Car } from "@/lib/hooks/useCarContext";

export default function EditCarForm() {
  const router = useRouter();
  const params = useParams();
  const carId = params?.id;
  
  // Utiliser le contexte des voitures
  const { updateCar, refreshCars } = useCarContext();

  const [car, setCar] = useState<Car | null>(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    seats: 0,
    dors: 0,
    transmission: "",
    gamme: "",
    brand: "",
    fuelType: "",
    quantity:0,
    airConditioning: false,
  });
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(true);
  const [message, setMessage] = useState("");

  // Guard: redirect to login if not authenticated
  useEffect(() => {
    let isMounted = true;
    async function verify() {
      try {
        const res = await fetch("/api/auth/verify", { method: "GET" });
        if (!isMounted) return;
        if (!res.ok) {
          router.replace("/auth/login");
        }
      } catch {
        if (!isMounted) return;
        router.replace("/auth/login");
      }
    }
    verify();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Nettoyer les URLs de preview pour éviter les fuites mémoire
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Fetch car data
  useEffect(() => {
    if (!carId) {
      console.log("No carId found");
      return;
    }

    console.log("Fetching car with ID:", carId);
    setIsLoadingCar(true);

    fetch(`/api/cars/${carId}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch car");
        return res.json();
      })
      .then((responseData) => {
        console.log("Car data received:", responseData);

        // L'API peut retourner soit un objet, soit un tableau
        const data: Car = Array.isArray(responseData)
          ? responseData[0]
          : responseData;

        if (!data) {
          throw new Error("Aucune donnée de voiture trouvée");
        }

        console.log("Processed car data:", data);
        setCar(data);

        // Mise à jour du formulaire avec les données de la voiture
        const updatedForm = {
          name: data.name || "",
          type: data.type || "",
          price: data.price || "",
          seats: Number(data.seats) || 0,
          dors: Number(data.dors) || 0,
          transmission: data.transmission || "",
          fuelType: data.fuelType || "",
          brand: data.brand || "" ,
          gamme: data.gamme || "",
          quantity: Number(data.quantity) || 0 ,
          airConditioning: Boolean(data.airConditioning),
        };

        console.log("Updated form:", updatedForm);
        setForm(updatedForm);
        setPreview(data.cover || "");
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
        alert("Erreur lors du chargement de la voiture: " + error.message);
      })
      .finally(() => {
        setIsLoadingCar(false);
      });
  }, [carId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: target.checked }));
    } else if (target instanceof HTMLInputElement && target.type === "number") {
      setForm((prev) => ({ ...prev, [name]: Number(target.value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: target.value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Nettoyer l'ancienne preview si c'est un blob URL
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        setMessage("Veuillez sélectionner un fichier image");
        return;
      }
      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage("L'image ne doit pas dépasser 10MB");
        return;
      }
      setCover(file);
      setPreview(URL.createObjectURL(file));
      setMessage(""); // Réinitialiser le message d'erreur
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (cover) formData.append("cover", cover);

    try {
      const res = await fetch(`/api/cars/${car.id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // Utiliser les données de la voiture mise à jour depuis l'API
        const updatedCarData: Partial<Car> = {
          name: form.name,
          type: form.type,
          price: form.price,
          seats: form.seats,
          dors: form.dors,
          transmission: form.transmission,
          fuelType: form.fuelType,
          quantity: form.quantity,
          airConditioning: form.airConditioning,
          brand: form.brand || undefined,
          gamme: form.gamme || undefined,
          cover: data.car?.cover || preview || car.cover,
        };

        // Mettre à jour la voiture dans le contexte pour mise à jour immédiate
        updateCar(car.id, updatedCarData);
        
        setMessage(data.message || "Voiture mise à jour avec succès !");
        
        // Rafraîchir la liste complète pour s'assurer de la cohérence
        setTimeout(() => {
          refreshCars(); // Utilise les filtres actuels automatiquement
        }, 1000);
        
      } else {
        setMessage("Erreur lors de la mise à jour : " + (data.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error("Error updating car:", error);
      setMessage("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingCar) {
    return <PageSkeleton />;
  }

  if (!car) {
    return (
      <LoadingCard text="Voiture non trouvée" />
    );
  }

  return (
    <div className=" flex md:flex-row flex-col-reverse justify-center md:items-start pb-10">
      <div className="md:w-1/2 flex justify-center p-4 mt-10">
        <CarDetais car={car} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="md:max-w-1/2 md:w-[500px] md:mx-[100px] m-4 p-5 bg-white shadow-md border border-[#ADB5BD] rounded-[20px]"
      >
        <h2 className="text-xl font-semibold mb-4">Modifier la Voiture</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              placeholder="Car Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                required
              >
                <option value="">Select Car Type</option>
                {Object.values(CarType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                required
              >
                <option value="">Select Brand</option>
                {Object.values(Brand).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Prix</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Prix"
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantité</label>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantité disponible"
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Sièges</label>
              <input
                name="seats"
                type="number"
                value={form.seats}
                onChange={handleChange}
                placeholder="Nombre de sièges"
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Portes</label>
              <input
                name="dors"
                type="number"
                value={form.dors}
                onChange={handleChange}
                placeholder="Nombre de portes"
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gamme</label>
            <select
              name="gamme"
              value={form.gamme}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
              required
            >
              <option value="">Select Gamme</option>
              {Object.values(PriceRange).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Transmission
              </label>
              <select
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
              >
                <option value="">Select Transmission</option>
                {Object.values(Transmission).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Type de carburant
              </label>
              <select
                name="fuelType"
                value={form.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
              >
                <option value="">Select Fuel Type</option>
                {Object.values(FuelType).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="airConditioning"
              checked={form.airConditioning}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Climatisation</span>
          </label>

          <div className="mt-3 ">
            <label className="block relative text-sm font-medium mb-1">
              Changer l&apos;image{" "}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 absolute  w-full h-30"
            />
            {preview && (
              <Image
                src={preview}
                alt="Aperçu"
                className="mt-3 w-48 rounded border"
                width={100}
                height={100}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-[#5937E0] text-white px-4 py-2 rounded-t rounded-b-[12px] hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
        >
          <LoadingButton loading={loading}>
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </LoadingButton>
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md text-center ${
            message.includes("succès") 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
