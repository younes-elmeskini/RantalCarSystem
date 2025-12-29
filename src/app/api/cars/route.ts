import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { put as putBlob } from "@vercel/blob";
import {
  Brand,
  FuelType,
  PriceRange,
  Transmission,
  CarType,
} from "@prisma/client";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  if (!process.env.DATABASE_URL) {
    return Response.json(
      {
        error: "Database not configured",
        message: "DATABASE_URL est manquant dans les variables d'environnement",
      },
      { status: 500 }
    );
  }

  // Extract filters as strings
  const filters = {
    carType: searchParams.get("carType"),
    brand: searchParams.get("brand"),
    gamme: searchParams.get("gamme"),
    fuelType: searchParams.get("fuelType"),
    transmission: searchParams.get("transmission"),
    limit: searchParams.get("limit"),
  };
  const isValidEnumValue = <T extends object>(
    enumObj: T,
    value: unknown
  ): value is T[keyof T] =>
    Object.values(enumObj).includes(value as T[keyof T]);

  // Build dynamic where clause
  const where: Record<string, unknown> = {};
  if (
    filters.carType &&
    filters.carType !== "All" &&
    isValidEnumValue(CarType, filters.carType)
  ) {
    where.type = filters.carType;
  }
  if (
    filters.brand &&
    filters.brand !== "All" &&
    isValidEnumValue(Brand, filters.brand)
  ) {
    where.brand = filters.brand;
  }
  if (
    filters.gamme &&
    filters.gamme !== "All" &&
    isValidEnumValue(PriceRange, filters.gamme)
  ) {
    where.gamme = filters.gamme;
  }
  if (
    filters.fuelType &&
    filters.fuelType !== "All" &&
    isValidEnumValue(FuelType, filters.fuelType)
  ) {
    where.fuelType = filters.fuelType;
  }
  if (
    filters.transmission &&
    filters.transmission !== "All" &&
    isValidEnumValue(Transmission, filters.transmission)
  ) {
    where.transmission = filters.transmission;
  }

  try {
    // Parse limit parameter
    const limitParam = filters.limit ? parseInt(filters.limit, 10) : undefined;
    const limit = limitParam && limitParam > 0 ? limitParam : undefined;

    const cars = await prisma.car.findMany({
      where,
      take: limit, // Limiter le nombre de résultats si limit est fourni
      select: {
        id: true,
        name: true,
        type: true,
        cover: true,
        price: true,
        brand: true,
        seats: true,
        dors: true,
        gamme: true,
        quantity: true,
        transmission: true,
        fuelType: true,
        airConditioning: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(cars);
  } catch (error: unknown) {
    console.error(error);
    return Response.json(
      {
        error: "Failed to fetch cars",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      {
        error: "Database not configured",
        message: "DATABASE_URL est manquant dans les variables d'environnement",
      },
      { status: 500 }
    );
  }

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

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

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

    // Validation de l'image
    if (!cover || !(cover instanceof File)) {
      return Response.json(
        { error: "Image manquante", message: "Une image de couverture est requise" },
        { status: 400 }
      );
    }

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
    const coverUrl = blob.url;
    
    if (!coverUrl) {
      return Response.json(
        { error: "Erreur d'upload", message: "L'URL de l'image n'a pas été générée" },
        { status: 500 }
      );
    }

    const newCar = await prisma.car.create({
      data: {
        name,
        cover: coverUrl,
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
      },
    });

    return Response.json(
      {
        message: "Voiture créée avec succès",
        id: newCar.id,
        cover: newCar.cover
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating car:", error);
    const message = error instanceof Error ? error.message : String(error);
    
    // Si l'erreur vient de Prisma, donner un message plus clair
    if (message.includes('Unique constraint')) {
      return Response.json(
        { error: "Erreur de validation", message: "Une voiture avec ces caractéristiques existe déjà" },
        { status: 400 }
      );
    }
    
    return Response.json(
      { error: "Erreur lors de la création", message: message },
      { status: 500 }
    );
  }
}
