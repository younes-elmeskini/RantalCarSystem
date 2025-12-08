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
    return Response.json(
      { error: "Erreur lors de la suppression de la voiture" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

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
  const seats = parseInt(formData.get("seats") as string);
  const dors = parseInt(formData.get("dors") as string);
  const quantity = parseInt(formData.get("quantity") as string);
  const airConditioning = formData.get("airConditioning") === "true";

  let coverUrl: string | undefined;

  // 🔹 If a new image is provided, upload to Vercel Blob Storage
  if (cover) {
    // Récupérer la voiture actuelle pour connaître l'ancienne image
    const currentCar = await prisma.car.findUnique({ where: { id } });

    // Upload image to Vercel Blob Storage
    const timestamp = Date.now();
    const originalName = cover.name;
    const extension = originalName.split('.').pop() || '';
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    const uniqueFileName = `cars/${baseName}_${timestamp}.${extension}`;

    // Upload to Blob Storage
    const blob = await putBlob(uniqueFileName, cover, {
      access: 'public',
    });

    // Save blob URL for database
    coverUrl = blob.url;

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
    return Response.json({ 
      error: "Erreur lors de la mise à jour de la voiture",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
