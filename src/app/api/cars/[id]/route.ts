import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
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

    // Supprimer l'image associée si elle existe et n'est pas une URL Cloudinary
    if (car.cover && car.cover.startsWith('/cars/')) {
      try {
        const imagePath = path.join(process.cwd(), 'public', car.cover);
        await unlink(imagePath);
        console.log(`Image supprimée: ${imagePath}`);
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

  // 🔹 If a new image is provided, save locally
  if (cover) {
    // Récupérer la voiture actuelle pour connaître l'ancienne image
    const currentCar = await prisma.car.findUnique({ where: { id } });

    // Save image locally
    const publicDir = path.join(process.cwd(), "public");
    const carsDir = path.join(publicDir, "cars");
    await mkdir(carsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = cover.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const uniqueFileName = `${baseName}_${timestamp}${extension}`;
    const filePath = path.join(carsDir, uniqueFileName);

    // Convert file to buffer and save
    const arrayBuffer = await cover.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Save relative path for database
    coverUrl = `/cars/${uniqueFileName}`;

    // Supprimer l'ancienne image si elle existe et est stockée localement
    if (currentCar?.cover && currentCar.cover.startsWith('/cars/')) {
      try {
        const oldImagePath = path.join(process.cwd(), 'public', currentCar.cover);
        await unlink(oldImagePath);
        console.log(`Ancienne image supprimée: ${oldImagePath}`);
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
