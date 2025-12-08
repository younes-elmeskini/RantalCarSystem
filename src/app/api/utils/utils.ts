import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function Verify() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "Database not configured. DATABASE_URL est manquant dans les variables d'environnement"
    );
  }

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    throw new Error("Unauthorized: token missing");
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string };

    console.log("userId", payload.userId);
    return payload; // Return payload so the caller can use it
  } catch (err) {
    throw new Error("Invalid token");
  }
}