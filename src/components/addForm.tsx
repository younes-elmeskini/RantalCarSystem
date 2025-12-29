"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  CarType,
  Brand,
  PriceRange,
  FuelType,
  Transmission,
} from "@prisma/client";
import { FormSkeleton } from "./skeletonLoader";
import { LoadingButton } from "./circularLoader";
import { useCarContext, Car } from "@/lib/hooks/useCarContext";

export default function AddForm() {
    // Utiliser le contexte des voitures
    const { addCar, refreshCars } = useCarContext();
    
    // --- Form states ---
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [name, setName] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState<Brand | "">("");
    const [gamme, setGamme] = useState<PriceRange | "">("");
    const [price, setPrice] = useState("");
    const [seats, setSeats] = useState(4);
    const [dors, setDors] = useState(4);
    const [transmission, setTransmission] = useState<Transmission | "">("");
    const [fuelType, setFuelType] = useState<FuelType | "">("");
    const [airConditioning, setAirConditioning] = useState(false);
    const [cover, setCover] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Nettoyer les URLs de preview pour éviter les fuites mémoire
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cover) return setMessage("Cover image is required");
        setLoading(true);
        setMessage("");
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("seats", seats.toString());
        formData.append("dors", dors.toString());
        formData.append("transmission", transmission);
        formData.append("fuelType", fuelType);
        formData.append("airConditioning", airConditioning.toString());
        if (brand) formData.append("brand", brand);
        if (gamme) formData.append("gamme", gamme);
        formData.append("quantity", quantity.toString());
        if (cover) formData.append("cover", cover);
    
        try {
          const res = await fetch("/api/cars", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Something went wrong");
          
          // Créer l'objet voiture pour l'ajouter au contexte
          const newCar: Car = {
            id: data.id || Date.now().toString(), // Utiliser l'ID de la réponse ou générer un temporaire
            name,
            type,
            cover: data.cover || preview || "",
            price,
            seats,
            dors,
            quantity,
            transmission,
            fuelType,
            airConditioning,
            brand: brand || undefined,
            gamme: gamme || undefined,
          };
          
          // Ajouter la voiture au contexte pour mise à jour immédiate
          addCar(newCar);
          
          setMessage("Voiture ajoutée avec succès !");
    
          // Reset fields
          setName("");
          setType("");
          setBrand("");
          setGamme("");
          setPrice("");
          setSeats(4);
          setDors(4);
          setTransmission("");
          setFuelType("");
          setAirConditioning(false);
          setCover(null);
          setPreview(null);
          setQuantity(1);
          
          // Rafraîchir la liste complète pour s'assurer de la cohérence
          setTimeout(() => {
            refreshCars(); // Utilise les filtres actuels automatiquement
          }, 1000);
          
        } catch (err: unknown) {
          setMessage(err instanceof Error ? err.message : String(err));
        } finally {
          setLoading(false);
        }
      };

    if (isInitialLoading) {
        return <FormSkeleton />;
    }

  return (
    <div className="max-w-lg m-4 p-4 border border-[#ADB5BD] rounded-[20px] h-full">
    <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Car Name */}
      <input
        type="text"
        placeholder="Car Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
        required
      />

      {/* Car Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
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

      {/* Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value as Brand)}
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

      {/* Gamme */}
      <select
        value={gamme}
        onChange={(e) => setGamme(e.target.value as PriceRange)}
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

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
        required
      />

      {/* Seats / Dors */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value))}
          className="w-1/2 px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
        />
        <input
          type="number"
          placeholder="Dors"
          value={dors}
          onChange={(e) => setDors(parseInt(e.target.value))}
          className="w-1/2 px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
        />
      </div>

      {/* Transmission */}
      <select
        value={transmission}
        onChange={(e) => setTransmission(e.target.value as Transmission)}
        className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
      >
        <option value="">Select Transmission</option>
        {Object.values(Transmission).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Fuel Type */}
      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value as FuelType)}
        className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
      >
        <option value="">Select Fuel Type</option>
        {Object.values(FuelType).map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="w-full px-3 py-2 border border-[#ADB5BD] rounded-[12px] bg-[#fafafa]"
      />
      {/* Air Conditioning */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={airConditioning}
          onChange={(e) => setAirConditioning(e.target.checked)}
        />
        <span>Air Conditioning</span>
      </div>

      {/* Cover Image */}
      <div className="mt-3 ">
        <label className="block relative text-sm font-medium mb-1">
          Changer l&apos;image{" "}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Nettoyer l'ancienne preview
              if (preview) {
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
              setPreview(URL.createObjectURL(file)); // generate preview URL
              setMessage(""); // Réinitialiser le message d'erreur
            }
          }}
          className={preview ? "mt-1 absolute w-full h-30 z-0" : "" }
        />
        {preview && (
          <Image
            src={preview}
            alt="Aperçu"
            className="mt-3 w-48 rounded border z-10"
            width={100}
            height={100}
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
         className="mt-5 bg-[#5937E0] text-white px-4 py-2 rounded-t rounded-b-[12px] hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
        disabled={loading}
      >
        <LoadingButton loading={loading}>
          {loading ? "Adding..." : "Add Car"}
        </LoadingButton>
      </button>
    </form>
    {message && <p className="mt-4 text-center">{message}</p>}
  </div>
  )
}
