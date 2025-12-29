import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { put as putBlob, del as deleteBlob } from "@vercel/blob";
import {
  Brand,
  FuelType,
  PriceRange,
  Transmission,
  CarType,
  Car,
} from "@prisma/client";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const car = await prisma.car.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      cover: true,
      price: true,
      seats: true,
      dors: true,
      quantity: true,
      transmission: true,
      fuelType: true,
      airConditioning: true,
      brand: true,
      gamme: true,
    },
  });

  if (!car) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(car);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Vérifier la configuration Blob Storage (nécessaire pour supprimer l'image)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        error: "Blob Storage not configured",
        message: "BLOB_READ_WRITE_TOKEN est manquant. Configurez-le dans les variables d'environnement Vercel.",
      },
      { status: 500 }
    );
  }

  // Vérifier l'authentification
  const token = (await cookies()).get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    const userId = payload.userId;
    console.log("userId", userId);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    // Vérifier que la voiture existe avant de la supprimer
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      return Response.json({ error: "Voiture non trouvée" }, { status: 404 });
    }

    // Supprimer l'image associée depuis Vercel Blob Storage
    if (car.cover && car.cover.includes('blob.vercel-storage.com')) {
      try {
        await deleteBlob(car.cover);
        console.log(`Image supprimée depuis Blob Storage: ${car.cover}`);
      } catch (fileError) {
        console.warn('Erreur lors de la suppression du fichier image:', fileError);
        // Ne pas échouer l'opération si la suppression du fichier échoue
      }
    }

    await prisma.car.delete({ where: { id } });

    return Response.json(
      { message: "Voiture supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    const message = error instanceof Error ? error.message : String(error);
    
    // Si l'erreur vient de Prisma, donner un message plus clair
    if (message.includes('Record to delete does not exist')) {
      return Response.json(
        { error: "Voiture non trouvée", message: "La voiture à supprimer n'existe pas" },
        { status: 404 }
      );
    }
    
    return Response.json(
      { error: "Erreur lors de la suppression de la voiture", message: message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Vérifier la configuration Blob Storage
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        error: "Blob Storage not configured",
        message: "BLOB_READ_WRITE_TOKEN est manquant. Configurez-le dans les variables d'environnement Vercel.",
      },
      { status: 500 }
    );
  }

  const token = (await cookies()).get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };
    const userId = payload.userId;
    console.log("userId", userId);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const cover = formData.get("cover") as File | null;
  const price = formData.get("price") as string;
  const brand = formData.get("brand") as Brand;
  const gamme = formData.get("gamme") as PriceRange;
  const fuelType = formData.get("fuelType") as FuelType;
  const transmission = formData.get("transmission") as Transmission;
  const type = formData.get("type") as CarType;
  const seatsStr = formData.get("seats") as string;
  const dorsStr = formData.get("dors") as string;
  const quantityStr = formData.get("quantity") as string;
  const airConditioning = formData.get("airConditioning") === "true";

  // Validation des données
  if (!name || !price || !type || !brand || !gamme) {
    return Response.json(
      { error: "Données manquantes", message: "Tous les champs requis doivent être remplis" },
      { status: 400 }
    );
  }

  // Validation des valeurs numériques
  const seats = parseInt(seatsStr, 10);
  const dors = parseInt(dorsStr, 10);
  const quantity = parseInt(quantityStr, 10);

  if (isNaN(seats) || seats < 1 || seats > 20) {
    return Response.json(
      { error: "Valeur invalide", message: "Le nombre de sièges doit être entre 1 et 20" },
      { status: 400 }
    );
  }

  if (isNaN(dors) || dors < 2 || dors > 10) {
    return Response.json(
      { error: "Valeur invalide", message: "Le nombre de portes doit être entre 2 et 10" },
      { status: 400 }
    );
  }

  if (isNaN(quantity) || quantity < 0) {
    return Response.json(
      { error: "Valeur invalide", message: "La quantité doit être un nombre positif" },
      { status: 400 }
    );
  }

  // Validation des enums
  if (!Object.values(Brand).includes(brand)) {
    return Response.json(
      { error: "Valeur invalide", message: "La marque sélectionnée n'est pas valide" },
      { status: 400 }
    );
  }

  if (!Object.values(PriceRange).includes(gamme)) {
    return Response.json(
      { error: "Valeur invalide", message: "La gamme sélectionnée n'est pas valide" },
      { status: 400 }
    );
  }

  if (!Object.values(CarType).includes(type)) {
    return Response.json(
      { error: "Valeur invalide", message: "Le type de voiture sélectionné n'est pas valide" },
      { status: 400 }
    );
  }

  let coverUrl: string | undefined;

  // 🔹 If a new image is provided, upload to Vercel Blob Storage
  if (cover && cover instanceof File) {
    // Vérifier que c'est bien une image
    if (!cover.type.startsWith('image/')) {
      return Response.json(
        { error: "Type de fichier invalide", message: "Le fichier doit être une image" },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (cover.size > maxSize) {
      return Response.json(
        { error: "Fichier trop volumineux", message: "L'image ne doit pas dépasser 10MB" },
        { status: 400 }
      );
    }

    // Récupérer la voiture actuelle pour connaître l'ancienne image
    const currentCar = await prisma.car.findUnique({ where: { id } });

    // Upload image to Vercel Blob Storage
    const timestamp = Date.now();
    const originalName = cover.name;
    const extension = originalName.split('.').pop() || 'jpg';
    const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueFileName = `cars/${baseName}_${timestamp}.${extension}`;

    // Upload to Blob Storage
    let blob;
    try {
      blob = await putBlob(uniqueFileName, cover, {
        access: 'public',
      });
    } catch (blobError) {
      console.error("Erreur lors de l'upload du blob:", blobError);
      return Response.json(
        { 
          error: "Erreur d'upload", 
          message: "Impossible d'uploader l'image. Vérifiez votre configuration Blob Storage." 
        },
        { status: 500 }
      );
    }

    // Save blob URL for database
    coverUrl = blob.url;

    if (!coverUrl) {
      return Response.json(
        { error: "Erreur d'upload", message: "L'URL de l'image n'a pas été générée" },
        { status: 500 }
      );
    }

    // Supprimer l'ancienne image depuis Vercel Blob Storage
    if (currentCar?.cover && currentCar.cover.includes('blob.vercel-storage.com')) {
      try {
        await deleteBlob(currentCar.cover);
        console.log(`Ancienne image supprimée depuis Blob Storage: ${currentCar.cover}`);
      } catch (fileError) {
        console.warn('Erreur lors de la suppression de l\'ancienne image:', fileError);
        // Ne pas échouer l'opération si la suppression de l'ancienne image échoue
      }
    }
  }

  try {
    // Construire l'objet de données à mettre à jour
    const updateData: Partial<Car> = {
      name,
      type,
      price,
      gamme,
      brand,
      seats,
      dors,
      transmission,
      fuelType,
      quantity,
      airConditioning,
    };

    // Ne mettre à jour l'image que si une nouvelle image a été fournie
    if (coverUrl) {
      updateData.cover = coverUrl;
    }

    const updatedCar = await prisma.car.update({
      where: { id },
      data: updateData,
    });

    return Response.json({
      message: "Voiture mise à jour avec succès",
      car: updatedCar
    }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    const message = error instanceof Error ? error.message : String(error);
    
    // Si l'erreur vient de Prisma, donner un message plus clair
    if (message.includes('Record to update not found')) {
      return Response.json(
        { error: "Voiture non trouvée", message: "La voiture à mettre à jour n'existe pas" },
        { status: 404 }
      );
    }
    
    return Response.json({ 
      error: "Erreur lors de la mise à jour de la voiture",
      message: message
    }, { status: 500 });
  }
}
