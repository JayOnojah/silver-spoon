"use server";

import { eq, and } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { mobileUsers } from "@/src/db/schemas/mobile-users";

export const getMobileUserByEmail = async (email: string) => {
  if (!email) return null;

  try {
    const [user] = await db
      .select()
      .from(mobileUsers)
      .where(eq(mobileUsers.email, email));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      provider: user.provider,
      providerId: user.providerId,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getMobileUserByProviderId = async (
  id: string,
  provider: "google" | "apple",
) => {
  if (!id) return null;

  try {
    const [user] = await db
      .select()
      .from(mobileUsers)
      .where(and(eq(mobileUsers.id, id), eq(mobileUsers.provider, provider)));

    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      provider: user.provider,
      providerId: user.providerId,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching user by id: ", error);
    return null;
  }
};
