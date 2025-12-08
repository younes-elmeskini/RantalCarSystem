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

    console.log("cars", cars);
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
    const cover = formData.get("cover") as File;
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
    const coverUrl = blob.url;

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
    return Response.json(
      { error: "Failed to create car", details: message },
      { status: 500 }
    );
  }
}
